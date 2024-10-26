"use server";

import { parseWithZod } from "@conform-to/zod";
import { createAiShortSchema } from "./zodSchema";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { storage } from "./firebaseConfig";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function CreateAiShortAction(prevState: any, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: createAiShortSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const prompt = `Write a script to generate ${formData.get(
    "duration"
  )} video on topic: ${formData.get(
    "topic"
  )} along with AI image prompt in ${formData.get(
    "style"
  )} format for each scene and give me result in JSON format with imageprompt and ContentText as field`;

  try {
    const resultScript = await generateVideoScript(prompt);

    const [resultAudio, urlImages] = await Promise.all([
      generateAudio(resultScript),
      generateAllImage(resultScript),
    ]);

    const resultCaption = await generateCaption(resultAudio);

    const videoDataScript = {
      videoScript: resultScript,
      audioUrl: resultAudio,
      caption: resultCaption,
      urlImages,
    };

    console.log(videoDataScript, "===");
  } catch (error) {
    return null;
  }
}

interface videoScriptType {
  imagePrompt: string;
  ContentText: string;
}

const generateAllImage = async (videoScript: videoScriptType[]) => {
  const urlImages: string[] = [];
  for (const script of videoScript) {
    const url = await generateImage(script.imagePrompt);
    url && urlImages.push(url);
  }
  return urlImages;
};

const saveImageToStorage = async (imageUrl: string) => {
  try {
    const imageBase64 = `data:image/png;base64,${await convertUrlToImage(
      imageUrl
    )}`;
    const storageRef = ref(storage, `image-generated/${Date.now()}.png`);
    await uploadString(storageRef, imageBase64, "data_url");
    const imageDownloadUrl = await getDownloadURL(storageRef);
    return imageDownloadUrl;
  } catch (error) {
    return null;
  }
};

const poolingImageUrl = async (prediction: any) => {
  while (prediction.status !== "succeeded" && prediction.status !== "failed") {
    await sleep(1000);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/predictions/${prediction.id}`
    );

    const newPrediction = await response.json();

    if (response.status !== 200) {
      return;
    }
    return await poolingImageUrl(newPrediction);
  }
  return prediction;
};

const generateImage = async (prompt: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/predictions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
        }),
      }
    );
    let prediction = await response.json();
    if (response.status !== 201) {
      return;
    }
    const result = await poolingImageUrl(prediction);
    const imageDownloadUrl = await saveImageToStorage(result.output[0]);
    return imageDownloadUrl;
  } catch (error) {
    return null;
  }
};

const generateCaption = async (audioUrl: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/api/generate-caption`,
      {
        url: audioUrl,
      }
    );
    return response.data;
  } catch (error) {
    return null;
  }
};

const generateVideoScript = async (prompt: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/api/generate-video-script`,
      {
        prompt,
      }
    );
    return response.data.result;
  } catch (error) {
    return null;
  }
};

const generateAudio = async (script: videoScriptType[]) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/api/generate-audio`,
      {
        text: script,
        id: uuidv4(),
      }
    );
    return response.data.download_url;
  } catch (error) {
    return null;
  }
};

const convertUrlToImage = async (imageUrl: string) => {
  try {
    const resp = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const base64 = Buffer.from(resp.data).toString("base64");
    return base64;
  } catch (error) {
    return;
  }
};

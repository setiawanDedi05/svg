"use server";

import { parseWithZod } from "@conform-to/zod";
import { createAiShortSchema } from "./zodSchema";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Replicate from "replicate";

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
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/api/get-video-script`,
      {
        prompt,
      }
    );

    const resultScript = response.data.result;

    const responseAudio = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/api/generate-audio`,
      {
        text: resultScript,
        id: uuidv4(),
      }
    );

    const images: any[] = [];
    resultScript.forEach(
      async (
        script: { imagePrompt: string; ContentText: string },
        index: number
      ) => {
        if (index === 0) {
          await axios
            .post(`${process.env.NEXT_PUBLIC_URL}/api/generate-image`, {
              prompt: script.imagePrompt,
            })
            .then((resp) => {
              console.log({ resp });
              images.push(resp.data.result);
            })
            .catch((e) => {
              console.log(e);
            });
        }
      }
    );

    const responseCaption = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/api/generate-caption`,
      {
        url: responseAudio.data.download_url,
      }
    );
    return responseCaption.data;
  } catch (error) {
    return error;
  }
}

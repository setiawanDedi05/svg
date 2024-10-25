import { storage } from "@/lib/firebaseConfig";
import textToSpeech, { protos } from "@google-cloud/text-to-speech";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import fs from "fs";
import { NextResponse } from "next/server";
import _ from "underscore";
import util from "util";

const client = new textToSpeech.TextToSpeechClient({
  apiKey: process.env.GOOGLE_API_KEY,
});

export const POST = async (req: Request) => {
  const {
    text,
    id,
  }: { text: { imagePrompt: string; ContentText: string }[]; id: string } =
    await req.json();
  const storageRef = ref(storage, `short-video-generated/${id}.mp3`);

  const request: protos.google.cloud.texttospeech.v1.ISynthesizeSpeechRequest =
    {
      input: { text: _.pluck(text, "ContentText").join(". ") },
      // Select the language and SSML voice gender (optional)
      voice: { languageCode: "en-US", ssmlGender: "MALE" },
      // select the type of audio encoding
      audioConfig: { audioEncoding: "MP3" },
    };

  const [response]: [
    protos.google.cloud.texttospeech.v1.ISynthesizeSpeechResponse,
    protos.google.cloud.texttospeech.v1.ISynthesizeSpeechRequest | undefined,
    {} | undefined
  ] = await client.synthesizeSpeech(request);

  const audioBuffer = Buffer.from(response.audioContent as any, "binary");

  await uploadBytes(storageRef, audioBuffer, { contentType: "audio/mp3" });
  const downloadUrl = await getDownloadURL(storageRef);

  return NextResponse.json(
    { result: "Success", download_url: downloadUrl },
    { status: 200 }
  );
};

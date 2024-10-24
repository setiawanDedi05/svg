"use server";

import { parseWithZod } from "@conform-to/zod";
import { createAiShortSchema } from "./zodSchema";
import axios from "axios";
import { redirect } from "next/navigation";

export async function CreateAiShortAction(prevState: any, formData: FormData) {
  console.log({ formData });
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
  console.log({ prompt });
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/api/get-video-script`,
      {
        prompt,
      }
    );

    return response.data;
  } catch (error) {
    return error;
  }
}

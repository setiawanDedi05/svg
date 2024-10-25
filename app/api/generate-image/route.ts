import { NextResponse } from "next/server";
import Replicate from "replicate";

export const POST = async (req: Request) => {
  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });

  const { prompt } = await req.json();

  const output = await replicate.run(
    "bytedance/sdxl-lightning-4step:5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637",
    {
      input: {
        prompt,
        height: 1280,
        width: 1024,
        num_outputs: 1,
      },
    }
  );

  console.log(output, "ini output");
  return NextResponse.json({ result: output });
};

import { AssemblyAI } from "assemblyai";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const client = new AssemblyAI({
      apiKey: process.env.ASSEMBLY_AI_KEY as string,
    });

    const { url } = await req.json();
    const data = {
      audio: url,
    };

    const transcript = await client.transcripts.transcribe(data);
    return NextResponse.json({ result: transcript.words }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error });
  }
};

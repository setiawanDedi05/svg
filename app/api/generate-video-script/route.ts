import { chatSession } from "@/lib/aiModel";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { prompt } = await req.json();
    const result = await chatSession.sendMessage(prompt);
    return NextResponse.json(
      { result: JSON.parse(result.response.text()) },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        result: "Error",
        error: error,
      },
      {
        status: 500,
      }
    );
  }
};

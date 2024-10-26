import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("Received webhook", req.body);
  return NextResponse.json({ result: req.body });
}
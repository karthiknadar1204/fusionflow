import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

async function query(data: { inputs: string }) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
    {
      headers: {
        Authorization: "Bearer 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",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.blob();
  return result;
}

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount = 1, resolution = "512x512" } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    if (!amount) {
      return new NextResponse("Amount is required", { status: 400 });
    }

    if (!resolution) {
      return new NextResponse("Resolution is required", { status: 400 });
    }

    const images = [];
    for (let i = 0; i < parseInt(amount, 10); i++) {
      const randomSeed = Math.floor(Math.random() * 1000000);
      const variationPrompt = `${prompt} (seed: ${randomSeed}, variation: ${i + 1}, unique interpretation)`;
      
      const result = await query({ "inputs": variationPrompt });
      const buffer = Buffer.from(await result.arrayBuffer());
      const base64 = buffer.toString('base64');
      const imageUrl = `data:image/jpeg;base64,${base64}`;
      images.push({ url: imageUrl });
    }

    return new NextResponse(JSON.stringify({ data: images }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('[IMAGE_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}


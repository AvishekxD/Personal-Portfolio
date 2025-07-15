import { NextRequest, NextResponse } from "next/server";

const baseURL = process.env.IMAGEKIT_BASE_URL;
if (!baseURL) {
  throw new Error("IMAGEKIT_BASE_URL is not defined in environment variables.");
}

const allowedStickers = new Set(
  Array.from({ length: 10 }, (_, i) => `HackerBoy${i + 1}.png`)
);

export async function GET(req: NextRequest) {
  const imageName = req.nextUrl.searchParams.get("img");

  if (!imageName || !allowedStickers.has(imageName) || !imageName.endsWith(".png")) {
    return NextResponse.redirect("/fallback-sticker.png", 302);
  }

  const imageURL = `${baseURL}${imageName}`;

  try {
    const response = await fetch(imageURL);

    if (!response.ok) {
      return new NextResponse("Image not found", { status: 404 });
    }

    const contentType = response.headers.get("content-type") || "image/png";
    const buffer = await response.arrayBuffer();

    return new NextResponse(Buffer.from(buffer), {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.redirect("/fallback-sticker.png", 302);
  }
}

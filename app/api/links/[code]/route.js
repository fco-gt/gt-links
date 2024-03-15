import Url from "@/models/url";
import { NextResponse } from "next/server";
import connectMongoDb from "@/lib/mongoose";

export const GET = async (req, { params }) => {
  await connectMongoDb();

  const { code } = params;

  console.log(code);

  if (!code || code.length !== 5) {
    return NextResponse.json({ error: "Link not provided" }, { status: 400 });
  }

  try {
    const shortLink = `${process.env.REDIRECT_URL}${code}`;
    const { originalUrl } = await Url.findOne({ shortUrl: shortLink });

    console.log(shortLink, originalUrl);

    if (originalUrl) {
      return NextResponse.json({ originalUrl }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
};

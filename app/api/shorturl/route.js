import { NextRequest, NextResponse } from "next/server";
import { generateCode } from "../../../utils/codeGenerator";
import Url from "../../../models/url";

import connectMongoDb from "@/lib/mongoose";

export const POST = async (req, { params }) => {
  await connectMongoDb();

  const { originalUrl } = await req.json();
  const newCode = generateCode();

  console.log(`OriginalUrl: ${originalUrl}\nNewCode: ${newCode}`);

  try {
    // Check if URL already exists (using promises)
    const existingUrl = await Url.findOne({ originalUrl: originalUrl });
    if (existingUrl) {
      return NextResponse.json({ error: "URL existente" }, { status: 401 });
    } else {
      const newUrl = new Url({
        originalUrl,
        shortUrl: `${process.env.REDIRECT_URL}${newCode}`,
      });
      await newUrl.save();
      console.log("URL Generada");
      return NextResponse.json({ shortUrl: newCode }, { status: 201 });
    }
  } catch (error) {
    console.error("Error al guardar en la base de datos: ", error);
    return NextResponse.json(
      { error: "Error al guardar en la base de datos" },
      { status: 500 }
    );
  }
};

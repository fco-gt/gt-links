import { Schema, Document, model } from "mongoose";

export interface UrlDocument extends Document {
  originalUrl: string;
  shorturl: string;
  clicks: number;
}

const urlSchema = new Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, unique: true, required: true },
  clicks: { type: Number, default: 0 },
});

export default model<UrlDocument>("Url", urlSchema);
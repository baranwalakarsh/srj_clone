import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, trim: true, unique: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
  seoTitle: { type: String, trim: true },
  seoDescription: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Service", serviceSchema);

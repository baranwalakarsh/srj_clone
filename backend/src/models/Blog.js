import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, trim: true, unique: true },
  featuredImageUrl: { type: String },
  content: { type: String, required: true },
  author: { type: String, required: true, trim: true },
  tags: [String],
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  seoTitle: { type: String, trim: true },
  seoDescription: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Blog", blogSchema);

import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  clientName: { type: String, trim: true },
  technologyUsed: [String],
  description: { type: String, required: true },
  images: [String],
  category: { type: String, trim: true },
  projectUrl: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Project", projectSchema);

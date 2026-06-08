import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  department: { type: String, trim: true },
  experience: { type: String, trim: true },
  location: { type: String, trim: true },
  salaryRange: { type: String, trim: true },
  description: { type: String, required: true },
  skillsRequired: [String],
  status: { type: String, enum: ["Open", "Closed", "Paused"], default: "Open" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Job", jobSchema);

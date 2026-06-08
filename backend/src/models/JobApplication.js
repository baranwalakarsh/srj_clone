import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, trim: true },
  resumeUrl: { type: String, required: true },
  coverLetter: { type: String, trim: true },
  appliedJob: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  status: { type: String, enum: ["Received", "Reviewed", "Interview", "Rejected", "Hired"], default: "Received" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("JobApplication", jobApplicationSchema);

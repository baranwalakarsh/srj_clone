import mongoose from "mongoose";

const contactInquirySchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, trim: true },
  company: { type: String, trim: true },
  serviceInterested: { type: String, trim: true },
  message: { type: String, required: true, trim: true },
  status: { type: String, enum: ["New", "Contacted", "Converted", "Closed"], default: "New" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("ContactInquiry", contactInquirySchema);

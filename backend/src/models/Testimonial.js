import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
  clientName: { type: String, required: true, trim: true },
  companyName: { type: String, trim: true },
  designation: { type: String, trim: true },
  rating: { type: Number, min: 1, max: 5, default: 5 },
  review: { type: String, required: true },
  photoUrl: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Testimonial", testimonialSchema);

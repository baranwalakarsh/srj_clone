import mongoose from "mongoose";

const socialLinkSchema = new mongoose.Schema({
  platform: String,
  url: String
});

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  designation: { type: String, trim: true },
  department: { type: String, trim: true },
  profileImageUrl: { type: String },
  socialLinks: [socialLinkSchema],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("TeamMember", teamMemberSchema);

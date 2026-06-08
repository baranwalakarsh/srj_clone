import asyncHandler from "express-async-handler";
import TeamMember from "../models/TeamMember.js";

export const createTeamMember = asyncHandler(async (req, res) => {
  const member = await TeamMember.create(req.body);
  res.status(201).json({ success: true, message: "Team member created", data: member });
});

export const updateTeamMember = asyncHandler(async (req, res) => {
  const member = await TeamMember.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!member) {
    return res.status(404).json({ success: false, message: "Team member not found", errors: [] });
  }
  res.json({ success: true, message: "Team member updated", data: member });
});

export const deleteTeamMember = asyncHandler(async (req, res) => {
  const member = await TeamMember.findByIdAndDelete(req.params.id);
  if (!member) {
    return res.status(404).json({ success: false, message: "Team member not found", errors: [] });
  }
  res.json({ success: true, message: "Team member deleted", data: {} });
});

export const getTeamMembers = asyncHandler(async (req, res) => {
  const members = await TeamMember.find().sort({ createdAt: -1 });
  res.json({ success: true, message: "Team members fetched", data: members });
});

export const getTeamMember = asyncHandler(async (req, res) => {
  const member = await TeamMember.findById(req.params.id);
  if (!member) {
    return res.status(404).json({ success: false, message: "Team member not found", errors: [] });
  }
  res.json({ success: true, message: "Team member fetched", data: member });
});

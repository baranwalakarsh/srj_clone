import asyncHandler from "express-async-handler";
import Job from "../models/Job.js";

export const createJob = asyncHandler(async (req, res) => {
  const job = await Job.create(req.body);
  res.status(201).json({ success: true, message: "Job created successfully", data: job });
});

export const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!job) {
    return res.status(404).json({ success: false, message: "Job not found", errors: [] });
  }
  res.json({ success: true, message: "Job updated successfully", data: job });
});

export const deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findByIdAndDelete(req.params.id);
  if (!job) {
    return res.status(404).json({ success: false, message: "Job not found", errors: [] });
  }
  res.json({ success: true, message: "Job deleted successfully", data: {} });
});

export const getJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find().sort({ createdAt: -1 });
  res.json({ success: true, message: "Jobs fetched successfully", data: jobs });
});

export const getJob = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) {
    return res.status(404).json({ success: false, message: "Job not found", errors: [] });
  }
  res.json({ success: true, message: "Job fetched successfully", data: job });
});

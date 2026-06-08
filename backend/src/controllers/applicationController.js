import asyncHandler from "express-async-handler";
import JobApplication from "../models/JobApplication.js";
import Job from "../models/Job.js";
import { sendEmail } from "../services/mailer.js";
import { uploadBuffer } from "../services/cloudinaryService.js";

export const submitApplication = asyncHandler(async (req, res) => {
  const { name, email, phone, coverLetter, appliedJob } = req.body;
  const job = await Job.findById(appliedJob);
  if (!job) {
    return res.status(404).json({ success: false, message: "Job not found", errors: [] });
  }

  if (!req.file) {
    return res.status(400).json({ success: false, message: "Resume file is required", errors: [] });
  }

  const resumeUrl = `/uploads/${req.file.filename}`;
  const application = await JobApplication.create({
    name,
    email,
    phone,
    coverLetter,
    appliedJob,
    resumeUrl
  });

  await sendEmail({
    to: email,
    subject: "Application received",
    text: `Thank you ${name} for applying to ${job.title}. We will review your application and contact you soon.`,
    html: `<p>Thank you ${name} for applying to ${job.title}. We will review your application and contact you soon.</p>`
  });

  res.status(201).json({ success: true, message: "Application submitted successfully", data: application });
});

export const getApplications = asyncHandler(async (req, res) => {
  const applications = await JobApplication.find().populate("appliedJob").sort({ createdAt: -1 });
  res.json({ success: true, message: "Applications fetched", data: applications });
});

export const getApplication = asyncHandler(async (req, res) => {
  const application = await JobApplication.findById(req.params.id).populate("appliedJob");
  if (!application) {
    return res.status(404).json({ success: false, message: "Application not found", errors: [] });
  }
  res.json({ success: true, message: "Application fetched", data: application });
});

export const updateApplicationStatus = asyncHandler(async (req, res) => {
  const application = await JobApplication.findById(req.params.id);
  if (!application) {
    return res.status(404).json({ success: false, message: "Application not found", errors: [] });
  }
  application.status = req.body.status || application.status;
  await application.save();
  res.json({ success: true, message: "Application status updated", data: application });
});

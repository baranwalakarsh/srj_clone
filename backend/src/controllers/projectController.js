import asyncHandler from "express-async-handler";
import Project from "../models/Project.js";
import { uploadBuffer } from "../services/cloudinaryService.js";

export const createProject = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  if (req.files?.length) {
    const images = req.files.map((file) => `/uploads/${file.filename}`);
    data.images = images;
  }
  const project = await Project.create(data);
  res.status(201).json({ success: true, message: "Project created", data: project });
});

export const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    return res.status(404).json({ success: false, message: "Project not found", errors: [] });
  }
  if (req.files?.length) {
    req.body.images = req.files.map((file) => `/uploads/${file.filename}`);
  }
  Object.assign(project, req.body);
  await project.save();
  res.json({ success: true, message: "Project updated", data: project });
});

export const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) {
    return res.status(404).json({ success: false, message: "Project not found", errors: [] });
  }
  res.json({ success: true, message: "Project deleted", data: {} });
});

export const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json({ success: true, message: "Projects fetched", data: projects });
});

export const getProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    return res.status(404).json({ success: false, message: "Project not found", errors: [] });
  }
  res.json({ success: true, message: "Project fetched", data: project });
});

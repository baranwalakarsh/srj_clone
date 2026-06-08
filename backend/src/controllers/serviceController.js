import asyncHandler from "express-async-handler";
import Service from "../models/Service.js";
import { uploadBuffer } from "../services/cloudinaryService.js";

export const createService = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  if (req.file) {
    data.imageUrl = `/uploads/${req.file.filename}`;
  }
  const service = await Service.create(data);
  res.status(201).json({ success: true, message: "Service created successfully", data: service });
});

export const updateService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (!service) {
    return res.status(404).json({ success: false, message: "Service not found", errors: [] });
  }
  if (req.file) {
    req.body.imageUrl = `/uploads/${req.file.filename}`;
  }
  Object.assign(service, req.body);
  await service.save();
  res.json({ success: true, message: "Service updated successfully", data: service });
});

export const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findByIdAndDelete(req.params.id);
  if (!service) {
    return res.status(404).json({ success: false, message: "Service not found", errors: [] });
  }
  res.json({ success: true, message: "Service deleted successfully", data: {} });
});

export const getServices = asyncHandler(async (req, res) => {
  const services = await Service.find().sort({ createdAt: -1 });
  res.json({ success: true, message: "Services fetched", data: services });
});

export const getService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (!service) {
    return res.status(404).json({ success: false, message: "Service not found", errors: [] });
  }
  res.json({ success: true, message: "Service fetched", data: service });
});

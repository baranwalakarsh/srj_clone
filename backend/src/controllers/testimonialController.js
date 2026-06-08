import asyncHandler from "express-async-handler";
import Testimonial from "../models/Testimonial.js";

export const createTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.create(req.body);
  res.status(201).json({ success: true, message: "Testimonial created", data: testimonial });
});

export const updateTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!testimonial) {
    return res.status(404).json({ success: false, message: "Testimonial not found", errors: [] });
  }
  res.json({ success: true, message: "Testimonial updated", data: testimonial });
});

export const deleteTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
  if (!testimonial) {
    return res.status(404).json({ success: false, message: "Testimonial not found", errors: [] });
  }
  res.json({ success: true, message: "Testimonial deleted", data: {} });
});

export const getTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await Testimonial.find().sort({ createdAt: -1 });
  res.json({ success: true, message: "Testimonials fetched", data: testimonials });
});

export const getTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);
  if (!testimonial) {
    return res.status(404).json({ success: false, message: "Testimonial not found", errors: [] });
  }
  res.json({ success: true, message: "Testimonial fetched", data: testimonial });
});

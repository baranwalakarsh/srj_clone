import asyncHandler from "express-async-handler";
import Blog from "../models/Blog.js";
import { uploadBuffer } from "../services/cloudinaryService.js";

export const createBlog = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  if (req.file) {
    data.featuredImageUrl = `/uploads/${req.file.filename}`;
  }
  const blog = await Blog.create(data);
  res.status(201).json({ success: true, message: "Blog created successfully", data: blog });
});

export const updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return res.status(404).json({ success: false, message: "Blog not found", errors: [] });
  }
  if (req.file) {
    req.body.featuredImageUrl = `/uploads/${req.file.filename}`;
  }
  Object.assign(blog, req.body);
  await blog.save();
  res.json({ success: true, message: "Blog updated successfully", data: blog });
});

export const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);
  if (!blog) {
    return res.status(404).json({ success: false, message: "Blog not found", errors: [] });
  }
  res.json({ success: true, message: "Blog deleted successfully", data: {} });
});

export const getBlogs = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.limit) || 10;
  const skip = (page - 1) * pageSize;
  const filter = {};

  if (req.query.search) {
    const searchRegex = new RegExp(req.query.search, "i");
    filter.$or = [
      { title: searchRegex },
      { content: searchRegex },
      { tags: searchRegex },
      { author: searchRegex }
    ];
  }

  const count = await Blog.countDocuments(filter);
  const blogs = await Blog.find(filter).sort({ createdAt: -1 }).skip(skip).limit(pageSize);

  res.json({ success: true, message: "Blogs fetched", data: { count, page, pageSize, blogs } });
});

export const getBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("category");
  if (!blog) {
    return res.status(404).json({ success: false, message: "Blog not found", errors: [] });
  }
  res.json({ success: true, message: "Blog fetched", data: blog });
});

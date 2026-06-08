import asyncHandler from "express-async-handler";
import Job from "../models/Job.js";
import Blog from "../models/Blog.js";
import Service from "../models/Service.js";
import Project from "../models/Project.js";

const buildSearchRegex = (keyword) => new RegExp(keyword, "i");

export const globalSearch = asyncHandler(async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ success: false, message: "Search query is required", errors: [] });
  }

  const regex = buildSearchRegex(q);

  const [jobs, blogs, services, projects] = await Promise.all([
    Job.find({ $or: [{ title: regex }, { department: regex }, { description: regex }, { skillsRequired: regex }] }).limit(10),
    Blog.find({ $or: [{ title: regex }, { content: regex }, { tags: regex }, { author: regex }] }).limit(10),
    Service.find({ $or: [{ name: regex }, { description: regex }, { seoTitle: regex }, { seoDescription: regex }] }).limit(10),
    Project.find({ $or: [{ name: regex }, { clientName: regex }, { technologyUsed: regex }, { description: regex }, { category: regex }] }).limit(10)
  ]);

  res.json({ success: true, message: "Search results", data: { jobs, blogs, services, projects } });
});

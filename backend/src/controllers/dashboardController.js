import asyncHandler from "express-async-handler";
import ContactInquiry from "../models/ContactInquiry.js";
import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";
import Blog from "../models/Blog.js";
import Project from "../models/Project.js";

export const getDashboardMetrics = asyncHandler(async (req, res) => {
  const totalInquiries = await ContactInquiry.countDocuments();
  const totalJobs = await Job.countDocuments();
  const totalApplications = await JobApplication.countDocuments();
  const totalBlogs = await Blog.countDocuments();
  const totalProjects = await Project.countDocuments();

  const monthlyLeads = await ContactInquiry.aggregate([
    { $match: { createdAt: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 12)) } } },
    { $group: { _id: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } }, count: { $sum: 1 } } },
    { $sort: { "_id.year": 1, "_id.month": 1 } }
  ]);

  const recentApplications = await JobApplication.find().populate("appliedJob").sort({ createdAt: -1 }).limit(10);

  res.json({
    success: true,
    message: "Dashboard metrics fetched",
    data: {
      totalInquiries,
      totalJobs,
      totalApplications,
      totalBlogs,
      totalProjects,
      monthlyLeads,
      recentApplications
    }
  });
});

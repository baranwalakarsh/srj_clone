import express from "express";
import { body } from "express-validator";
import upload from "../middleware/uploadMiddleware.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import { createBlog, updateBlog, deleteBlog, getBlogs, getBlog } from "../controllers/blogController.js";
import validationMiddleware from "../middleware/validationMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorizeRoles("Super Admin", "Admin"),
  upload.single("featuredImage"),
  [body("title").notEmpty(), body("slug").notEmpty(), body("content").notEmpty(), body("author").notEmpty()],
  validationMiddleware,
  createBlog
);
router.put("/:id", protect, authorizeRoles("Super Admin", "Admin"), upload.single("featuredImage"), updateBlog);
router.delete("/:id", protect, authorizeRoles("Super Admin", "Admin"), deleteBlog);
router.get("/", getBlogs);
router.get("/:id", getBlog);

export default router;

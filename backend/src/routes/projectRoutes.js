import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import { createProject, updateProject, deleteProject, getProjects, getProject } from "../controllers/projectController.js";
import validationMiddleware from "../middleware/validationMiddleware.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("Super Admin", "Admin"), upload.array("images", 6), createProject);
router.put("/:id", protect, authorizeRoles("Super Admin", "Admin"), upload.array("images", 6), updateProject);
router.delete("/:id", protect, authorizeRoles("Super Admin", "Admin"), deleteProject);
router.get("/", getProjects);
router.get("/:id", getProject);

export default router;

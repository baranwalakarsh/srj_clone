import express from "express";
import { body } from "express-validator";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import { createJob, updateJob, deleteJob, getJobs, getJob } from "../controllers/careerController.js";
import validationMiddleware from "../middleware/validationMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorizeRoles("Super Admin", "Admin"),
  [body("title").notEmpty(), body("description").notEmpty()],
  validationMiddleware,
  createJob
);
router.put("/:id", protect, authorizeRoles("Super Admin", "Admin"), updateJob);
router.delete("/:id", protect, authorizeRoles("Super Admin", "Admin"), deleteJob);
router.get("/", getJobs);
router.get("/:id", getJob);

export default router;

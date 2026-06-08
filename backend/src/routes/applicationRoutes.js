import express from "express";
import { body } from "express-validator";
import upload from "../middleware/uploadMiddleware.js";
import { submitApplication, getApplications, getApplication, updateApplicationStatus } from "../controllers/applicationController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import validationMiddleware from "../middleware/validationMiddleware.js";

const router = express.Router();

router.post(
  "/",
  upload.single("resume"),
  [body("name").notEmpty(), body("email").isEmail(), body("appliedJob").notEmpty()],
  validationMiddleware,
  submitApplication
);
router.get("/", protect, authorizeRoles("Super Admin", "Admin", "HR"), getApplications);
router.get("/:id", protect, authorizeRoles("Super Admin", "Admin", "HR"), getApplication);
router.patch("/:id/status", protect, authorizeRoles("Super Admin", "Admin", "HR"), updateApplicationStatus);

export default router;

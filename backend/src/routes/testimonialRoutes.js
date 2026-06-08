import express from "express";
import { body } from "express-validator";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import { createTestimonial, updateTestimonial, deleteTestimonial, getTestimonials, getTestimonial } from "../controllers/testimonialController.js";
import validationMiddleware from "../middleware/validationMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorizeRoles("Super Admin", "Admin"),
  [body("clientName").notEmpty(), body("review").notEmpty(), body("rating").isInt({ min: 1, max: 5 })],
  validationMiddleware,
  createTestimonial
);
router.put("/:id", protect, authorizeRoles("Super Admin", "Admin"), updateTestimonial);
router.delete("/:id", protect, authorizeRoles("Super Admin", "Admin"), deleteTestimonial);
router.get("/", getTestimonials);
router.get("/:id", getTestimonial);

export default router;

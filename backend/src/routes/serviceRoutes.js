import express from "express";
import { body } from "express-validator";
import upload from "../middleware/uploadMiddleware.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import { createService, updateService, deleteService, getServices, getService } from "../controllers/serviceController.js";
import validationMiddleware from "../middleware/validationMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorizeRoles("Super Admin", "Admin"),
  upload.single("image"),
  [body("name").notEmpty(), body("slug").notEmpty(), body("description").notEmpty()],
  validationMiddleware,
  createService
);
router.put("/:id", protect, authorizeRoles("Super Admin", "Admin"), upload.single("image"), updateService);
router.delete("/:id", protect, authorizeRoles("Super Admin", "Admin"), deleteService);
router.get("/", getServices);
router.get("/:id", getService);

export default router;

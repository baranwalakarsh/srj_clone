import express from "express";
import { body } from "express-validator";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import { createCategory, updateCategory, deleteCategory, getCategories, getCategory } from "../controllers/categoryController.js";
import validationMiddleware from "../middleware/validationMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorizeRoles("Super Admin", "Admin"),
  [body("name").notEmpty(), body("slug").notEmpty()],
  validationMiddleware,
  createCategory
);
router.put("/:id", protect, authorizeRoles("Super Admin", "Admin"), updateCategory);
router.delete("/:id", protect, authorizeRoles("Super Admin", "Admin"), deleteCategory);
router.get("/", getCategories);
router.get("/:id", getCategory);

export default router;

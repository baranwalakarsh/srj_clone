import express from "express";
import { body } from "express-validator";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import { createTeamMember, updateTeamMember, deleteTeamMember, getTeamMembers, getTeamMember } from "../controllers/teamController.js";
import validationMiddleware from "../middleware/validationMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorizeRoles("Super Admin", "Admin"),
  [body("name").notEmpty(), body("designation").notEmpty()],
  validationMiddleware,
  createTeamMember
);
router.put("/:id", protect, authorizeRoles("Super Admin", "Admin"), updateTeamMember);
router.delete("/:id", protect, authorizeRoles("Super Admin", "Admin"), deleteTeamMember);
router.get("/", getTeamMembers);
router.get("/:id", getTeamMember);

export default router;

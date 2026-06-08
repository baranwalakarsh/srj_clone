import express from "express";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import { getDashboardMetrics } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/", protect, authorizeRoles("Super Admin", "Admin", "HR"), getDashboardMetrics);

export default router;

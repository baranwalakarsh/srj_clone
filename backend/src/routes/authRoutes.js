import express from "express";
import { body } from "express-validator";
import { login, logout, refreshToken, forgotPassword, resetPassword, changePassword } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import validationMiddleware from "../middleware/validationMiddleware.js";

const router = express.Router();

router.get("/login", (req, res) => {
  res.status(405).json({
    success: false,
    message: "Use POST /api/v1/auth/login with JSON body { email, password }.",
    errors: []
  });
});

router.post(
  "/login",
  [body("email").isEmail(), body("password").isLength({ min: 8 })],
  validationMiddleware,
  login
);
router.post("/logout", [body("refreshToken").notEmpty()], validationMiddleware, logout);
router.post("/refresh-token", [body("refreshToken").notEmpty()], validationMiddleware, refreshToken);
router.post("/forgot-password", [body("email").isEmail()], validationMiddleware, forgotPassword);
router.post("/reset-password/:token", [body("password").isLength({ min: 8 })], validationMiddleware, resetPassword);
router.post("/change-password", protect, [body("currentPassword").notEmpty(), body("newPassword").isLength({ min: 8 })], validationMiddleware, changePassword);

export default router;

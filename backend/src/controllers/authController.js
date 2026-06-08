import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import Admin from "../models/Admin.js";
import { sendEmail } from "../services/mailer.js";

const generateToken = (admin) => {
  return jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "15m"
  });
};

const generateRefreshToken = (admin) => {
  return jwt.sign({ id: admin._id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d"
  });
};

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email }).select("+password");

  if (!admin || !(await admin.comparePassword(password))) {
    return res.status(401).json({ success: false, message: "Invalid credentials", errors: [] });
  }

  const token = generateToken(admin);
  const refreshToken = generateRefreshToken(admin);
  admin.refreshToken = refreshToken;
  await admin.save();

  res.json({ success: true, message: "Login successful", data: { token, refreshToken, admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role } } });
});

export const logout = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  const admin = await Admin.findOne({ refreshToken });
  if (admin) {
    admin.refreshToken = null;
    await admin.save();
  }

  res.json({ success: true, message: "Logout successful", data: {} });
});

export const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).json({ success: false, message: "Refresh token is required", errors: [] });
  }

  const admin = await Admin.findOne({ refreshToken });
  if (!admin) {
    return res.status(401).json({ success: false, message: "Invalid refresh token", errors: [] });
  }

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err, decoded) => {
    if (err || decoded.id !== String(admin._id)) {
      return res.status(401).json({ success: false, message: "Refresh token invalid or expired", errors: [] });
    }

    const token = generateToken(admin);
    const newRefreshToken = generateRefreshToken(admin);
    admin.refreshToken = newRefreshToken;
    await admin.save();

    res.json({ success: true, message: "Token refreshed", data: { token, refreshToken: newRefreshToken } });
  });
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.status(404).json({ success: false, message: "Admin not found", errors: [] });
  }

  const resetToken = crypto.randomBytes(20).toString("hex");
  admin.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  admin.resetPasswordExpires = Date.now() + 3600000;
  await admin.save();

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
  const message = `Use this link to reset your password: ${resetUrl}`;

  await sendEmail({
    to: admin.email,
    subject: "Reset your password",
    text: message,
    html: `<p>${message}</p>`
  });

  res.json({ success: true, message: "Password reset email sent", data: {} });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");

  const admin = await Admin.findOne({ resetPasswordToken, resetPasswordExpires: { $gt: Date.now() } });
  if (!admin) {
    return res.status(400).json({ success: false, message: "Invalid or expired token", errors: [] });
  }

  admin.password = password;
  admin.resetPasswordToken = undefined;
  admin.resetPasswordExpires = undefined;
  await admin.save();

  res.json({ success: true, message: "Password reset successfully", data: {} });
});

export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const admin = await Admin.findById(req.admin._id).select("+password");

  if (!admin || !(await admin.comparePassword(currentPassword))) {
    return res.status(400).json({ success: false, message: "Current password is incorrect", errors: [] });
  }

  admin.password = newPassword;
  await admin.save();

  res.json({ success: true, message: "Password changed successfully", data: {} });
});

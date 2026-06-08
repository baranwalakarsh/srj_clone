import express from "express";
import { body } from "express-validator";
import { createContactInquiry, getInquiries, getInquiry, updateInquiryStatus } from "../controllers/contactController.js";
import { protect } from "../middleware/authMiddleware.js";
import validationMiddleware from "../middleware/validationMiddleware.js";

const router = express.Router();

router.post(
  "/",
  [
    body("fullName").notEmpty(),
    body("email").isEmail(),
    body("message").notEmpty()
  ],
  validationMiddleware,
  createContactInquiry
);

router.get("/", protect, getInquiries);
router.get("/:id", protect, getInquiry);
router.patch(
  "/:id/status",
  protect,
  [body("status").isIn(["New", "Contacted", "Converted", "Closed"])],
  validationMiddleware,
  updateInquiryStatus
);

export default router;

import asyncHandler from "express-async-handler";
import ContactInquiry from "../models/ContactInquiry.js";
import { sendEmail } from "../services/mailer.js";

export const createContactInquiry = asyncHandler(async (req, res) => {
  const inquiry = await ContactInquiry.create(req.body);

  const adminMessage = `New inquiry from ${inquiry.fullName} (${inquiry.email})`;
  await sendEmail({
    to: process.env.ADMIN_EMAIL,
    subject: "New contact inquiry received",
    text: adminMessage,
    html: `<p>${adminMessage}</p><p>Message: ${inquiry.message}</p>`
  });

  await sendEmail({
    to: inquiry.email,
    subject: "We received your inquiry",
    text: `Thank you for contacting us. We have received your message and will respond shortly.`,
    html: `<p>Thank you for contacting us. We have received your message and will respond shortly.</p>`
  });

  res.status(201).json({ success: true, message: "Inquiry submitted successfully", data: inquiry });
});

export const getInquiries = asyncHandler(async (req, res) => {
  const inquiries = await ContactInquiry.find().sort({ createdAt: -1 });
  res.json({ success: true, message: "Inquiries fetched", data: inquiries });
});

export const getInquiry = asyncHandler(async (req, res) => {
  const inquiry = await ContactInquiry.findById(req.params.id);
  if (!inquiry) {
    return res.status(404).json({ success: false, message: "Inquiry not found", errors: [] });
  }
  res.json({ success: true, message: "Inquiry fetched", data: inquiry });
});

export const updateInquiryStatus = asyncHandler(async (req, res) => {
  const inquiry = await ContactInquiry.findById(req.params.id);
  if (!inquiry) {
    return res.status(404).json({ success: false, message: "Inquiry not found", errors: [] });
  }

  inquiry.status = req.body.status || inquiry.status;
  await inquiry.save();
  res.json({ success: true, message: "Inquiry status updated", data: inquiry });
});

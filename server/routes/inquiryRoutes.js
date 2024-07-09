import express from "express";
import {
  createInquiry,
  getAllInquiries,
  getInquiryById,
  deleteInquiry,
} from "../controllers/inquiryController.js";

const router = express.Router();

// Routes for inquiries
router.post("/create", createInquiry);
router.get("/", getAllInquiries);
router.get("/:id", getInquiryById);
router.delete("/:id", deleteInquiry);

export default router;

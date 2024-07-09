import express from "express";
import {
  createInquiry,
  getAllInquiries,
  getInquiryById,
  deleteInquiry,
} from "../controllers/inquiryController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Routes for inquiries
router.post("/create", createInquiry);
router.get("/", getAllInquiries);
router.get("/:id", getInquiryById);
router.delete("/:id", authMiddleware, deleteInquiry);

export default router;

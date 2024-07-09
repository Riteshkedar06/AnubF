import { Router } from "express";
import {
  createBlog,
  deleteBlog,
  getBlogById,
  getBlogs,
  updateBlog,
} from "../controllers/BlogController.js";
import upload from "../middlewares/upload.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/get", getBlogs);
router.post("/", upload, authMiddleware, createBlog);
router.put("/:id", upload, authMiddleware, updateBlog);
router.delete("/:id", deleteBlog);
router.get("/get/:id", getBlogById);

export default router;

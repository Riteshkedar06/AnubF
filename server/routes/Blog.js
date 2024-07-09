import { Router } from "express";
import {
  createBlog,
  deleteBlog,
  getBlogById,
  getBlogs,
  updateBlog,
} from "../controllers/BlogController.js";
import upload from "../middlewares/upload.js";

const router = Router();

router.get("/get", getBlogs);
router.post("/", upload, createBlog);
router.put("/:id", upload, updateBlog);
router.delete("/:id", deleteBlog);
router.get("/get/:id", getBlogById);

export default router;

import { Router } from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getLatestProducts,
  getRelatedProducts,
} from "../controllers/ProductCont.js";
import upload from "../middlewares/upload.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/get", getProducts);
router.post("/", authMiddleware, upload, createProduct);
router.get("/latest", getLatestProducts);
router.put("/:id", authMiddleware, upload, updateProduct);
router.delete("/:id", authMiddleware, deleteProduct);
router.get("/get/:id", getProductById);
router.post("/get/related", getRelatedProducts);

export default router;

import express from "express";
import {
  register,
  login,
  verifyToken,
  getProfile,
} from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verify", verifyToken);
router.get("/profile", authMiddleware, getProfile);

export default router;

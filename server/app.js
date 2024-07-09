import express from "express";
import { connect } from "mongoose";
import bodyParser from "body-parser";
import productRoutes from "./routes/Product.js";
import authRoutes from "./routes/Auth.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import newsletterRoutes from "./routes/newsletter.js";
import inquiryRoutes from "./routes/inquiryRoutes.js";
import blogRoutes from "./routes/Blog.js";

import dotenv from "dotenv";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use("/products", productRoutes);
app.use("/auth", authRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/inquiries", inquiryRoutes);
app.use("/blog", blogRoutes);

// MongoDB Connection
connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

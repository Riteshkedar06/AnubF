import { Schema, model } from "mongoose";

// Define the main product schema
const productSchema = new Schema(
  {
    name: { type: String, required: true },
    material: { type: String, required: true },
    shape: { type: String, required: true },
    colorShade: [{ type: String, required: true }],
    brands: [{ type: String, required: true }],
    description: { type: String, required: true },
    images: [{ type: String, required: true }],
    tags: [{ type: String, required: true }],
    features: [{ type: String }],
    seating: { type: String },
    category: {
      type: String,
      required: true,
      enum: [
        "Panel Based System",
        "Desk Based System",
        "Cabin Based System",
        "Table Based System",
        "Storage Based System",
      ],
    },
  },
  { timestamps: true }
);

const Product = model("Product", productSchema);

export default Product;

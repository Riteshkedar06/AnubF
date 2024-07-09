import Product from "../models/ProductSchema.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
// Get the __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Get all products
// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new product
export const createProduct = async (req, res) => {
  const {
    name,
    description,
    category,
    tags,
    material,
    shape,
    colorShade,
    brands,
    features,
    seating,
  } = req.body;

  // Get uploaded files
  const files = req.files || [];
  const images = files.map((file) => file.path);

  const product = new Product({
    name,
    description,
    category,
    tags: JSON.parse(tags), // Parse tags if sent as a JSON string
    material,
    shape,
    colorShade: JSON.parse(colorShade),
    brands: JSON.parse(brands),
    features: JSON.parse(features),
    seating,
    images,
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("Error saving product:", err);
    res.status(400).json({ message: err.message });
  }
};

// Update a product
// Update a product
export const updateProduct = async (req, res) => {
  const {
    name,
    description,
    category,
    tags,
    material,
    shape,
    colorShade,
    brands,
    features,
    seating,
  } = req.body;

  // Get uploaded files
  const files = req.files || [];
  const images = files.length > 0 ? files.map((file) => file.path) : null;

  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        category,
        tags: JSON.parse(tags),
        material,
        shape,
        colorShade: JSON.parse(colorShade),
        brands: JSON.parse(brands),
        features: JSON.parse(features),
        seating,
        images: images || product.images, // Use new images if provided, otherwise keep existing ones
      },
      { new: true }
    );

    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a product

export const deleteProduct = async (req, res) => {
  try {
    // Find the product to get the image paths
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete the product from the database
    await Product.findByIdAndDelete(req.params.id);

    // Delete the image files from the uploads folder
    product.images.forEach((imagePath) => {
      const fullPath = path.join(
        __dirname,
        "../uploads",
        path.basename(imagePath)
      );
      fs.unlink(fullPath, (err) => {
        if (err) {
          console.error(`Error deleting file ${fullPath}:`, err);
        }
      });
    });

    res.json({ message: "Product and associated images deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Get latest product in each category
export const getLatestProducts = async (req, res) => {
  try {
    const categories = [
      "Panel Based System",
      "Desk Based System",
      "Cabin Based System",
      "Table Based System",
      "Storage Based System",
    ];

    const latestProducts = await Promise.all(
      categories.map(async (category) => {
        const product = await Product.findOne({ category })
          .sort({ createdAt: -1 })
          .limit(1);
        return product;
      })
    );

    res.json(latestProducts.filter((product) => product !== null));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Get related products based on tags
export const getRelatedProducts = async (req, res) => {
  const { tags, category, currentProductId } = req.body;

  try {
    // Fetch products based on tags, excluding the current product
    const relatedByTags = await Product.find({
      tags: { $in: tags },
      _id: { $ne: currentProductId },
    }).limit(3);

    // Fetch products based on category, excluding the current product
    const relatedByCategory = await Product.find({
      category: category,
      _id: { $ne: currentProductId },
    }).limit(3);

    res.json({ relatedByTags, relatedByCategory });
  } catch (error) {
    res.status(500).json({ message: "Error fetching related products", error });
  }
};

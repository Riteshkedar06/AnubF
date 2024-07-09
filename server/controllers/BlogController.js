import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import Blog from "../models/Blog.js";

// Get the __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Get all products
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single product by ID
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new product
export const createBlog = async (req, res) => {
  const { title, author, content } = req.body;
  // Get uploaded files
  const files = req.files || [];
  const image = files.map((file) => file.path);

  const blog = new Blog({
    title,
    author,
    content,
    image,
  });

  try {
    const newBlog = await blog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    console.error("Error saving product:", err);
    res.status(400).json({ message: err.message });
  }
};

// Update a product
export const updateBlog = async (req, res) => {
  const { title, author, content } = req.body;
  const files = req.files || [];
  const images = files.map((file) => file.path);

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        title,
        author,
        content,
        images,
      },
      { new: true }
    );
    res.json(updatedBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a product

export const deleteBlog = async (req, res) => {
  try {
    // Fetch the blog by ID
    const blog = await Blog.findById(req.params.id);

    // If blog not found, return 404
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Delete the blog from the database
    await Blog.findByIdAndDelete(req.params.id);

    // Check if the image array exists and is not empty
    if (blog.image && blog.image.length > 0) {
      blog.image.forEach((imagePath) => {
        // Construct the full path for the image
        const fullPath = path.join(
          __dirname,
          "../uploads",
          path.basename(imagePath)
        );
        // Attempt to delete the file
        fs.unlink(fullPath, (err) => {
          if (err) {
            console.error(`Error deleting file ${fullPath}:`, err);
          } else {
            console.log(`Deleted file: ${fullPath}`);
          }
        });
      });
    }

    // Respond with success message
    res.json({ message: "Blog and associated images deleted" });
  } catch (err) {
    // Log any error that occurs during the process
    console.error("Error in deleteBlog:", err);
    res.status(500).json({ message: err.message });
  }
};

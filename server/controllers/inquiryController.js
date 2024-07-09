import Inquiry from "../models/Inquiry.js";

// Controller to create a new inquiry
export const createInquiry = async (req, res) => {
  try {
    const { email, name, city, contact, message, productId } = req.body;
    const newInquiry = new Inquiry({
      email,
      name,
      city,
      contact,
      message,
      productId,
    });
    const savedInquiry = await newInquiry.save();
    res.status(201).json(savedInquiry);
  } catch (error) {
    console.error("Error creating inquiry:", error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the inquiry." });
  }
};

// Controller to get all inquiries
export const getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().populate("productId");
    res.status(200).json(inquiries);
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching inquiries." });
  }
};

// Controller to get a single inquiry by ID
export const getInquiryById = async (req, res) => {
  const { id } = req.params;
  try {
    const inquiry = await Inquiry.findById(id).populate("productId");
    if (!inquiry) {
      return res.status(404).json({ message: "Inquiry not found." });
    }
    res.status(200).json(inquiry);
  } catch (error) {
    console.error("Error fetching inquiry:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the inquiry." });
  }
};

// Controller to delete an inquiry by ID
export const deleteInquiry = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedInquiry = await Inquiry.findByIdAndDelete(id);
    if (!deletedInquiry) {
      return res.status(404).json({ message: "Inquiry not found." });
    }
    res.status(200).json({ message: "Inquiry deleted successfully." });
  } catch (error) {
    console.error("Error deleting inquiry:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the inquiry." });
  }
};

import mongoose from "mongoose";

const { Schema } = mongoose;

const inquirySchema = new Schema(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    city: { type: String },
    contact: { type: String },
    message: { type: String, required: true },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

const Inquiry = mongoose.model("Inquiry", inquirySchema);

export default Inquiry;

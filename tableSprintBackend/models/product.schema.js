import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    subcategory_name: { type: String, required: true },
    product_name: { type: String, required: true },
    status: { type: Boolean, default: true },
    product_image: { type: String, required: true, default: "" },
    category: {
      type: String,

      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("ProductSchema", ProductSchema);

export default Product;

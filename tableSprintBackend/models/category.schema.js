import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    category_name: { type: String, required: true, unique: true },
    category_sequence: { type: Number },
    status: { type: Boolean, default: true },
    category_image: { type: String, required: true },
  },
  { timestamps: true }
);

const Category = mongoose.model("CategorySchema", CategorySchema);

export default Category;

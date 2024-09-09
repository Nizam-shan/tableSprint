import mongoose from "mongoose";

const SubCategorySchema = new mongoose.Schema(
  {
    subcategory_name: { type: String, required: true, unique: true },
    subcategory_sequence: { type: Number },
    status: { type: Boolean, default: true },
    subcategory_image: { type: String, required: true, default: "" },
    category: {
      type: String,

      required: true,
    },
  },
  { timestamps: true }
);

const SubCategory = mongoose.model("SubCategorySchema", SubCategorySchema);

export default SubCategory;

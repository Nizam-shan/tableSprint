import { Router } from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";
import {
  AddCategory,
  AddProducts,
  AddSubCategory,
  deleteCategory,
  deleteProduct,
  deleteSubCategory,
  getAllCategory,
  getAllCategoryById,
  getAllProduct,
  getAllProductById,
  getAllSubCategory,
  getAllSubCategoryById,
  updateCategory,
  UpdateProduct,
  UpdateSubCategory,
} from "../controllers/crudController.js";

const router = Router();

router.post("/add_category", upload.single("category_image"), AddCategory);
router.put(
  "/update_category/:categoryId",
  upload.single("category_image"),
  updateCategory
);
router.delete("/delete_category/:categoryId", deleteCategory);
router.post(
  "/add_sub_category",
  upload.single("subcategory_image"),
  AddSubCategory
);

router.put(
  "/update_subcategory/:subcategoryId",
  upload.single("subcategory_image"),
  UpdateSubCategory
);

router.delete("/delete_Subcategory/:subcategoryId", deleteSubCategory);
router.get("/all_category", getAllCategory);
router.get("/all_category_byID/:categoryId", getAllCategoryById);
router.get("/all_sub_category", getAllSubCategory);
router.get("/all_sub_category_byID/:subCategoryId", getAllSubCategoryById);

router.post("/add_product", upload.single("product_image"), AddProducts);
router.put(
  "/update_products/:productId",
  upload.single("product_image"),
  UpdateProduct
);
router.delete("/delete_product/:productId", deleteProduct);
router.get("/all_products", getAllProduct);
router.get("/all_products_byID/:productId", getAllProductById);

export default router;

import Joi from "joi";
import { sendResponse } from "../helpers/Response.js";

import Category from "../models/category.schema.js";
import SubCategory from "../models/subcategory.schema.js";
import Product from "../models/product.schema.js";

const categoryJoiValidation = Joi.object({
  category_name: Joi.string().required(),
  category_sequence: Joi.number().required(),

  category_image: Joi.string().allow(""),
});

export const AddCategory = async (req, res) => {
  try {
    const { error } = categoryJoiValidation.validate(req.body);
    if (error) {
      return sendResponse(res, 400, null, error?.details[0]?.message);
    }

    if (req.files) {
      upload.single("category_image"),
        (req, res) => {
          if (!req.file) {
            return sendResponse(res, 400, null, "No file uploaded");
          }
          res.send("File uploaded successfully: " + req.file.filename);
        };
    }
    const path = req.file ? `/uploads/${req.file.filename}` : "";
    const { category_name, category_sequence, category_image } = req.body;
    const categoryExists = await Category.findOne({ category_name });
    if (categoryExists) {
      return sendResponse(res, 400, null, "Category already exists");
    }
    const newCategory = new Category({
      category_image: path,
      category_name,
      category_sequence,
    });
    await newCategory.save();
    return sendResponse(res, 201, newCategory, "Category added successfully");
  } catch (error) {
    console.log("🚀 ~ AddCategory ~ error:", error);
    return sendResponse(res, 500, null, error.message);
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { category_name, category_sequence, category_image, status } =
      req.body;

    // Check if category exists
    const existingCategory = await Category.findById(categoryId);
    if (!existingCategory) {
      return sendResponse(res, 404, null, "Category not found");
    }

    // Handle file upload
    let path = existingCategory.category_image;
    if (req.file) {
      path = `/uploads/${req.file.filename}`;
    }

    // Update category
    existingCategory.category_name =
      category_name || existingCategory.category_name;
    existingCategory.category_sequence =
      category_sequence || existingCategory.category_sequence;
    existingCategory.category_image = path;
    existingCategory.status =
      typeof status !== undefined ? status : existingCategory.status;

    await existingCategory.save();
    return sendResponse(
      res,
      200,
      existingCategory,
      "Category updated successfully"
    );
  } catch (error) {
    console.log("🚀 ~ updateCategory ~ error:", error);
    return sendResponse(res, 500, null, error.message);
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    // Check if category exists
    const existingCategory = await Category.findById(categoryId);
    if (!existingCategory) {
      return sendResponse(res, 404, null, "Category not found");
    }

    // Delete category
    await existingCategory.deleteOne();
    return sendResponse(res, 200, null, "Category deleted successfully");
  } catch (error) {
    console.log("🚀 ~ deleteCategory ~ error:", error);
    return sendResponse(res, 500, null, error.message);
  }
};

export const AddSubCategory = async (req, res) => {
  try {
    const {
      category,
      subcategory_name,
      subcategory_sequence,
      subcategory_image,
    } = req.body;
    const categoryExist = await Category.findOne({ category_name: category });
    if (!categoryExist) {
      return sendResponse(res, 404, null, "Category not found");
    }

    const subcategoryExist = await SubCategory.findOne({ subcategory_name });
    if (subcategoryExist) {
      return sendResponse(res, 400, null, "SubCategory already exists");
    }

    let path = "";
    if (req.file) {
      path = `/uploads/${req.file.filename}`;
    }

    const newsubcategory = new SubCategory({
      subcategory_name,
      subcategory_sequence,
      subcategory_image: path,
      category: category,
    });
    newsubcategory.save();
    return sendResponse(
      res,
      201,
      newsubcategory,
      "Sub Category added successfully"
    );
  } catch (error) {
    return sendResponse(res, 500, null, error.message);
  }
};

export const UpdateSubCategory = async (req, res) => {
  try {
    const { subcategoryId } = req.params;
    const {
      subcategory_name,
      subcategory_sequence,
      subcategory_image,
      category,
      status,
    } = req.body;
    const exist = await SubCategory.findById(subcategoryId);
    if (!exist) {
      return sendResponse(res, 404, null, "SubCategory not found");
    }
    let path = exist.subcategory_image;
    if (req.file) {
      path = `/uploads/${req.file.filename}`;
    }

    exist.subcategory_name = subcategory_name || exist.subcategory_name;
    exist.category = category || exist.category;
    exist.subcategory_sequence =
      subcategory_sequence || exist.subcategory_sequence;
    exist.subcategory_image = path;
    exist.status = typeof status !== undefined ? status : exist.status;
    await exist.save();
    return sendResponse(res, 200, exist, "sub Category updated successfully");
  } catch (error) {
    console.log("🚀 ~ updateCategory ~ error:", error);
    return sendResponse(res, 500, null, error.message);
  }
};

export const deleteSubCategory = async (req, res) => {
  try {
    const { subcategoryId } = req.params;

    // Check if category exists
    const existingSubCategory = await SubCategory.findById(subcategoryId);
    if (!existingSubCategory) {
      return sendResponse(res, 404, null, "Sub Category not found");
    }

    // Delete category
    await existingSubCategory.deleteOne();
    return sendResponse(res, 200, null, "Sub Category deleted successfully");
  } catch (error) {
    console.log("🚀 ~ deleteSubCategory ~ error:", error);
    return sendResponse(res, 500, null, error.message);
  }
};

export const getAllCategory = async (req, res) => {
  try {
    const categoryList = await Category.find({}).sort({ createdAt: -1 });
    return sendResponse(
      res,
      200,
      categoryList,
      "Fetched all category Successfully"
    );
  } catch (error) {
    return sendResponse(res, 500, null, error.message);
  }
};

export const getAllCategoryById = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const categoryList = await Category.findById({ _id: categoryId });

    return sendResponse(
      res,
      200,
      categoryList,
      "Fetched  category Successfully"
    );
  } catch (error) {
    console.log("🚀 ~ getAllCategoryById ~ error:", error);
    return sendResponse(res, 500, null, error.message);
  }
};

export const getAllSubCategory = async (req, res) => {
  try {
    const subcategoryList = await SubCategory.find({}).sort({ createdAt: -1 });
    return sendResponse(
      res,
      200,
      subcategoryList,
      "Fetched all Sub Category Successfully"
    );
  } catch (error) {
    return sendResponse(res, 500, null, error.message);
  }
};

export const getAllSubCategoryById = async (req, res) => {
  try {
    const { subCategoryId } = req.params;
    const subCategoryList = await SubCategory.findById({ _id: subCategoryId });

    return sendResponse(
      res,
      200,
      subCategoryList,
      "Fetched  sub category Successfully"
    );
  } catch (error) {
    console.log("🚀 ~ getAllCategoryById ~ error:", error);
    return sendResponse(res, 500, null, error.message);
  }
};

// products

export const AddProducts = async (req, res) => {
  try {
    const { category, subcategory_name, product_name, product_image } =
      req.body;
    const categoryExist = await Category.findOne({
      category_name: category,
    });
    if (!categoryExist) {
      return sendResponse(res, 404, null, "Category not found");
    }

    const subcategoryExist = await SubCategory.findOne({
      subcategory_name: subcategory_name,
    });
    if (!subcategoryExist) {
      return sendResponse(res, 404, null, "Sub Category not found");
    }

    const productExist = await Product.findOne({ product_name: product_name });
    if (productExist) {
      return sendResponse(res, 400, null, "Product already exists");
    }

    let path = "";
    if (req.file) {
      path = `/uploads/${req.file.filename}`;
    }

    const newProduct = new Product({
      subcategory_name,
      product_name,
      product_image: path,
      category: category,
    });
    newProduct.save();
    return sendResponse(res, 201, newProduct, "Product added successfully");
  } catch (error) {
    return sendResponse(res, 500, null, error.message);
  }
};

export const UpdateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { subcategory_name, product_name, product_image, category, status } =
      req.body;
    const exist = await Product.findById(productId);
    if (!exist) {
      return sendResponse(res, 404, null, "Product not found");
    }
    let path = exist.product_image;
    if (req.file) {
      path = `/uploads/${req.file.filename}`;
    }

    exist.subcategory_name = subcategory_name || exist.subcategory_name;
    exist.category = category || exist.category;

    exist.product_name = product_name || exist.product_name;
    exist.product_image = path;
    exist.status = typeof status !== undefined ? status : exist.status;
    await exist.save();
    return sendResponse(res, 200, exist, "Product updated successfully");
  } catch (error) {
    console.log("🚀 ~ updateCategory ~ error:", error);
    return sendResponse(res, 500, null, error.message);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    // Check if category exists
    const existingSubCategory = await Product.findById(productId);
    if (!existingSubCategory) {
      return sendResponse(res, 404, null, "Product not found");
    }

    // Delete category
    await existingSubCategory.deleteOne();
    return sendResponse(res, 200, null, "Product deleted successfully");
  } catch (error) {
    console.log("🚀 ~ deleteSubCategory ~ error:", error);
    return sendResponse(res, 500, null, error.message);
  }
};

export const getAllProduct = async (req, res) => {
  try {
    const productList = await Product.find({}).sort({ createdAt: -1 });
    return sendResponse(
      res,
      200,
      productList,
      "Fetched all products Successfully"
    );
  } catch (error) {
    return sendResponse(res, 500, null, error.message);
  }
};

export const getAllProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const list = await Product.findById({ _id: productId });

    return sendResponse(res, 200, list, "Fetched products Successfully");
  } catch (error) {
    console.log("🚀 ~ getAllCategoryById ~ error:", error);
    return sendResponse(res, 500, null, error.message);
  }
};

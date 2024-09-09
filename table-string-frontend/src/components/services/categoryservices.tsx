import axios from "axios";

export const addCategory = async (data: any) =>
  await axios.post(`${process.env.REACT_APP_API}/add_category`, data, {
    headers: { Authorization: localStorage.getItem("access_token") },
  });

export const getAllCategory = async () =>
  await axios.get(`${process.env.REACT_APP_API}/all_category`, {
    headers: { Authorization: localStorage.getItem("access_token") },
  });

export const getAllCategoryById = async (id: any) =>
  await axios.get(`${process.env.REACT_APP_API}/all_category_byID/${id}`, {
    headers: { Authorization: localStorage.getItem("access_token") },
  });

export const editCategory = async (data: any, id: any) =>
  await axios.put(`${process.env.REACT_APP_API}/update_category/${id}`, data, {
    headers: { Authorization: localStorage.getItem("access_token") },
  });

export const deleteCategory = async (id: any) =>
  await axios.delete(`${process.env.REACT_APP_API}/delete_category/${id}`, {
    headers: { Authorization: localStorage.getItem("access_token") },
  });

// sub category services

export const addSubCategory = async (data: any) =>
  await axios.post(`${process.env.REACT_APP_API}/add_sub_category`, data, {
    headers: { Authorization: localStorage.getItem("access_token") },
  });

export const getAllSubCategory = async () =>
  await axios.get(`${process.env.REACT_APP_API}/all_sub_category`, {
    headers: { Authorization: localStorage.getItem("access_token") },
  });

export const getAllSubCategoryById = async (id: any) =>
  await axios.get(`${process.env.REACT_APP_API}/all_sub_category_byID/${id}`, {
    headers: { Authorization: localStorage.getItem("access_token") },
  });

export const editSubCategory = async (data: any, id: any) =>
  await axios.put(
    `${process.env.REACT_APP_API}/update_subcategory/${id}`,
    data,
    {
      headers: { Authorization: localStorage.getItem("access_token") },
    }
  );

export const deleteSubCategory = async (id: any) =>
  await axios.delete(`${process.env.REACT_APP_API}/delete_Subcategory/${id}`, {
    headers: { Authorization: localStorage.getItem("access_token") },
  });

export const RegisterService = async (data: any) =>
  await axios.post(`${process.env.REACT_APP_API}/auth/register`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const LoginService = async (data: any) =>
  await axios.post(`${process.env.REACT_APP_API}/auth/login`, data);

export const getAllProducts = async () =>
  await axios.get(`${process.env.REACT_APP_API}/all_products`, {
    headers: { Authorization: localStorage.getItem("access_token") },
  });

export const getAllProductsById = async (id: any) =>
  await axios.get(`${process.env.REACT_APP_API}/all_products_byID/${id}`, {
    headers: { Authorization: localStorage.getItem("access_token") },
  });

export const addProducts = async (data: any) =>
  await axios.post(`${process.env.REACT_APP_API}/add_product`, data, {
    headers: { Authorization: localStorage.getItem("access_token") },
  });

export const editProducts = async (data: any, id: any) =>
  await axios.put(`${process.env.REACT_APP_API}/update_products/${id}`, data, {
    headers: { Authorization: localStorage.getItem("access_token") },
  });

export const deleteProducts = async (id: any) =>
  await axios.delete(`${process.env.REACT_APP_API}/delete_product/${id}`, {
    headers: { Authorization: localStorage.getItem("access_token") },
  });

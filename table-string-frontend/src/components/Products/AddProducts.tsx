import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useContext, useEffect, useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { toast } from "react-toastify";
import {
  addProducts,
  editProducts,
  getAllProductsById,
} from "../services/categoryservices";
import ImageUploadComponent from "../Category/ImageUpload";
import { GlobalContext } from "../utlis/GlobalContext";

interface ProductCategory {
  _id?: string;
  subcategory_name?: string;
  product_name?: string;
  product_image?: string;
  category?: string;
  status?: any;
}

export default function AddProducts() {
  const locatoion = useLocation();
  const [formData, setFormData] = useState<ProductCategory>({});

  const queryParams = new URLSearchParams(locatoion.search);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const formId = queryParams.get("formdataId");
  const navigate = useNavigate();
  const globalContext = useContext(GlobalContext);

  const isEditMode = queryParams.get("isEdit");

  const initialValues = {
    subcategory_name: formData.subcategory_name || "",
    product_name: formData.product_name || "",
    product_image: formData.product_image || "",
    category: formData.category || "",
    status: formData.status ?? true,
  };
  const fetchProductsById = async () => {
    try {
      if (formId) {
        const response = await getAllProductsById(formId);

        setFormData(response?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  useEffect(() => {
    if (isEditMode && formId) {
      fetchProductsById();
    }
    //eslint-disable-next-line
  }, [isEditMode, formId]);

  const validationSchema = Yup.object({
    subcategory_name: Yup.string()
      .required("Sub category name is required")
      .trim(),
    product_name: Yup.string().required("category sequece is required").trim(),
    product_image: Yup.string().required("Product image is required").trim(),
    // status: Yup.boolean().nullable(),
    category: Yup.string().required("category is required"),
  });
  if (!globalContext) {
    return <div>Loading...</div>;
  }
  const {
    fetchAllProducts,
    allCategory,
    allSubcategory,
    isLoading,
    setLoading,
  } = globalContext;
  if (!allCategory) {
    return <div>Loading products...</div>;
  }
  const data = new FormData();

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: { setSubmitting: (setSubmitting: boolean) => void }
  ) => {
    data.append("subcategory_name", values?.subcategory_name);
    data.append("product_name", values?.product_name);
    data.append("product_image", values?.product_image);
    data.append("category", values?.category);
    setLoading(true);
    setSubmitting(true);

    if (isEditMode) {
      data.append("status", values?.status);
      await editProducts(data, formData._id)
        .then((res) => {
          fetchProductsById();
          fetchAllProducts();
          setLoading(false);
          toast.success(res.data?.message);
        })
        .catch((error) => {
          toast.error(error.response.data.message || "Some error occured");
          setLoading(false);
        });
    } else {
      await addProducts(data)
        .then((res) => {
          fetchAllProducts();
          values.subcategory_name = "";
          values.product_name = "";
          values.product_image = "";
          values.category = "";
          setLoading(false);
          toast.success(res.data?.message);

          setImagePreview(null);
        })
        .catch((error) => {
          toast.error(
            error?.response?.data?.message ||
              "Some error occurred. Please try again"
          );
          setLoading(false);
        });
    }
    setSubmitting(false);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          minHeight: "85vh",
          flexDirection: "column",
          borderRadius: 2,
          boxShadow: 2,
          p: 2,
        }}
      >
        {isLoading === true && (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            textAlign: "center",
            alignItems: "center",
            gap: 2,
            p: 2,
          }}
        >
          <GoArrowLeft
            style={{ width: "25px", height: "auto", cursor: "pointer" }}
            onClick={() => navigate("/products")}
          />
          <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
            {isEditMode ? "Edit Product" : "Add Product"}
          </Typography>
        </Box>
        <Box>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              isSubmitting,
              setFieldValue,
              handleChange,
              values,
              touched,
              errors,
            }) => (
              <Form style={{ flexGrow: 1 }}>
                <Grid2 container spacing={8} sx={{ mt: 5, px: 3 }}>
                  <Grid2 size={{ lg: 4, sm: 12 }}>
                    <FormControl fullWidth>
                      <InputLabel>Category</InputLabel>
                      <Select
                        name="category"
                        value={values?.category}
                        onChange={(e) =>
                          setFieldValue("category", e.target.value)
                        }
                        label="Category"
                        sx={{ borderRadius: 3, color: "#818181" }}
                      >
                        {allCategory &&
                          allCategory?.map((item, index) => (
                            <MenuItem
                              key={index + 1}
                              value={item?.category_name}
                            >
                              {item?.category_name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Grid2>

                  <Grid2 size={{ lg: 4, sm: 12 }}>
                    <FormControl fullWidth>
                      <InputLabel>Subcategory</InputLabel>
                      <Select
                        name="subcategory_name"
                        value={values?.subcategory_name}
                        onChange={(e) =>
                          setFieldValue("subcategory_name", e.target.value)
                        }
                        label="Subcategory"
                        sx={{ borderRadius: 3, color: "#818181" }}
                      >
                        {allSubcategory &&
                          allSubcategory?.map((item, index) => (
                            <MenuItem
                              key={index + 1}
                              value={item?.subcategory_name}
                            >
                              {item?.subcategory_name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Grid2>
                  <Grid2 size={{ lg: 4, sm: 12 }}>
                    <TextField
                      margin="dense"
                      name="product_name"
                      label="Product Name"
                      fullWidth
                      sx={{
                        "& label.Mui-focused": {
                          color: "black",
                          fontWeight: 600,
                        },
                        "& .MuiOutlinedInput-root": {
                          "&.Mui-focused fieldset": {
                            borderColor: "black",
                          },
                        },
                      }}
                      InputProps={{ sx: { borderRadius: 3, color: "#818181" } }}
                      value={values.product_name}
                      onChange={handleChange}
                      error={
                        touched.product_name && Boolean(errors.product_name)
                      }
                      helperText={
                        touched.product_name &&
                        typeof errors.product_name === "string"
                          ? errors.product_name
                          : ""
                      }
                    />
                  </Grid2>
                  {isEditMode && (
                    <Grid2 size={{ lg: 4, sm: 12 }}>
                      <FormControl fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select
                          name="status"
                          value={
                            values?.status === true ? "active" : "inactive"
                          }
                          // onChange={handleChange}
                          onChange={(e) =>
                            setFieldValue("status", e.target.value === "active")
                          }
                          label="status"
                          sx={{ borderRadius: 3, color: "#818181" }}
                        >
                          <MenuItem value="active">Active</MenuItem>
                          <MenuItem value="inactive">inActive</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid2>
                  )}

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <ImageUploadComponent
                      setFieldValue={setFieldValue}
                      setImagePreview={setImagePreview}
                      imagePreview={imagePreview}
                      isEditMode={isEditMode}
                      image={formData?.product_image}
                      name={"product_image"}
                    />
                    <p style={{ color: "#a83232" }}>
                      {touched.product_image &&
                      typeof errors.product_image === "string"
                        ? errors.product_image
                        : ""}
                    </p>
                  </Box>
                  <Grid2
                    size={12}
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "flex-end",
                      p: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        mt: 15,
                        gap: 3,
                      }}
                    >
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        fullWidth
                        variant="outlined"
                        sx={{
                          textTransform: "none",
                          mt: 2,
                          px: 5,
                          borderRadius: 5,
                          color: "#767676",
                          borderColor: "#767676",
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        color="primary"
                        disabled={isSubmitting}
                        fullWidth
                        variant="contained"
                        sx={{
                          textTransform: "none",
                          mt: 2,
                          px: 5,
                          borderRadius: 5,
                          background: "#662671",
                        }}
                      >
                        {isEditMode ? "Edit" : "Save"}
                      </Button>
                    </Box>
                  </Grid2>
                </Grid2>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </>
  );
}

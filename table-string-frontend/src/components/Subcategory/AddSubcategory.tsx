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
  addSubCategory,
  editSubCategory,
  getAllSubCategoryById,
} from "../services/categoryservices";
import ImageUploadComponent from "../Category/ImageUpload";
import { GlobalContext } from "../utlis/GlobalContext";

interface SubCategory {
  _id?: string;
  subcategory_name?: string;
  subcategory_sequence?: string;
  subcategory_image?: string;
  category?: string;
  status?: any;
}

export default function AddSubCategory() {
  const locatoion = useLocation();
  const [formData, setFormData] = useState<SubCategory>({});

  const queryParams = new URLSearchParams(locatoion.search);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const formId = queryParams.get("formdataId");
  const navigate = useNavigate();
  const globalContext = useContext(GlobalContext);

  const isEditMode = queryParams.get("isEdit");

  const initialValues = {
    subcategory_name: formData.subcategory_name || "",
    subcategory_sequence: formData.subcategory_sequence || "",
    subcategory_image: formData.subcategory_image || "",
    category: formData.category || "",

    status: formData.status ?? true,
  };
  const fetchSubCategoryById = async () => {
    try {
      if (formId) {
        const response = await getAllSubCategoryById(formId);

        setFormData(response?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  useEffect(() => {
    if (isEditMode && formId) {
      fetchSubCategoryById();
    }
    // eslint-disable-next-line
  }, [isEditMode, formId]);

  const validationSchema = Yup.object({
    subcategory_name: Yup.string()
      .required("Sub category name is required")
      .trim(),
    subcategory_sequence: Yup.string()
      .required("category sequece is required")
      .trim(),
    subcategory_image: Yup.string()
      .required("sub category image is required")
      .trim(),
    // status: Yup.boolean().nullable(),
    category: Yup.string().required("category is required"),
  });
  if (!globalContext) {
    return <div>Loading...</div>;
  }
  const { allCategory, fetchSubCategory, isLoading, setLoading } =
    globalContext;
  if (!allCategory) {
    return <div>Loading categories...</div>;
  }
  const data = new FormData();

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: { setSubmitting: (setSubmitting: boolean) => void }
  ) => {
    data.append("subcategory_name", values?.subcategory_name);
    data.append("subcategory_sequence", values?.subcategory_sequence);
    data.append("subcategory_image", values?.subcategory_image);
    data.append("category", values?.category);

    setSubmitting(true);
    setLoading(true);
    if (isEditMode) {
      data.append("status", values?.status);
      await editSubCategory(data, formData._id)
        .then((res) => {
          fetchSubCategoryById();
          fetchSubCategory();
          setLoading(false);
          toast.success(res.data?.message);
        })
        .catch((error) => {
          setLoading(false);

          toast.error(error.response.data.message || "Some error occured");
        });
    } else {
      await addSubCategory(data)
        .then((res) => {
          fetchSubCategory();
          values.subcategory_name = "";
          values.subcategory_sequence = "";
          values.subcategory_image = "";
          values.category = "";
          setLoading(false);

          toast.success(res.data?.message);

          setImagePreview(null);
        })
        .catch((error) => {
          console.log("🚀 ~ AddCategory ~ error:", error);
          setLoading(false);

          toast.error(
            error?.response?.data?.message ||
              "Some error occurred. Please try again"
          );
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
            onClick={() => navigate("/subcategory")}
          />
          <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
            {isEditMode ? "Edit Sub category" : "Add Sub Category"}
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
                    <TextField
                      margin="dense"
                      name="subcategory_name"
                      label="Sub Category Name"
                      placeholder="Enter Sub Category Name"
                      type="text"
                      autoComplete="off"
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
                      value={values.subcategory_name}
                      onChange={handleChange}
                      error={
                        touched.subcategory_name &&
                        Boolean(errors.subcategory_name)
                      }
                      helperText={
                        touched.subcategory_name &&
                        typeof errors.subcategory_name === "string"
                          ? errors.subcategory_name
                          : ""
                      }
                    />
                  </Grid2>
                  <Grid2 size={{ lg: 4, sm: 12 }}>
                    <TextField
                      margin="dense"
                      name="subcategory_sequence"
                      label="Category Sequence"
                      type="number"
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
                      value={values.subcategory_sequence}
                      onChange={handleChange}
                      error={
                        touched.subcategory_sequence &&
                        Boolean(errors.subcategory_sequence)
                      }
                      helperText={
                        touched.subcategory_sequence &&
                        typeof errors.subcategory_sequence === "string"
                          ? errors.subcategory_sequence
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
                      image={formData?.subcategory_image}
                      name={"subcategory_image"}
                    />
                    <p style={{ color: "#a83232" }}>
                      {touched.subcategory_image &&
                      typeof errors.subcategory_image === "string"
                        ? errors.subcategory_image
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

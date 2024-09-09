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

import ImageUploadComponent from "./ImageUpload";
import { toast } from "react-toastify";
import {
  addCategory,
  editCategory,
  getAllCategoryById,
} from "../services/categoryservices";
import { GlobalContext } from "../utlis/GlobalContext";

interface Category {
  _id?: string;
  category_name?: string;
  category_sequence?: string;
  category_image?: string;
  status?: any;
}

export default function AddCategory() {
  const globalContext = useContext(GlobalContext);
  const locatoion = useLocation();
  const [formData, setFormData] = useState<Category>({});

  const queryParams = new URLSearchParams(locatoion.search);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const formId = queryParams.get("formdataId");
  const navigate = useNavigate();

  const isEditMode = queryParams.get("isEdit");

  const initialValues = {
    category_name: formData.category_name || "",
    category_sequence: formData.category_sequence || "",
    category_image: formData.category_image || "",
    status: formData.status ?? true,
  };
  const fetchCategoryById = async () => {
    try {
      if (formId) {
        const response = await getAllCategoryById(formId);

        setFormData(response?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  useEffect(() => {
    if (isEditMode && formId) {
      fetchCategoryById();
    }
    //eslint-disable-next-line
  }, [isEditMode, formId]);

  const validationSchema = Yup.object({
    category_name: Yup.string().required("category name is required").trim(),
    category_sequence: Yup.string()
      .required("category sequece is required")
      .trim(),
    category_image: Yup.string().required("category image is required").trim(),
    // status: Yup.boolean().nullable(),
  });

  const data = new FormData();
  if (!globalContext) {
    return <div>Loading...</div>;
  }
  const { isLoading, setLoading } = globalContext;

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: { setSubmitting: (setSubmitting: boolean) => void }
  ) => {
    data.append("category_name", values?.category_name);
    data.append("category_sequence", values?.category_sequence);
    data.append("category_image", values?.category_image);

    setLoading(true);
    setSubmitting(true);
    if (isEditMode) {
      data.append("status", values?.status);
      await editCategory(data, formData._id)
        .then((res) => {
          fetchCategoryById();
          setLoading(false);
          toast.success(res.data?.message);
        })
        .catch((error) => {
          toast.error(error.response.data.message || "Some error occured");
        });
    } else {
      await addCategory(data)
        .then((res) => {
          values.category_name = "";
          values.category_sequence = "";
          values.category_image = "";
          setImagePreview(null);
          setLoading(false);

          toast.success(res.data?.message);
        })
        .catch((error) => {
          console.log("🚀 ~ AddCategory ~ error:", error);

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
            onClick={() => navigate("/cat")}
          />
          <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
            {isEditMode ? "Edit category" : "Add Category"}
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
                  <Grid2 size={{ lg: isEditMode ? 4 : 5, sm: 12 }}>
                    <TextField
                      margin="dense"
                      name="category_name"
                      label="Category Name"
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
                      value={values.category_name}
                      onChange={handleChange}
                      error={
                        touched.category_name && Boolean(errors.category_name)
                      }
                      helperText={
                        touched.category_name &&
                        typeof errors.category_name === "string"
                          ? errors.category_name
                          : ""
                      }
                    />
                  </Grid2>
                  <Grid2 size={{ lg: isEditMode ? 4 : 5, sm: 12 }}>
                    <TextField
                      margin="dense"
                      name="category_sequence"
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
                      value={values.category_sequence}
                      onChange={handleChange}
                      error={
                        touched.category_sequence &&
                        Boolean(errors.category_sequence)
                      }
                      helperText={
                        touched.category_sequence &&
                        typeof errors.category_sequence === "string"
                          ? errors.category_sequence
                          : ""
                      }
                    />
                  </Grid2>
                  {isEditMode && (
                    <Grid2 size={{ lg: isEditMode ? 4 : 5, sm: 12 }}>
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
                          <MenuItem value="inactive">inactive</MenuItem>
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
                      image={formData?.category_image}
                      name={"category_image"}
                    />
                    <p style={{ color: "#a83232" }}>
                      {touched.category_image &&
                      typeof errors.category_image === "string"
                        ? errors.category_image
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

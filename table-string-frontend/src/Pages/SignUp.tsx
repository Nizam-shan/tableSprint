import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterService } from "../components/services/categoryservices";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { GlobalContext } from "../components/utlis/GlobalContext";

export default function SignUp() {
  const globalContext = useContext(GlobalContext);

  const navigate = useNavigate();
  if (!globalContext) {
    return <div>Loading...</div>;
  }
  const { isLoading, setLoading } = globalContext;
  const initialValues = {
    first_name: "",
    email: "",
    password: "",
    confirm_password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    first_name: Yup.string().required("First name is required").trim(),
    last_name: Yup.string(),
    confirm_password: Yup.string()
      .required("Confirm passsword is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: { setSubmitting: (setSubmitting: boolean) => void }
  ) => {
    setLoading(true);
    setSubmitting(true);
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("first_name", values.first_name);

    formData.append("password", values.password);

    RegisterService(values)
      .then((res) => {
        const data = res.data;
        console.log("🚀 ~ .then ~ data:", data);
        setLoading(false);
        if (data.status_code === 201) {
          //   navigate("/");
          window.location.replace("/");
          toast.success(data?.message || "Login sucessfull");
        }
      })
      .catch((err) => {
        console.log("🚀 ~ handleSubmit ~ err:", err);
        setLoading(false);

        toast.error(
          err?.response?.data?.message ||
            "Some error occurred. Please try again"
        );
      });
    setSubmitting(false);
  };
  return (
    <Box
      sx={{
        backgroundImage: "url(/images/imagesignup.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
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
          width: "100%",
          maxWidth: "600px",
          padding: "20px",

          borderRadius: "10px",
          display: "flex",

          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src="/images/dashboard.png" alt="Dashboard" />
          <Typography variant="h6" sx={{ color: "#868686" }}>
            Welcome to TableSprint admin
          </Typography>
        </Box>
        <Formik
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
            <Form style={{ padding: "50px" }}>
              <TextField
                margin="dense"
                name="first_name"
                label="First Name"
                type="text"
                autoComplete="off"
                fullWidth
                value={values.first_name}
                onChange={handleChange}
                error={touched.first_name && Boolean(errors.first_name)}
                helperText={touched.first_name && errors.first_name}
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
                  mb: 3,
                }}
                InputProps={{
                  sx: { borderRadius: 3, color: "#818181" },
                }}
              />

              <TextField
                margin="dense"
                name="email"
                label="Email"
                type="email"
                autoComplete="off"
                fullWidth
                value={values.email}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
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
                  mb: 3,
                }}
                InputProps={{ sx: { borderRadius: 3, color: "#818181" } }}
              />
              <TextField
                margin="dense"
                name="password"
                label="Password"
                type="password"
                fullWidth
                value={values.password}
                onChange={handleChange}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
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
                  mb: 3,
                }}
                InputProps={{ sx: { borderRadius: 3, color: "#818181" } }}
              />
              <TextField
                margin="dense"
                name="confirm_password"
                label="Confirm Password"
                type="password"
                fullWidth
                value={values.confirm_password}
                onChange={handleChange}
                error={
                  touched.confirm_password && Boolean(errors.confirm_password)
                }
                helperText={touched.confirm_password && errors.confirm_password}
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
                  mb: 3,
                }}
                InputProps={{ sx: { borderRadius: 3, color: "#818181" } }}
              />

              <Button
                type="submit"
                color="primary"
                disabled={isSubmitting}
                fullWidth
                variant="contained"
                sx={{
                  textTransform: "none",
                  mt: 2,
                  background: "#5C218B",
                  borderRadius: 2,
                }}
              >
                Signup
              </Button>
              <p>
                Already have an account ?{" "}
                <span
                  style={{ color: "#227cf2", cursor: "pointer" }}
                  onClick={() => navigate("/")}
                >
                  Login
                </span>
              </p>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}

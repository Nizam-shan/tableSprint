import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

import Sidebar from "./Pages/sidebar";
import { useEffect, useState } from "react";
import Navbar from "./Pages/navbar";

import Category from "./Pages/Category";
import Subcategory from "./Pages/Subcategory";
import AddCategory from "./components/Category/AddCategory";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { GlobalProvider } from "./components/utlis/GlobalContext";
import AddSubCategory from "./components/Subcategory/AddSubcategory";
import Dashboard from "./Pages/dashboard";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Products from "./Pages/Products";
import AddProducts from "./components/Products/AddProducts";

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token && window.location.pathname !== "/signup") {
      navigate("/"); // Redirect to login if token is missing
    }
  }, [navigate]);
  const drawerWidth = 240;
  const isSignupPage =
    window.location.pathname === "/signup" ||
    window?.location?.pathname === "/";

  return (
    <GlobalProvider>
      <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        <ToastContainer />

        {!isSignupPage && (
          <>
            <Navbar handleDrawerToggle={handleDrawerToggle} />
            <Sidebar
              mobileOpen={mobileOpen}
              handleDrawerToggle={handleDrawerToggle}
            />
          </>
        )}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            mt: 8,

            width: { sm: `calc(100% - ${drawerWidth}px)` },
            overflowY: "auto",
            height: "calc(100vh - 64px)",
          }}
        >
          {/* <Container> */}
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<Login />} />

            <Route path="/cat" element={<Category />} />
            <Route path="/add_cat" element={<AddCategory />} />
            <Route path="/add_subcat" element={<AddSubCategory />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/subcategory" element={<Subcategory />} />
            <Route path="/products" element={<Products />} />
            <Route path="/add_products" element={<AddProducts />} />
          </Routes>
          {/* </Container> */}
        </Box>
      </Box>
    </GlobalProvider>
  );
}

export default App;

import React, { useContext, useState } from "react";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CategoryColumns from "./CategoryColumn";

import SearchComponent from "./SearchInput";
import { LuLayoutDashboard } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../utlis/GlobalContext";
import CustomDialogBox from "../utlis/customDialogBox";
import { deleteCategory } from "../services/categoryservices";
import { toast } from "react-toastify";

const CategoryMain: React.FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = useState("");
  console.log("🚀 ~ selectedRow:", selectedRow);
  const globalContext = useContext(GlobalContext);
  if (!globalContext) {
    return <div>Error: GlobalContext not found</div>;
  }
  const { allCategory, isLoading, fetchCategory } = globalContext;
  const rows = allCategory.map((category: any, index: any) => ({
    ...category,
    id: index + 101, // Use index as unique id
  }));
  const handleOpenDialog = (id: string) => {
    setSelectedRow(id);
    setOpen(true);
  };

  const handleDelete = async () => {
    try {
      await deleteCategory(selectedRow)
        .then((res) => {
          fetchCategory();
          toast.success(res.data?.message);
          setSelectedRow("");
          setOpen(false);
        })
        .catch((error) => {
          console.log("error", error);
          toast.error(error.response.data.message || "Some error occured");
          setSelectedRow("");
          setOpen(false);
        });
    } catch (error) {
      toast.error("Some error occured");
    }
  };

  return (
    <>
      <Box>
        <Box
          sx={{
            display: { sm: "block", md: "flex" },
            justifyContent: "space-between",
            alignItems: "center",
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
              display: { sm: "block", md: "flex" },
              justifyContent: "flex-start",
              alignItems: "center",
              p: 3,
              gap: 5,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 3,
              }}
            >
              <LuLayoutDashboard style={{ fontSize: "40px" }} />
              <Typography
                variant="h5"
                sx={{ fontSize: "20px", fontWeight: "bold" }}
              >
                Category
              </Typography>
            </Box>
            <SearchComponent />
          </Box>
          <Box>
            <Button
              sx={{
                background: "#662671",
                color: "white",
                px: 2,
                py: 1,
                borderRadius: 2.5,
                textTransform: "none",
                fontWeight: 700,
              }}
              onClick={() => navigate("/add_cat")}
            >
              Add category
            </Button>
          </Box>
        </Box>
        <Box sx={{ height: 400, width: "100%", minHeight: "70vh" }}>
          <DataGrid
            rows={rows}
            columns={CategoryColumns({ handleOpenDialog })}
            sx={{
              border: "none", // Remove the border around the DataGrid
              "& .MuiDataGrid-columnHeaders div": {
                backgroundColor: "#FFF8B7", // Column background color
              },
              "& .MuiDataGrid-cell": {
                backgroundColor: "#F2F2F2", // Row background color
              },
              ".MuiDataGrid-row": { m: 1 },
            }}
            disableRowSelectionOnClick
            getRowHeight={() => 60}
            hideFooter
          />
        </Box>
        <CustomDialogBox
          open={open}
          setOpen={setOpen}
          handleDelete={handleDelete}
          title={"Delete"}
        />
      </Box>
    </>
  );
};

export default CategoryMain;

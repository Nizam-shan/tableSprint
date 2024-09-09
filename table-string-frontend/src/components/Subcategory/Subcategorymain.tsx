import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { LuLayoutDashboard } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../utlis/GlobalContext";
import SearchComponent from "../Category/SearchInput";
import SubCategoryColumns from "./Subcategorycolumn";
import CustomDialogBox from "../utlis/customDialogBox";
import { deleteSubCategory } from "../services/categoryservices";
import { toast } from "react-toastify";

const SubCategoryMain: React.FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = useState("");
  const globalContext = useContext(GlobalContext);
  if (!globalContext) {
    return <div>Error: GlobalContext not found</div>;
  }
  const { allSubcategory, isLoading, fetchSubCategory } = globalContext;

  const rows = allSubcategory.map((subcategory: any, index: any) => ({
    ...subcategory,
    id: index + 101, // Use index as unique id
  }));

  const handleOpenDialog = (id: string) => {
    setSelectedRow(id);
    setOpen(true);
  };

  const handleDelete = async () => {
    try {
      await deleteSubCategory(selectedRow)
        .then((res) => {
          fetchSubCategory();
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
                sx={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                }}
              >
                Sub Category
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
              onClick={() => navigate("/add_subcat")}
            >
              Add Sub Category
            </Button>
          </Box>
        </Box>
        <Box sx={{ height: 400, width: "100%", minHeight: "70vh" }}>
          <DataGrid
            rows={rows}
            columns={SubCategoryColumns({ handleOpenDialog })}
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

export default SubCategoryMain;

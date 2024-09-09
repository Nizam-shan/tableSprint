import React from "react";
import { Box, Typography } from "@mui/material";

const DashboardMain: React.FC = () => {
  return (
    <>
      <Box>
        <Box
          sx={{
            height: 400,
            width: "100%",
            minHeight: "80vh",
            borderRadius: 2,
            boxShadow: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src="/images/dashboard.png" alt="Dashboard" />
          <Typography variant="h5">Welcome to TableSprint admin</Typography>
        </Box>
      </Box>
    </>
  );
};

export default DashboardMain;

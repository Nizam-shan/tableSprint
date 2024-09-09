import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { TfiMenuAlt } from "react-icons/tfi";
import { LogoSvg } from "../icons/logo";
import { RxAvatar } from "react-icons/rx";
import CustomDialogBox from "../components/utlis/customDialogBox";
import { useNavigate } from "react-router-dom";
interface NavbarProps {
  handleDrawerToggle: () => void;
}
const Navbar: React.FC<NavbarProps> = ({ handleDrawerToggle }) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleDelete = () => {
    localStorage.clear();
    navigate("/");
    setOpen(false);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: "#662671",
          //   width: { sm: `calc(100% - 240px)` },
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { lg: "none" } }}
            >
              <TfiMenuAlt />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontWeight: 600,
                fontSize: "25px",
                display: "flex",

                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LogoSvg sx={{ width: 40, height: 40 }} />
              <span style={{ marginLeft: "15px" }}>TableSprint</span>
            </Typography>
          </Box>
          <Box>
            <Avatar
              sx={{ background: "#662671", cursor: "pointer" }}
              onClick={handleOpenDialog}
            >
              <RxAvatar style={{ width: "65px", height: "30px" }} />
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>
      <CustomDialogBox
        open={open}
        setOpen={setOpen}
        handleDelete={handleDelete}
        title={"Log out"}
      />
    </>
  );
};

export default Navbar;

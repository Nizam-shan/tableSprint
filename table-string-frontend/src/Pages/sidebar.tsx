import React from "react";
import { Drawer, List, ListItem, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { CiPlay1 } from "react-icons/ci";
import { LuLayoutDashboard } from "react-icons/lu";
import { CiBoxList } from "react-icons/ci";
import { FaPlay } from "react-icons/fa";
import { IoCubeOutline } from "react-icons/io5";

interface SidebarProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

const drawerWidth = 240;

const Sidebar: React.FC<SidebarProps> = ({
  mobileOpen,
  handleDrawerToggle,
}) => {
  const location = useLocation();
  const active = (path: string) => location.pathname === path;
  const drawer = (
    <div>
      <List sx={{ mt: 10 }}>
        <ListItem
          component={Link}
          to="/dashboard"
          onClick={handleDrawerToggle}
          sx={{
            width: "100%",
            justifyContent: "center",
            background: active("/dashboard") ? "#F4EDAF" : "",
            py: 2,
          }}
        >
          {/* <ListItemText primary="Home" /> */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "black",
              width: "100%",
            }}
          >
            <GoHome style={{ fontSize: "25px" }} />
            <span
              style={{
                color: "black",
                fontWeight: 400,
                fontSize: "20px",
              }}
            >
              Dashboard
            </span>
            {active("/dashboard") ? (
              <FaPlay
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  fontSize: "20px",
                }}
              />
            ) : (
              <CiPlay1
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  fontSize: "25px",
                }}
              />
            )}
          </Box>
        </ListItem>
        <ListItem
          component={Link}
          to="/cat"
          onClick={handleDrawerToggle}
          sx={{
            width: "100%",
            justifyContent: "center",
            py: 2,
            background: active("/cat") ? "#F4EDAF" : "",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "black",
              width: "100%",
            }}
          >
            <LuLayoutDashboard style={{ fontSize: "25px" }} />
            <span
              style={{
                color: "black",
                fontWeight: 400,
                fontSize: "20px",
              }}
            >
              Category
            </span>
            {active("/cat") ? (
              <FaPlay
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  fontSize: "20px",
                }}
              />
            ) : (
              <CiPlay1
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  fontSize: "25px",
                }}
              />
            )}
          </Box>
        </ListItem>
        <ListItem
          component={Link}
          to="/subcategory"
          onClick={handleDrawerToggle}
          sx={{
            width: "100%",
            justifyContent: "center",
            py: 2,
            background: active("/subcategory") ? "#F4EDAF" : "",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "black",
              width: "100%",
            }}
          >
            <CiBoxList style={{ fontSize: "25px" }} />
            <span
              style={{
                color: "black",
                fontWeight: 400,
                fontSize: "20px",
              }}
            >
              SubCategory
            </span>
            {active("/subcategory") ? (
              <FaPlay
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  fontSize: "20px",
                }}
              />
            ) : (
              <CiPlay1
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  fontSize: "25px",
                }}
              />
            )}
          </Box>
        </ListItem>

        <ListItem
          component={Link}
          to="/products"
          onClick={handleDrawerToggle}
          sx={{
            width: "100%",
            justifyContent: "center",
            py: 2,
            background: active("/products") ? "#F4EDAF" : "",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "black",
              width: "100%",
            }}
          >
            <IoCubeOutline style={{ fontSize: "25px" }} />
            <span
              style={{
                color: "black",
                fontWeight: 400,
                fontSize: "20px",
              }}
            >
              Products
            </span>
            {active("/products") ? (
              <FaPlay
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  fontSize: "20px",
                }}
              />
            ) : (
              <CiPlay1
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  fontSize: "25px",
                }}
              />
            )}
          </Box>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
        backgroundColor: "red",
      }}
    >
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            background: "#F4F4F4",
          },
        }}
      >
        {drawer}
      </Drawer>
      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          background: "red",
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            background: "#F4F4F4",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;

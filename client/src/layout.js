import React from "react";
import NavBar from "./components/NavBar";
import { Box } from "@mui/material";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <NavBar />
      <Box sx={{ padding: 0 }}>
        <Outlet />
      </Box>
      <Footer />
    </div>
  );
};

export default Layout;

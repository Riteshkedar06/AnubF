import React from "react";
import { Box } from "@mui/material";
import HomeProductCarousel from "./HomeProductCarousel.js";

const HomeProduct = () => {
  return (
    <Box sx={{ bgcolor: "#FFF", height: "85vh", width: "100vw" }}>
      <Box sx={{ p: "2rem" }}>
        <HomeProductCarousel />
      </Box>
    </Box>
  );
};

export default HomeProduct;

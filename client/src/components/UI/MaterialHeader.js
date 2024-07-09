import { Box, Typography } from "@mui/material";
import React from "react";

const Material = {
  name: "Materials",
  headerImage: "./company.jpg",

  description:
    "Welcome to Anub Furniture! We are dedicated to providing you with the best furniture, made from the finest materials. Our mission is to bring comfort, style, and sustainability to your home.",
  title: "Material",
};

const MaterialHeader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Box
        sx={{
          height: "400px",
          marginTop: "10px",
          width: "95%",
          padding: "15px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            height: { xs: "40vh", sm: "50vh", md: "60vh", lg: "80vh" },
            width: "100%",
            position: "relative",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Box
            sx={{
              height: "100%",
              width: { xs: "100%", md: "50%" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              padding: { xs: 2, md: 4 },
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: "bold",
                color: "#203B2B",
                fontSize: {
                  xs: "1.5rem",
                  sm: "2rem",
                  md: "2.5rem",
                  lg: "3rem",
                },
              }}
            >
              {Material.title}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mt: 2,
                mb: 4,
                textAlign: "center",
                maxWidth: "600px",
                color: "#203B2B",
                fontSize: { xs: "0.875rem", sm: "1rem", md: "1.125rem" },
              }}
            >
              {Material.description}
            </Typography>
          </Box>
          <Box
            sx={{
              position: "relative",
              height: "100%",
              width: { xs: "90%", md: "40%" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src={Material.headerImage}
              sx={{
                position: "absolute",
                height: { xs: "70%", sm: "100%", md: "100%", lg: "100%" },
                width: "auto",
                objectFit: "contain",
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MaterialHeader;

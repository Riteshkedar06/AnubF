import React from "react";
import { Box, Button, Typography } from "@mui/material";

const HomeProductCard = ({ product }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Box
        sx={{
          bgcolor: "#FFF",
          width: "100%",
          height: "60vh",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          boxShadow:
            "31px -5px 28px -3px rgba(0,0,0,0.1),0px 10px 15px -3px rgba(0,0,0,0.1),14px 10px 15px -3px rgba(0,0,0,0.1)",
          alignItems: "center",
          justifyContent: "space-evenly",
          borderRadius: "2rem",
          border: "1px solid #415217",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: 2,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              color: "#415217",
              fontSize: { xs: "1.2rem", sm: "1.2rem", md: "2rem", lg: "2rem" },
            }}
          >
            {product.name}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mt: 2,
              mb: 4,
              textAlign: "center",
              maxWidth: "600px",
              color: "#415217",
              px: { xs: "5px", sm: "5px" },
              fontSize: { xs: ".8rem", sm: ".8rem", md: "1.125rem" },
            }}
          >
            {product.description}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#000",
                color: "#fff",
                fontWeight: "bold",
                fontSize: { xs: "0.75rem", sm: "1rem" },
                padding: { xs: "0.25rem 1rem", sm: "0.5rem 1.5rem" },
                ":hover": { bgcolor: "#111" },
              }}
            >
              Explore
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 2,
            overflow: "hidden",
          }}
        >
          <Box
            component="img"
            src={product.images[0]}
            alt={product.name}
            sx={{
              maxHeight: { xs: "40vh", md: "50vh" },
              maxWidth: { md: "100%", xs: "80%" },
              objectFit: "contain",
              borderRadius: 2,
              boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default HomeProductCard;

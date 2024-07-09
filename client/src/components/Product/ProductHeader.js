import { Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

const ProductHeader = ({ headerImage, secondImage, description, title }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const handleScroll = () => {
      if (isSmallScreen) {
        // Toggle isHovered after scrolling 500px (adjust as needed)
        if (window.scrollY > 5) {
          setIsHovered(true);
        } else {
          setIsHovered(false);
        }
      }
    };

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove the scroll listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isSmallScreen]);

  const handleHover = (value) => {
    if (!isSmallScreen) {
      setIsHovered(value);
    }
  };

  return (
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
          padding: { xs: 0, md: 4 },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            color: "#203B2B",
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3rem" },
          }}
        >
          {title}
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
          {description}
        </Typography>
      </Box>
      <Box
        sx={{
          position: "relative",
          height: "100%",
          width: { xs: "100%", md: "40%" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "&:hover": {
            cursor: "pointer",
          },
        }}
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
      >
        <Box
          component="img"
          src={isHovered ? secondImage : headerImage}
          alt={title}
          sx={{
            position: "absolute",
            height: { xs: "100%", sm: "100%", md: "100%", lg: "100%" },
            width: "auto",
            objectFit: "contain",
            transition: "opacity 0.3s ease",
          }}
        />
      </Box>
    </Box>
  );
};

export default ProductHeader;

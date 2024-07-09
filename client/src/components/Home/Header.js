import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";

const Header = () => {
  return (
    <Box
      sx={{
        height: "90vh",
        width: "100%",
        backgroundImage: `url(./bg.jpg)`,
        backgroundSize: { xs: "conttain", sm: "contain", md: "cover" },
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <Container>
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "2rem", sm: "2rem", md: "3rem" },
              mb: 2,
            }}
          >
            Discover Amazing Furniture
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: ".8rem", sm: "1rem", md: "1.2rem" },
              mb: 4,
            }}
          >
            Explore our wide range of stylish and comfortable furniture to make
            your home a beautiful place.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{
              bgcolor: "#83B735",
              fontSize: { xs: "0.8rem", sm: ".8rem", md: "1rem" },
              px: { xs: 2, sm: 2, md: 3 },
              py: { xs: 1, sm: 1.3, md: 1.3 },
              ":hover": { bgcolor: "#b5d761" },
            }}
          >
            Explore
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Header;

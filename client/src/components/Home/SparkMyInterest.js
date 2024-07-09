import React from "react";
import { Box, Button, Typography } from "@mui/material";

const SparkMyInterest = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "70vh",
        backgroundColor: "#DAD3BE",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        overflow: "hidden",
        my: { xs: 5, md: 10, lg: 10, sm: 5 },
        mx: 5,
        color: "#fff",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <Typography
        variant="h4"
        component="h4"
        sx={{
          fontSize: { xs: "1.2rem", sm: "1.2rem", md: "2rem", lg: "2rem" },
          mb: 2,
        }}
      >
        Get workplace insights and design inspiration in our office research
        knowledge blog
      </Typography>
      <Button
        variant="contained"
        sx={{
          mt: 3,
          mb: 2,
          bgcolor: "#151717",
          color: "white",
          height: { xs: 30, md: 50 },
          width: { xs: 100, md: 150 },
          borderRadius: 1,
          fontWeight: 500,
          fontSize: { xs: 10, md: 15, lg: 15, sm: 10 },
          "&:hover": { bgcolor: "#252727" },
        }}
      >
        Interested
      </Button>
    </Box>
  );
};

export default SparkMyInterest;

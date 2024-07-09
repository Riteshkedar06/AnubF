// src/components/DashboardLayout.js
import React from "react";
import { Box, Container, CssBaseline, Grid } from "@mui/material";

import DashBoardHeader from "./DashBoardHeader";

const DashboardLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
      <DashBoardHeader />
      <Box sx={{ flexGrow: 1 }}>
        <Container sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
          <Grid container spacing={3} width="100%">
            <Grid item xs={12}>
              {children} {/* Ensure children take full width */}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default DashboardLayout;

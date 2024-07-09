// src/components/Dashboard.js
import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import DashboardLayout from "./DashboardLayout";
import ProductPreview from "./ProductPreview";
import BlogsPreview from "./BlogsPreview";
import InquiriesPreview from "./InquiriesPreview";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <Box sx={{ mb: 4 }}>
        <ProductPreview />{" "}
        {/* Ensure ProductsPreview is wrapped in Box for margin */}
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom align="center">
            Blogs
          </Typography>
          <BlogsPreview />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom align="center">
            Inquiries
          </Typography>
          <InquiriesPreview />
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default Dashboard;

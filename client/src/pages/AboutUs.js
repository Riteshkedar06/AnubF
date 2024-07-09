import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Button,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import AboutUsHeader from "../components/UI/AboutUsHeader";

const AboutUs = () => {
  const materials = [
    { title: "Wood", description: "High-quality, sustainably sourced wood." },
    { title: "Fabrics", description: "Durable and comfortable fabrics." },
    { title: "Metal", description: "Sturdy and stylish metal components." },
  ];

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <AboutUsHeader />

        <Typography variant="h4" sx={{ mt: 4, mb: 2, fontWeight: "bold" }}>
          Sustainability
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          We are committed to sustainability and environmental responsibility.
          Our practices include using eco-friendly materials and processes to
          reduce our carbon footprint.
        </Typography>

        <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
          More About Us
        </Typography>
        <Typography variant="body1">
          Our team is passionate about creating furniture that enhances your
          living space. We believe in quality, innovation, and customer
          satisfaction. Thank you for choosing Anub Furniture!
        </Typography>
      </Box>
    </Container>
  );
};

export default AboutUs;

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

const companies = [
  {
    name: "Company A",
    imageUrl: "https://via.placeholder.com/150",
    description: "Description for Company A",
    headerImage: "https://via.placeholder.com/800x400",
    materialPdf: "/demo.pdf",
    shadeCardPdf: "/demo.pdf",
  },
  // Add other companies here
];

const MaterialCompany = () => {
  const { companyName } = useParams();
  const company = companies.find((c) => c.name === companyName);
  const [showMaterials, setShowMaterials] = useState(false);
  const [showShadeCard, setShowShadeCard] = useState(false);

  if (!company) {
    return <div>Company not found</div>;
  }

  const handleShowMaterials = () => {
    setShowMaterials(true);
    setShowShadeCard(false);
  };

  const handleShowShadeCard = () => {
    setShowMaterials(false);
    setShowShadeCard(true);
  };

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
              {company.name}
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
              {company.description}
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexDirection: "column" }}>
              <Button
                onClick={handleShowMaterials}
                variant="contained"
                sx={{ mt: 2, mb: 1 }}
              >
                Show Material Used by This Company
              </Button>
              <Button
                onClick={handleShowShadeCard}
                variant="contained"
                sx={{ mt: 2, mb: 1 }}
              >
                Show Shade Card
              </Button>
            </Box>
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
              src={company.headerImage}
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
      {showMaterials && (
        <Box sx={{ mt: 4, p: 2, width: "100%", maxWidth: "800px" }}>
          <Typography variant="h4" gutterBottom>
            Materials Used by {company.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Here is the list of materials used by {company.name}.
          </Typography>
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <Viewer
              fileUrl={company.materialPdf}
              // defaultScale={SpecialZoomLevel.PageFit}
            />
          </Worker>
        </Box>
      )}
      {showShadeCard && (
        <Box sx={{ mt: 4, p: 2, width: "100%", maxWidth: "800px" }}>
          <Typography variant="h4" gutterBottom>
            Shade Card for {company.name}
          </Typography>
          <Typography variant="body1">
            Here is the shade card for {company.name}.
          </Typography>
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <Viewer
              fileUrl={company.shadeCardPdf}
              // defaultScale={SpecialZoomLevel.PageFit}
            />
          </Worker>
        </Box>
      )}
    </Box>
  );
};

export default MaterialCompany;

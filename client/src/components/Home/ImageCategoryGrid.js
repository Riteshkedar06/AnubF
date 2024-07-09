import React from "react";
import { Box, Grid, Typography, Card } from "@mui/material";
import { styled } from "@mui/system";

const categories = [
  {
    title: "Panel Based System",
    imageUrl: "panel.jpg",
    description: "Description for Panel Based System",
  },
  {
    title: "Desk Based System",
    imageUrl: "desk.jpg",
    description: "Description for Desk",
  },
  {
    title: "Cabin Based System",
    imageUrl: "cabin.jpg",
    description: "Description for Cabin",
  },
  {
    title: "Table Based System",
    imageUrl: "table.jpg",
    description: "Description for Table",
  },
  {
    title: "Storage Based System",
    imageUrl: "storage.jpg",
    description: "Description for Storage",
  },
];

const ImageCard = styled(Card)(({ theme }) => ({
  borderRadius: 10,
  overflow: "hidden",
  position: "relative",
  width: "100%",
  height: "100%",
  "&::before": {
    content: '""',
    zIndex: -1,
    position: "absolute",
    inset: 0,
    background: "linear-gradient(-45deg, #fc00ff 0%, #00dbde 100%)",
    transform: "translate3d(0, 0, 0) scale(0.95)",
    filter: "blur(20px)",
  },
  "& .img-content": {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(-45deg, #fc00ff 0%, #00dbde 100%)",
    transition: "transform 0.6s, filter 1s",
  },
  "& .img-content img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
  },
  "&:hover .img-content img": {
    transform: "scale(1.5) rotate(10deg)",
    filter: "blur(5px)",
  },
  "& .content": {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "10px",
    color: "#e8e8e8",
    padding: "24px 24px",
    lineHeight: 1.5,
    borderRadius: "5px",
    opacity: 0,
    pointerEvents: "none",
    transform: "translateY(50px)",
    transition:
      "opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1), transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
  },

  "&:hover .content": {
    opacity: 1,
    transform: "translateY(0)",
  },
}));

const ImageCategoryGrid = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: 7, alignItems: "center", my: 5 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <ImageCard
            sx={{ height: { xs: 300, sm: 400, md: 420, lg: 450, xl: 500 } }}
          >
            <Box className="img-content">
              <img src={categories[0].imageUrl} alt={categories[0].title} />
            </Box>
            <Box className="content">
              <Typography
                className="heading"
                sx={{
                  fontSize: {
                    xs: "18px",
                    sm: "20px",
                    md: "22px",
                    lg: "24px",
                    xl: "26px",
                  },
                  fontWeight: 700,
                }}
              >
                {categories[0].title}
              </Typography>
              <Typography variant="body2">
                {categories[0].description}
              </Typography>
            </Box>
          </ImageCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            {categories.slice(1).map((category, index) => (
              <Grid item xs={6} key={index}>
                <ImageCard
                  sx={{
                    height: { xs: 150, sm: 200, md: 200, lg: 220, xl: 240 },
                  }}
                >
                  <Box className="img-content">
                    <img src={category.imageUrl} alt={category.title} />
                  </Box>
                  <Box className="content">
                    <Typography
                      className="heading"
                      sx={{
                        fontSize: {
                          xs: "14px",
                          sm: "20px",
                          md: "22px",
                          lg: "24px",
                          xl: "26px",
                        },
                        fontWeight: 700,
                        textAlign: "left",
                      }}
                    >
                      {category.title}
                    </Typography>
                  </Box>
                </ImageCard>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ImageCategoryGrid;

import React from "react";
import { Link } from "react-router-dom";
import { Box, Grid, Typography, Card } from "@mui/material";
import { styled } from "@mui/system";

const companies = [
  {
    name: "Company A",
    imageUrl: "https://via.placeholder.com/150",
    description: "Description for Company A",
  },
  {
    name: "Company B",
    imageUrl: "https://via.placeholder.com/150",
    description: "Description for Company B",
  },
  {
    name: "Company C",
    imageUrl: "https://via.placeholder.com/150",
    description: "Description for Company C",
  },
  {
    name: "Company E",
    imageUrl: "https://via.placeholder.com/150",
    description: "Description for Company A",
  },
  {
    name: "Company F",
    imageUrl: "https://via.placeholder.com/150",
    description: "Description for Company B",
  },
  {
    name: "Company G",
    imageUrl: "https://via.placeholder.com/150",
    description: "Description for Company C",
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
    transform: "translate3d(0, 0, 0) scale(0.5)",
    filter: "blur(5px)",
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
    transform: "scale(1) rotate(1deg)",
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

const CompanyGrid = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: 7, alignItems: "center", my: 5 }}>
      <Grid container spacing={3}>
        {companies.map((company, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <ImageCard
              component={Link}
              to={`/material/${company.name}`}
              sx={{
                height: { xs: 280, sm: 350, md: 380, lg: 400, xl: 450 },
                textDecoration: "none",
              }}
            >
              <Box className="img-content">
                <img src={company.imageUrl} alt={company.name} />
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
                  {company.name}
                </Typography>
                <Typography variant="body2">{company.description}</Typography>
              </Box>
            </ImageCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CompanyGrid;

import React from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import { useTheme, styled } from "@mui/system";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    name: "Nat Reynolds",
    imageUrl: "/path/to/nat-image.jpg",
    feedback:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
  },
  {
    name: "Celia Almeda",
    imageUrl: "/path/to/celia-image.jpg",
    feedback:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
  },
  {
    name: "Bob Roberts",
    imageUrl: "/path/to/bob-image.jpg",
    feedback:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
  },
];

const TestimonialBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: "center",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: theme.spacing(2),
  backgroundColor: "#f8f8f8",
  height: "100%",
  clipPath:
    "polygon(30px 0%, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0% 30px)",
  borderTopRightRadius: "20px",
  borderBottomLeftRadius: "20px",
}));

const TestimonialsSection = () => {
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const renderTestimonial = (testimonial) => (
    <TestimonialBox
      key={testimonial.name}
      className="card"
      sx={{ p: 5, mb: 1 }}
    >
      <Typography
        variant="body1"
        component="div"
        marginBottom={2}
        className="info"
      >
        {testimonial.feedback}
      </Typography>
      <Avatar
        src={testimonial.imageUrl}
        alt={testimonial.name}
        sx={{ width: 56, height: 56, margin: "0 auto 10px auto" }}
        className="img"
      />
      <Typography
        variant="h6"
        component="div"
        fontWeight="bold"
        className="span"
      >
        {testimonial.name}
      </Typography>
    </TestimonialBox>
  );

  return (
    <Box
      sx={{
        padding: 5,
        height: "60vh",
        mb: { xs: 20, md: 10, lg: 10, sm: 10 },
      }}
    >
      <Typography
        variant="h4"
        component="div"
        gutterBottom
        textAlign="center"
        sx={{
          fontWeight: "bold",
          mb: 5,
          color: "#415217",
          fontSize: { xs: "1.5rem", sm: "1.5rem", md: "2rem", lg: "2rem" },
        }}
      >
        What Clients Say
      </Typography>

      {isMobileOrTablet ? (
        <Slider {...settings}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.name}>{renderTestimonial(testimonial)}</div>
          ))}
        </Slider>
      ) : (
        <Grid container spacing={3} justifyContent="space-between">
          {testimonials.map((testimonial) => (
            <Grid item xs={12} sm={4} key={testimonial.name}>
              {renderTestimonial(testimonial)}
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default TestimonialsSection;

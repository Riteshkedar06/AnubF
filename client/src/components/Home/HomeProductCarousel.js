import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Box, Divider, Typography } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import axios from "axios";

import HomeProductCard from "./HomeProductCard";

const HomeProductCarousel = () => {
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/products/latest"
        );
        setLatestProducts(response.data);
      } catch (error) {
        console.error("Error fetching latest products:", error);
      }
    };

    fetchLatestProducts();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box>
      <Typography
        variant="h2"
        sx={{
          color: "#8fc53d",
          fontWeight: "bold",
          fontSize: { xs: "2rem", sm: "2rem" },
          mb: 2,
        }}
      >
        New Arrivals
      </Typography>
      <Divider />
      <Slider {...settings}>
        {latestProducts.map((product) => (
          <HomeProductCard key={product._id} product={product} />
        ))}
      </Slider>
    </Box>
  );
};

export default HomeProductCarousel;

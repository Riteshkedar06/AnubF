import React from "react";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

const RelatedProductCard = ({ product }) => {
  return (
    <Link to={`/product/get/${product._id}`} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "15px",
          width: "200px", // Adjust the width here
          height: "300px", // Adjust the height here
          "&:hover": {
            "& .product-overlay": {
              opacity: 1,
            },
            "& .image-overlay": {
              opacity: 0.5,
            },
          },
          transition: "transform 0.3s ease",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        {product.images.length > 0 && (
          <>
            <CardMedia
              component="img"
              height="300"
              image={`http://localhost:5000/${product.images[0]}`}
              alt={product.name}
              sx={{
                objectFit: "cover",
                position: "relative",
                borderRadius: "15px",
              }}
              className="product-image"
            />
            <Box
              className="image-overlay"
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.5)", // Adjust opacity or color here
                opacity: 0,
                transition: "opacity 0.3s ease",
              }}
            />
          </>
        )}
        <CardContent
          className="product-overlay"
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            textAlign: "center",
            color: "white",
            padding: "10px",
            opacity: 0,
            transition: "opacity 0.3s ease",
          }}
        >
          <Typography variant="h6" gutterBottom fontWeight="bold">
            {product.name}
          </Typography>
          <Button
            sx={{
              color: "white",
              "&:hover": {
                backgroundColor: "rgb(131, 183, 53)",
                color: "white", // Adjust brightness or color here
              },
            }}
          >
            View Details
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RelatedProductCard;

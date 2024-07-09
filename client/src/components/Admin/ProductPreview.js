import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Chip,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductsPreview = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/products/get")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <CircularProgress />;

  const handleProductClick = (productId) => {
    navigate(`/admin/product/${productId}`);
  };

  // Placeholder image for products without images (adjust URL as per your setup)
  const placeholderImage = "https://via.placeholder.com/150";

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h6" gutterBottom align="center">
        Products
      </Typography>
      {products.length === 0 ? (
        <Typography variant="body1" align="center">
          No products available.
        </Typography>
      ) : (
        products.map((product) => (
          <Card
            key={product._id}
            sx={{
              mb: 2,
              borderRadius: 1,
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center", // Align items in the center
              p: 2,
            }}
          >
            <Box
              sx={{
                width: 150,
                height: 150,
                display: "flex",
                justifyContent: "center", // Center the image horizontally
                alignItems: "center", // Center the image vertically
                overflow: "hidden",
              }}
            >
              <img
                src={
                  product.images && product.images.length > 0
                    ? `http://localhost:5000/${product.images[0]}`
                    : placeholderImage
                }
                alt={product.name}
                style={{ width: "100%", height: "auto", objectFit: "cover" }}
                onClick={() => handleProductClick(product._id)}
              />
            </Box>
            <CardContent sx={{ flexGrow: 1, p: 2 }}>
              <Typography
                variant="subtitle1"
                sx={{ mb: 1, textAlign: "center" }}
              >
                {product.name}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ mb: 1, textAlign: "center" }}
              >
                {product.description}
              </Typography>
              {product.tags && product.tags.length > 0 && (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  {product.tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      style={{ margin: "2px", backgroundColor: "#f0f0f0" }}
                    />
                  ))}
                </Box>
              )}
            </CardContent>
            <CardActions sx={{ justifyContent: "center" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleProductClick(product._id)}
                sx={{
                  mt: 1,
                  bgcolor: "#151717",
                  color: "white",
                  "&:hover": { bgcolor: "#252727" },
                }}
              >
                View Details
              </Button>
            </CardActions>
          </Card>
        ))
      )}
    </Box>
  );
};

export default ProductsPreview;

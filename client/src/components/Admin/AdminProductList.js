import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const handleNavigateToProductInfo = (id) => {
    navigate(`/admin/product/${id}`);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/products/get")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/products/${id}`)
      .then(() => setProducts(products.filter((product) => product._id !== id)))
      .catch((error) => console.error(error));
  };

  return (
    <Container>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "#203B2B",
          marginBottom: "20px",
          fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3rem" },
        }}
        gutterBottom
      >
        Product List
      </Typography>
      <Grid container spacing={2} marginTop={2}>
        {products.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                position: "relative",
                overflow: "hidden",
                borderRadius: "15px",
                "&:hover .product-info": {
                  transform: "translateY(0)",
                },
              }}
            >
              {product.images && product.images.length > 0 && (
                <>
                  <CardMedia
                    component="img"
                    height="200"
                    image={`http://localhost:5000/${product.images[0]}`}
                    alt={`${product.name}`}
                    sx={{
                      objectFit: "cover",
                    }}
                    onClick={() => handleNavigateToProductInfo(product._id)}
                    className="product-image"
                  />
                  <Box
                    className="product-info"
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      textAlign: "center",
                      color: "white",
                      backgroundColor: "rgba(0, 0, 0, 0.7)",
                      padding: "10px",
                      transform: "translateY(100%)",
                      transition: "transform 0.3s ease",
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold">
                      {product.name}
                    </Typography>
                  </Box>
                </>
              )}
              <CardActions
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px",
                }}
              >
                <Button
                  component={Link}
                  to={`/admin/products/edit/${product._id}`}
                  variant="outlined"
                  sx={{
                    color: "#203B2B",
                    "&:hover": {
                      backgroundColor: "#203B2B",
                      color: "white",
                    },
                  }}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(product._id)}
                  variant="outlined"
                  color="secondary"
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgb(131, 183, 53)",
                      color: "white",
                    },
                  }}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AdminProductList;

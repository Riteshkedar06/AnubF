import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Button,
  MenuItem,
  Select,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProductHeader from "./ProductHeader";

const categories = [
  {
    name: "All Products",
    headerImage: "./All-product.png",
    secondImage: "./H-color-All-product.png",
    description: "Browse all available products.",
    title: "All Products",
  },
  {
    name: "Panel Based System",
    headerImage: "./H-panel.jpg",
    secondImage: "./color-panel.png",
    description: "Discover our panel based systems.",
    title: "Panel Based System",
  },
  {
    name: "Desk Based System",
    headerImage: "./H-desk.jpg",
    secondImage: "./color-desk-based-system-Photoroom.png",
    description: "Explore our desk based systems.",
    title: "Desk Based System",
  },
  {
    name: "Cabin Based System",
    headerImage: "./H-cabin.jpg",
    secondImage: "./color-cabin.png",
    description: "Check out our cabin based systems.",
    title: "Cabin Based System",
  },
  {
    name: "Table Based System",
    headerImage: "./H-table.jpg",
    secondImage: "./color-table.png",
    description: "View our table based systems.",
    title: "Table Based System",
  },
  {
    name: "Storage Based System",
    headerImage: "./H-storage.jpg",
    secondImage: "./color-storage.png",
    description: "Find our storage based systems.",
    title: "Storage Based System",
  },
];

const ShopProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    axios
      .get("http://localhost:5000/products/get")
      .then((response) => {
        const sortedProducts = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setProducts(sortedProducts);
        setFilteredProducts(sortedProducts);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleNavigateToProductInfo = (id) => {
    navigate(`/product/${id}`);
  };

  const handleCategoryChange = (category) => {
    const selectedCategory = categories.find((cat) => cat.name === category);
    setSelectedCategory(selectedCategory);
    if (category === "All Products") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.category === category)
      );
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        width: { xm: "100%" },
      }}
    >
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Box
          sx={{
            marginTop: "20px",
            width: "100%",
            padding: "25px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Divider Line */}
          <Box
            sx={{
              width: "75%",
              height: "1px",
              backgroundColor: "#203B2B",
              margin: "10px 0",
            }}
          />

          {isSmallScreen ? (
            <Select
              value={selectedCategory.name}
              onChange={(e) => handleCategoryChange(e.target.value)}
              sx={{ marginBottom: "10px" }}
            >
              {categories.map((category) => (
                <MenuItem key={category.name} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          ) : (
            <List
              sx={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
                marginBottom: "10px 0",
              }}
            >
              {categories.map((category) => (
                <ListItem
                  button
                  key={category.name}
                  selected={selectedCategory.name === category.name}
                  onClick={() => handleCategoryChange(category.name)}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <ListItemText primary={category.name} />
                </ListItem>
              ))}
            </List>
          )}

          {/* Divider Line */}
          <Box
            sx={{
              width: "75%",
              height: "1px",
              backgroundColor: "#203B2B",
              margin: "10px 0px",
            }}
          />

          <ProductHeader
            headerImage={selectedCategory.headerImage}
            secondImage={selectedCategory.secondImage}
            description={selectedCategory.description}
            title={selectedCategory.title}
          />

          {/* Product List */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },
              gap: 5,
              mt: 2,
              width: "100%",
            }}
          >
            {filteredProducts.map((product) => (
              <Card
                key={product._id}
                sx={{
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: "15px",
                  "&:hover": {
                    "& .product-overlay": {
                      opacity: 1,
                    },
                    "& .image-overlay": {
                      opacity: 0.5,
                    },
                  },
                }}
              >
                {product.images.length > 0 && (
                  <>
                    <CardMedia
                      component="img"
                      height="350"
                      image={`http://localhost:5000/${product.images[0]}`}
                      alt={`${product.name}`}
                      sx={{
                        objectFit: "cover",
                        position: "relative",
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
                    onClick={() => handleNavigateToProductInfo(product._id)}
                    sx={{
                      color: "white",
                      "&:hover": {
                        backgroundColor: "rgb(131, 183, 53)",
                        color: "white",
                      },
                    }}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ShopProducts;

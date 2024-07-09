import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Typography,
  CardMedia,
  Box,
  Button,
  Grid,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
} from "@mui/material";

const AdminProductInfo = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/products/get/${productId}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => console.error("Error fetching product data:", error));
  }, [productId]);

  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  const handleToggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  if (!product) {
    return (
      <Container sx={{ marginTop: "80px", minHeight: "100vh" }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ marginTop: "80px", minHeight: "100vh" }}>
      <Grid container spacing={4}>
        {/* Image Section */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {selectedImage ? (
              <CardMedia
                component="img"
                height="550px"
                width="auto"
                image={`http://localhost:5000/${selectedImage}`}
                alt={`${product.name} - Main Image`}
                sx={{
                  marginTop: { lg: "30px", sm: "-100px", xs: "-50px" },
                  objectFit: "contain",
                  maxWidth: "100%",
                  maxHeight: "80vh",
                  marginBottom: "20px",
                  borderRadius: "2rem",
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/placeholder-image.jpg";
                }}
              />
            ) : (
              <Typography variant="body1">No Image Available</Typography>
            )}
            <Grid container spacing={2}>
              {product.images.map((image, index) => (
                <Grid item xs={3} key={index}>
                  <CardMedia
                    component="img"
                    height="auto"
                    width="auto"
                    image={`http://localhost:5000/${image}`}
                    alt={`${product.name} - Image ${index + 1}`}
                    sx={{
                      objectFit: "contain",
                      maxWidth: "100%",
                      maxHeight: "100px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleImageSelect(image)}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/placeholder-image.jpg";
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>

        {/* Description Section */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "20px",
            }}
          >
            <Typography
              variant="h4"
              component="div"
              gutterBottom
              sx={{
                color: "#515151",
                fontWeight: 500,
                textTransform: "uppercase",
                fontSize: "34px",
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              {product.name}
            </Typography>

            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  {product.material && (
                    <TableRow>
                      <TableCell>
                        <strong>Material:</strong>
                      </TableCell>
                      <TableCell>{product.material}</TableCell>
                    </TableRow>
                  )}
                  {product.shape && (
                    <TableRow>
                      <TableCell>
                        <strong>Shape:</strong>
                      </TableCell>
                      <TableCell>{product.shape}</TableCell>
                    </TableRow>
                  )}
                  {product.seating && (
                    <TableRow>
                      <TableCell>
                        <strong>Seating:</strong>
                      </TableCell>
                      <TableCell>{product.seating}</TableCell>
                    </TableRow>
                  )}
                  {product.category && (
                    <TableRow>
                      <TableCell>
                        <strong>Category:</strong>
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                    </TableRow>
                  )}
                  {product.colorShade.length > 0 && (
                    <TableRow>
                      <TableCell>
                        <strong>Color Shades:</strong>
                      </TableCell>
                      <TableCell>{product.colorShade.join(", ")}</TableCell>
                    </TableRow>
                  )}
                  {product.brands.length > 0 && (
                    <TableRow>
                      <TableCell>
                        <strong>Brands:</strong>
                      </TableCell>
                      <TableCell>{product.brands.join(", ")}</TableCell>
                    </TableRow>
                  )}
                  {product.tags.length > 0 && (
                    <TableRow>
                      <TableCell>
                        <strong>Tags:</strong>
                      </TableCell>
                      <TableCell>{product.tags.join(", ")}</TableCell>
                    </TableRow>
                  )}
                  {product.features && product.features.length > 0 && (
                    <TableRow>
                      <TableCell>
                        <strong>Features:</strong>
                      </TableCell>
                      <TableCell>{product.features.join(", ")}</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <Divider sx={{ my: 2, width: "100%" }} />

            <Typography
              variant="body1"
              mt={2}
              sx={{
                fontSize: "14px",
                lineHeight: "20px",
                color: "#727272",
                textAlign: "center",
                maxHeight: showFullDescription ? "none" : "100px",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {product.description}
            </Typography>
            {product.description.split(". ").length > 2 && (
              <Button
                variant="text"
                onClick={handleToggleDescription}
                sx={{ marginTop: "10px" }}
              >
                {showFullDescription ? "View Less" : "View More"}
              </Button>
            )}

            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate(`/admin/products/edit/${product._id}`)}
              sx={{
                bgcolor: "#151717",
                color: "white",
                height: 50,
                borderRadius: 1,
                fontWeight: 500,
                fontSize: 15,
                "&:hover": { bgcolor: "#252727" },
                marginTop: "20px",
              }}
            >
              Edit
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminProductInfo;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import RelatedProducts from "./RelatedProducts";
import {
  Container,
  Typography,
  CardMedia,
  Box,
  Button,
  Modal,
  TextField,
  Grid,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
} from "@mui/material";

const ProductInfo = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [inquiryData, setInquiryData] = useState({
    email: "",
    name: "",
    city: "",
    contact: "",
    message: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/products/get/${productId}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error(error));
  }, [productId]);

  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInquiryData({ ...inquiryData, [name]: value });
  };

  const handleInquire = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:5000/inquiries/create`,
        {
          ...inquiryData,
          productId,
        }
      );
      console.log("Inquiry submitted successfully:", response.data);
      setOpenModal(false);
      // Optionally, redirect to a thank you page or show a success message
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      // Handle error: show error message
    }
  };

  const handleToggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  if (!product) {
    return <Typography>Loading...</Typography>;
  }

  // Displaying first 2 sentences of description
  const firstTwoSentences =
    product.description
      .split(". ")
      .slice(0, 2)
      .join(". ") + "."; // Ensure it ends with a period

  // Modal style
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "1rem",
    pt: 2,
    px: 4,
    pb: 3,
  };

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
                  {product.material !== 0 && (
                    <TableRow>
                      <TableCell>
                        <strong>Material:</strong>
                      </TableCell>
                      <TableCell>{product.material}</TableCell>
                    </TableRow>
                  )}
                  {product.shape !== 0 && (
                    <TableRow>
                      <TableCell>
                        <strong>Shape:</strong>
                      </TableCell>
                      <TableCell>{product.shape}</TableCell>
                    </TableRow>
                  )}
                  {product.seating !== 0 && (
                    <TableRow>
                      <TableCell>
                        <strong>Seating:</strong>
                      </TableCell>
                      <TableCell>{product.seating}</TableCell>
                    </TableRow>
                  )}
                  {product.category !== 0 && (
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
              {showFullDescription ? product.description : firstTwoSentences}
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
              onClick={handleOpenModal}
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
              Enquire
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Inquiry Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="inquiry-modal-title"
        aria-describedby="inquiry-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={modalStyle}>
          <Typography variant="h5" id="inquiry-modal-title" gutterBottom>
            Inquiry Form
          </Typography>
          <Box
            component="form"
            onSubmit={handleInquire}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              mt: 2,
            }}
          >
            <TextField
              fullWidth
              label="Email"
              name="email"
              variant="outlined"
              value={inquiryData.email}
              onChange={handleInputChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Name"
              name="name"
              variant="outlined"
              value={inquiryData.name}
              onChange={handleInputChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="City"
              name="city"
              variant="outlined"
              value={inquiryData.city}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Contact"
              name="contact"
              variant="outlined"
              value={inquiryData.contact}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              multiline
              minRows={4}
              label="Message"
              name="message"
              variant="outlined"
              value={inquiryData.message}
              onChange={handleInputChange}
              required
              sx={{ mb: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                bgcolor: "#151717",
                color: "white",
                height: 50,
                borderRadius: 1,
                fontWeight: 500,
                fontSize: 15,
                "&:hover": { bgcolor: "#252727" },
              }}
            >
              Submit Inquiry
            </Button>
          </Box>
        </Box>
      </Modal>
      {/* Related Products */}
      <RelatedProducts
        tags={product.tags}
        category={product.category}
        currentProductId={product._id}
      />
    </Container>
  );
};

export default ProductInfo;

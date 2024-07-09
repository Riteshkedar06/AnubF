import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  FormControl,
  FormHelperText,
  Select,
  MenuItem,
  Box,
  Chip,
  Typography,
  Container,
  Snackbar,
  Alert,
} from "@mui/material";
import { Save } from "@mui/icons-material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AdminProductEditForm = () => {
  const [product, setProduct] = useState(null);
  const { productId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/products/get/${productId}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [images, setImages] = useState([]);
  const [material, setMaterial] = useState("");
  const [shape, setShape] = useState("");
  const [colorShade, setColorShade] = useState([]);
  const [colorShadeInput, setColorShadeInput] = useState("");
  const [brands, setBrands] = useState([]);
  const [brandInput, setBrandInput] = useState("");
  const [features, setFeatures] = useState([]);
  const [featureInput, setFeatureInput] = useState("");
  const [seating, setSeating] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setCategory(product.category);
      setTags(product.tags);
      setMaterial(product.material);
      setShape(product.shape);
      setColorShade(product.colorShade);
      setBrands(product.brands);
      setFeatures(product.features);
      setSeating(product.seating);
      setImages(product.images);
    }
  }, [product]);

  const handleTagChange = (event) => setTagInput(event.target.value);
  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };
  const handleDeleteTag = (tagToDelete) =>
    setTags(tags.filter((tag) => tag !== tagToDelete));

  const handleColorShadeChange = (event) =>
    setColorShadeInput(event.target.value);
  const handleAddColorShade = () => {
    if (colorShadeInput && !colorShade.includes(colorShadeInput)) {
      setColorShade([...colorShade, colorShadeInput]);
      setColorShadeInput("");
    }
  };
  const handleDeleteColorShade = (shadeToDelete) =>
    setColorShade(colorShade.filter((shade) => shade !== shadeToDelete));

  const handleBrandChange = (event) => setBrandInput(event.target.value);
  const handleAddBrand = () => {
    if (brandInput && !brands.includes(brandInput)) {
      setBrands([...brands, brandInput]);
      setBrandInput("");
    }
  };
  const handleDeleteBrand = (brandToDelete) =>
    setBrands(brands.filter((brand) => brand !== brandToDelete));

  const handleFeatureChange = (event) => setFeatureInput(event.target.value);
  const handleAddFeature = () => {
    if (featureInput && !features.includes(featureInput)) {
      setFeatures([...features, featureInput]);
      setFeatureInput("");
    }
  };
  const handleDeleteFeature = (featureToDelete) =>
    setFeatures(features.filter((feature) => feature !== featureToDelete));

  const handleImageChange = (imageFiles) => setImages(Array.from(imageFiles)); // Convert FileList to array

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("tags", JSON.stringify(tags));
    formData.append("material", material);
    formData.append("shape", shape);
    formData.append("colorShade", JSON.stringify(colorShade));
    formData.append("brands", JSON.stringify(brands));
    formData.append("features", JSON.stringify(features));
    formData.append("seating", seating);

    // Append images separately
    images.forEach((image) => formData.append("images", image));

    try {
      const response = await axios.put(
        `http://localhost:5000/products/${productId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-auth-token": token,
          },
        }
      );
      setSnackbarMessage("Product updated successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      navigate("/admin/products");
    } catch (error) {
      setSnackbarMessage("Error updating product!");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      console.error("Error updating product:", error);
    }
  };

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  if (!product) {
    return <Typography variant="body1">Loading...</Typography>;
  }

  return (
    <Container
      maxWidth="md"
      sx={{
        p: "1rem",
        bgcolor: "#fff",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
        borderRadius: "1rem",
        boxShadow:
          "31px -5px 28px -3px rgba(0,0,0,0.1),0px 10px 15px -3px rgba(0,0,0,0.1),14px 10px 15px -3px rgba(0,0,0,0.1)",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "#203B2B",
          marginBottom: "20px",
          fontSize: { xs: "1rem", sm: "1rem", md: "1.5rem", lg: "2rem" },
        }}
        gutterBottom
      >
        Edit Product
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          required
          multiline
          rows={4}
          margin="normal"
        />
        <FormControl fullWidth required margin="normal">
          <Typography variant="h6" gutterBottom>
            Category
          </Typography>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            displayEmpty
          >
            <MenuItem value="" disabled>
              Select Category
            </MenuItem>
            <MenuItem value="Panel Based System">Panel Based System</MenuItem>
            <MenuItem value="Desk Based System">Desk Based System</MenuItem>
            <MenuItem value="Cabin Based System">Cabin Based System</MenuItem>
            <MenuItem value="Table Based System">Table Based System</MenuItem>
            <MenuItem value="Storage Based System">
              Storage Based System
            </MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth required margin="normal">
          <Typography variant="h6" gutterBottom>
            Material
          </Typography>
          <TextField
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            fullWidth
            required
          />
        </FormControl>

        <FormControl fullWidth required margin="normal">
          <Typography variant="h6" gutterBottom>
            Shape
          </Typography>
          <TextField
            value={shape}
            onChange={(e) => setShape(e.target.value)}
            fullWidth
            required
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <Typography variant="h6" gutterBottom>
            Color Shades
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <TextField
              value={colorShadeInput}
              onChange={handleColorShadeChange}
              label="Add a color shade"
              variant="outlined"
              margin="normal"
              sx={{ marginRight: 1, width: "100%" }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddColorShade}
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
              Add
            </Button>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", marginTop: 1 }}>
            {colorShade.map((shade, index) => (
              <Chip
                key={index}
                label={shade}
                onDelete={() => handleDeleteColorShade(shade)}
                sx={{
                  margin: 0.5,
                  fontWeight: "bold",
                  fontSize: "15px",
                  bgcolor: "#f5f5f5",
                  "& .MuiChip-deleteIcon": { color: "red" },
                }}
              />
            ))}
          </Box>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <Typography variant="h6" gutterBottom>
            Brands
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <TextField
              value={brandInput}
              onChange={handleBrandChange}
              label="Add a brand"
              variant="outlined"
              margin="normal"
              sx={{ marginRight: 1, width: "100%" }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddBrand}
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
              Add
            </Button>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", marginTop: 1 }}>
            {brands.map((brand, index) => (
              <Chip
                key={index}
                label={brand}
                onDelete={() => handleDeleteBrand(brand)}
                sx={{
                  margin: 0.5,
                  fontWeight: "bold",
                  fontSize: "15px",
                  bgcolor: "#f5f5f5",
                  "& .MuiChip-deleteIcon": { color: "red" },
                }}
              />
            ))}
          </Box>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <Typography variant="h6" gutterBottom>
            Features
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <TextField
              value={featureInput}
              onChange={handleFeatureChange}
              label="Add a feature"
              variant="outlined"
              margin="normal"
              sx={{ marginRight: 1, width: "100%" }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddFeature}
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
              Add
            </Button>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", marginTop: 1 }}>
            {features.map((feature, index) => (
              <Chip
                key={index}
                label={feature}
                onDelete={() => handleDeleteFeature(feature)}
                sx={{
                  margin: 0.5,
                  fontWeight: "bold",
                  fontSize: "15px",
                  bgcolor: "#f5f5f5",
                  "& .MuiChip-deleteIcon": { color: "red" },
                }}
              />
            ))}
          </Box>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <Typography variant="h6" gutterBottom>
            Tags
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <TextField
              value={tagInput}
              onChange={handleTagChange}
              label="Add a feature"
              variant="outlined"
              margin="normal"
              sx={{ marginRight: 1, width: "100%" }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddTag}
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
              Add
            </Button>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", marginTop: 1 }}>
            {tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                onDelete={() => handleDeleteTag(tag)}
                sx={{
                  margin: 0.5,
                  fontWeight: "bold",
                  fontSize: "15px",
                  bgcolor: "#f5f5f5",
                  "& .MuiChip-deleteIcon": { color: "red" },
                }}
              />
            ))}
          </Box>
        </FormControl>

        <TextField
          label="Seating"
          value={seating}
          onChange={(e) => setSeating(e.target.value)}
          fullWidth
          required
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <Typography variant="h6" gutterBottom>
            Images
          </Typography>
          <input
            type="file"
            onChange={(e) => handleImageChange(e.target.files)}
            multiple
          />
          <Box sx={{ display: "flex", flexWrap: "wrap", marginTop: 1 }}>
            {images.length > 0 ? (
              images.map((image, index) => (
                <Box key={index} sx={{ margin: 1 }}>
                  <img
                    src={
                      typeof image === "string"
                        ? image
                        : URL.createObjectURL(image)
                    }
                    alt={`product-${index}`}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              ))
            ) : (
              <Typography variant="body2" sx={{ marginLeft: 1 }}>
                No images selected
              </Typography>
            )}
          </Box>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<Save />}
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
          Save
        </Button>
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AdminProductEditForm;

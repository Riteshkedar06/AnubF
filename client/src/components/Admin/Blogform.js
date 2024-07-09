import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  FormControl,
  FormHelperText,
  Box,
} from "@mui/material";
import { Save } from "@mui/icons-material";
import axios from "axios";

const AdminBlogForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [images, setImages] = useState([]);
  const token = localStorage.getItem("token");

  const handleImageChange = (imageFiles) => setImages(Array.from(imageFiles));

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("author", author);

    // Append images separately
    images.forEach((image) => formData.append("images", image));

    try {
      const response = await axios.post(
        "http://localhost:5000/blog",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-auth-token": token,
          },
        }
      );
      console.log("Blog post created:", response.data);
    } catch (error) {
      console.error("Error creating blog post:", error);
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        p: "1rem",
        bgcolor: "#fff",
        fontFamily: "'Segoe UI', Roboto, sans-serif",
        borderRadius: "1rem",
        boxShadow:
          "31px -5px 28px -3px rgba(0,0,0,0.1),0px 10px 15px -3px rgba(0,0,0,0.1),14px 10px 15px -3px rgba(0,0,0,0.1)",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#203B2B",
          marginBottom: "20px",
          fontSize: { xs: "1rem", sm: "1rem", md: "1.5rem", lg: "2rem" },
        }}
      >
        Create a New Blog Post
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          fullWidth
          required
          multiline
          rows={8}
          margin="normal"
        />
        <TextField
          label="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          fullWidth
          required
          margin="normal"
        />

        <FormControl fullWidth required margin="normal">
          <Typography variant="h6" gutterBottom>
            Images
          </Typography>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleImageChange(e.target.files)}
          />
          {images.length === 0 && (
            <FormHelperText>Please upload at least one image.</FormHelperText>
          )}
        </FormControl>

        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<Save />}
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: "#151717",
              color: "white",
              height: 50,
              width: 150,
              borderRadius: 1,
              fontWeight: 500,
              fontSize: 15,
              "&:hover": { bgcolor: "#252727" },
            }}
          >
            Save
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default AdminBlogForm;

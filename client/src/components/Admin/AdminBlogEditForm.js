import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  FormControl,
  FormHelperText,
  Box,
  Chip,
  Snackbar,
} from "@mui/material";
import { LastPage, Save } from "@mui/icons-material";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const AdminBlogEditForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [images, setImages] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { id } = useParams(); // Assuming the blog ID is passed as a URL parameter
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/blog/get/${id}`
        );
        const post = response.data;
        setTitle(post.title);
        setContent(post.content);
        setAuthor(post.author);
        setImages(post.images || []);
      } catch (error) {
        console.error("Error fetching blog post:", error);
      }
    };

    fetchBlogPost();
  }, [id]);

  const handleImageChange = (imageFiles) => setImages(Array.from(imageFiles));

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("author", author);

    if (images.length > 0) {
      images.forEach((image) => formData.append("images", image));
    }

    try {
      await axios.put(`http://localhost:5000/blog/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-auth-token": token,
        },
      });
      setSnackbarMessage("Blog post updated successfully!");
      setSnackbarOpen(true);
      navigate("/admin/blog/get"); // Redirect to the blog list or another appropriate page
    } catch (error) {
      setSnackbarMessage("Error updating blog post.");
      setSnackbarOpen(true);
      console.error("Error updating blog post:", error);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
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
      <Typography variant="h4" gutterBottom>
        Edit Blog Post
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
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}>
            {images.map((image, index) => (
              <Chip
                key={index}
                label={
                  typeof image === "string"
                    ? image.split("/").pop()
                    : image.name
                }
                variant="outlined"
                color="primary"
              />
            ))}
          </Box>
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
            Update
          </Button>
        </Box>
      </form>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Container>
  );
};

export default AdminBlogEditForm;

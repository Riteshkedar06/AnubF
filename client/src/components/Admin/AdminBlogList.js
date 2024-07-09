import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  CardActions,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminBlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/blog/get");
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setSnackbar({
          open: true,
          message: "Error fetching blogs",
          severity: "error",
        });
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/blog/${id}`);
      setBlogs(blogs.filter((blog) => blog._id !== id));
      setSnackbar({
        open: true,
        message: "Blog deleted successfully",
        severity: "success",
      });
    } catch (error) {
      console.error("Error deleting blog:", error);
      setSnackbar({
        open: true,
        message: "Error deleting blog",
        severity: "error",
      });
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/blog/edit/${id}`);
  };

  return (
    <Container maxWidth="md" sx={{ py: "2rem" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#203B2B",
          marginBottom: "20px",
          fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3rem" },
        }}
      >
        All Blogs
      </Typography>
      {blogs.map((blog) => (
        <Card
          key={blog._id}
          sx={{
            mb: 2,
            borderRadius: 1,
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            p: 2,
          }}
        >
          <Box
            sx={{
              width: 150,
              height: 150,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <CardMedia
              component="img"
              height="140"
              image={blog.image || "https://via.placeholder.com/150"}
              alt={blog.title}
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
          </Box>
          <CardContent sx={{ flexGrow: 1, p: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1, textAlign: "center" }}>
              {blog.title}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ mb: 1, textAlign: "center" }}
            >
              {blog.content.substring(0, 30)}
              {blog.content.length > 30 && "..."}
            </Typography>
            {blog.tags && blog.tags.length > 0 && (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                {blog.tags.map((tag, index) => (
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
              onClick={() => handleEdit(blog._id)}
              sx={{
                mt: 1,
                bgcolor: "#151717",
                color: "white",
                "&:hover": { bgcolor: "#252727" },
                mr: 2,
              }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleDelete(blog._id)}
              sx={{
                mt: 1,
                bgcolor: "red",
                color: "white",
                "&:hover": { bgcolor: "#ff4c4c" },
              }}
            >
              Delete
            </Button>
          </CardActions>
        </Card>
      ))}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AdminBlogList;

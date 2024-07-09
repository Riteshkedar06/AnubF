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

const BlogsPreview = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/blog/get")
      .then((response) => {
        setBlogs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <CircularProgress />;

  const handleBlogClick = (blogId) => {
    navigate(`/blogs/${blogId}`);
  };

  return (
    <Box sx={{ width: "100%", maxHeight: "400px", overflowY: "auto" }}>
      {blogs.length === 0 ? (
        <Typography variant="body1" align="center">
          No blogs available.
        </Typography>
      ) : (
        blogs.map((blog) => (
          <Card
            key={blog._id}
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
                src={blog.image || "https://via.placeholder.com/150"}
                alt={blog.title}
                style={{ width: "100%", height: "auto", objectFit: "cover" }}
                onClick={() => handleBlogClick(blog._id)}
              />
            </Box>
            <CardContent sx={{ flexGrow: 1, p: 2 }}>
              <Typography
                variant="subtitle1"
                sx={{ mb: 1, textAlign: "center" }}
              >
                {blog.title}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ mb: 1, textAlign: "center" }}
              >
                {blog.content.substring(0, 30)}{" "}
                {/* Displaying first 30 characters */}
                {blog.content.length > 30 && "..."}{" "}
                {/* Show ellipsis if content exceeds 30 characters */}
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
                onClick={() => handleBlogClick(blog._id)}
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

export default BlogsPreview;

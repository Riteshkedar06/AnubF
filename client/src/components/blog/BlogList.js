import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
} from "@mui/material";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/blog/get")
      .then((response) => {
        const sortedBlogs = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setBlogs(sortedBlogs);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <Box sx={{ padding: 4 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "#203B2B",
          fontSize: {
            xs: "1.5rem",
            sm: "2rem",
            md: "2.5rem",
            lg: "2.5rem",
          },
        }}
        gutterBottom
      >
        Blog List
      </Typography>
      <Grid container spacing={4}>
        {blogs.map((blog, index) => (
          <Grid item xs={12} sm={6} md={4} key={blog._id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                },
              }}
            >
              <CardMedia
                component="img"
                height="250"
                image={`http://localhost:5000/${blog.image}`} // Assuming blog.image is the path to the image
                alt={blog.title}
                sx={{
                  objectFit: "contain",
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <CardHeader
                  title={blog.title}
                  subheader={`By ${blog.author} • ${formatDateTime(
                    blog.createdAt
                  )}`}
                  titleTypographyProps={{
                    variant: "h6",
                    color: "primary",
                  }}
                  subheaderTypographyProps={{
                    variant: "body2",
                    color: "text.secondary",
                  }}
                />
                <Link
                  to={`/blogs/${blog._id}`}
                  style={{
                    textDecoration: "none",
                    marginTop: "auto",
                    color: "#1976d2", // Link color
                    fontWeight: "bold", // Link font weight
                  }}
                >
                  Read More
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const formatDateTime = (timestamp) => {
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${formattedDate} ${formattedTime}`;
};

export default BlogList;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Typography, CircularProgress, CardMedia } from "@mui/material";

const BlogInfo = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/blog/get/${id}`)
      .then((response) => {
        setBlog(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blog:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <CircularProgress />;

  return (
    <Box
      sx={{
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        padding: { sm: 2, md: 0, xs: 2, lg: 0 },
      }}
    >
      <Box sx={{ padding: { xs: 1, sm: 4, md: 6, lg: 8 } }}>
        {blog ? (
          <>
            <Typography
              variant="h2"
              sx={{
                fontWeight: "bold",
                color: "#203B2B",
                fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
              }}
            >
              {blog.title}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              By {blog.author} • {formatDateTime(blog.createdAt)}
            </Typography>

            {blog.image.map((img, index) => (
              <Box key={index} sx={{ my: 8 }}>
                <CardMedia
                  component="img"
                  height="auto"
                  width="100%"
                  image={`http://localhost:5000/${img}`}
                  sx={{
                    objectFit: "contain",
                    maxHeight: 400,
                    borderRadius: 4,
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/placeholder-image.jpg";
                  }}
                />
              </Box>
            ))}
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                color: "#203B2B",
                fontSize: { xs: "1rem", sm: "1.5rem", md: "1.5rem" },
              }}
            >
              Content:
            </Typography>
            <Box
              variant="body1"
              paragraph
              sx={{
                width: "90%", // Set to 100% width
                color: "#757575", // Text color
              }}
            >
              {blog.content}
            </Box>
          </>
        ) : (
          <Typography variant="h6">Blog not found</Typography>
        )}
      </Box>
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

export default BlogInfo;

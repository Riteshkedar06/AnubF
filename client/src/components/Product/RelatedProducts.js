import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Grid } from "@mui/material";
import RelatedProductCard from "./RelatedProductCard";

const RelatedProducts = ({ tags, category, currentProductId }) => {
  const [relatedByTags, setRelatedByTags] = useState([]);
  const [relatedByCategory, setRelatedByCategory] = useState([]);

  useEffect(() => {
    // Fetch related products by tags and category
    axios
      .post(`http://localhost:5000/products/get/related`, {
        tags,
        category,
        currentProductId,
      })
      .then((response) => {
        setRelatedByTags(response.data.relatedByTags);
        setRelatedByCategory(response.data.relatedByCategory);
      })
      .catch((error) => console.error(error));
  }, [tags, category, currentProductId]);
  console.log(relatedByTags);
  return (
    <Box sx={{ marginTop: "40px" }}>
      <Typography
        variant="h4"
        component="div"
        gutterBottom
        sx={{
          color: "#515151",
          fontWeight: 500,
          textTransform: "uppercase",
          fontSize: "24px",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Similar Products
      </Typography>

      <Grid container spacing={2}>
        {relatedByTags.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product._id}>
            <RelatedProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      <Typography
        variant="h4"
        component="div"
        gutterBottom
        sx={{
          color: "#515151",
          fontWeight: 500,
          textTransform: "uppercase",
          fontSize: "24px",
          textAlign: "center",
          marginTop: "40px",
          marginBottom: "20px",
        }}
      >
        Similar Products by Category
      </Typography>

      <Grid container spacing={2}>
        {relatedByCategory.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product._id}>
            <RelatedProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RelatedProducts;

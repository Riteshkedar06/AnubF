import React from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const ShadeCard = () => {
  const { companyName } = useParams();

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Shade Card for {companyName}
      </Typography>
      {/* Add your content for shade card here */}
    </Box>
  );
};

export default ShadeCard;

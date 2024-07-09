import React from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const MaterialCard = () => {
  const { companyName } = useParams();

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Materials Used by {companyName}
      </Typography>
      {/* Add your content for materials here */}
    </Box>
  );
};

export default MaterialCard;

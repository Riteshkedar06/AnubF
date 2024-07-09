import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const ProductCard = ({ product }) => {
  const [added, setAdded] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleAddToCart = () => {
    setAdded(true);
  };

  const handleRemoveFromCart = () => {
    setAdded(false);
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: 300,
        height: 500,
        m: "auto",
        transform: "scale(0.95)",
        transition: "transform 0.5s, box-shadow 0.5s",
        "&:hover": {
          transform: "scale(1)",
          boxShadow: "5px 20px 30px rgba(0,0,0,0.2)",
        },
      }}
    >
      <Card sx={{ height: "100%", borderRadius: 2, overflow: "hidden" }}>
        <CardMedia
          component="img"
          height="80%"
          image={product.image}
          alt={product.name}
          sx={{ backgroundSize: "cover" }}
        />
        <Box
          sx={{
            display: "flex",
            height: "20%",
            transition: "transform 0.5s",
            transform: added ? "translateX(-50%)" : "translateX(0)",
          }}
        >
          <Box
            sx={{
              width: "50%",
              background: "#f4f4f4",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 2,
            }}
          >
            <CardContent sx={{ p: 0 }}>
              <Typography variant="h6">{product.name}</Typography>
              <Typography variant="body2">£{product.price}</Typography>
            </CardContent>
            <IconButton
              onClick={handleAddToCart}
              sx={{
                color: "#254053",
                "&:hover": { color: "#00394B", background: "#A6CDDE" },
              }}
            >
              <AddShoppingCartIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              width: "50%",
              background: "#A6CDDE",
              color: "white",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <IconButton
              onClick={handleRemoveFromCart}
              sx={{
                color: "white",
                background: "#BC3B59",
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                "&:hover": { background: "#9B2847" },
              }}
            >
              <ClearIcon />
            </IconButton>
            <DoneIcon sx={{ fontSize: 30 }} />
            <CardContent sx={{ p: 0 }}>
              <Typography variant="h6">Chair</Typography>
              <Typography variant="body2">Added to your cart</Typography>
            </CardContent>
          </Box>
        </Box>
      </Card>
      <Box
        sx={{
          position: "absolute",
          top: -70,
          right: -70,
          width: 140,
          height: 140,
          background: "#92879B",
          borderRadius: "0 0 200px 200px",
          transition: "all 0.5s, border-radius 2s, top 1s",
          overflow: "hidden",
          zIndex: 9,
          "&:hover": {
            width: "100%",
            right: 0,
            top: 0,
            borderRadius: 0,
            height: "80%",
          },
        }}
      >
        <IconButton
          onClick={() => setShowDetails(!showDetails)}
          sx={{
            position: "absolute",
            right: 85,
            top: 85,
            color: "white",
            opacity: showDetails ? 0 : 1,
            transition: "opacity 0.5s, right 1s, top 1s",
          }}
        >
          <InfoOutlinedIcon />
        </IconButton>
        <Box
          sx={{
            opacity: showDetails ? 1 : 0,
            transform: showDetails
              ? "scale(1) translateY(0)"
              : "scale(0.5) translateY(-200%)",
            transition: "opacity 0.2s, transform 0.8s",
            padding: "5%",
            color: "white",
          }}
        >
          <Typography variant="body1">Width: 3000mm</Typography>
          <Typography variant="body1">Height: 4000mm</Typography>
          {/* Add additional details as needed */}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCard;

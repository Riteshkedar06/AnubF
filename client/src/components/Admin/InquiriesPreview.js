import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const InquiriesPreview = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/inquiries")
      .then((response) => {
        setInquiries(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching inquiries:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <CircularProgress />;

  const handleInquiryClick = (inquiryId) => {
    navigate(`/inquiries/${inquiryId}`);
  };

  return (
    <Box sx={{ width: "100%", maxHeight: "400px", overflowY: "auto", px: 2 }}>
      {inquiries.length === 0 ? (
        <Typography variant="body1" align="center">
          No inquiries available.
        </Typography>
      ) : (
        inquiries.map((inquiry) => (
          <Card key={inquiry._id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="subtitle1">{inquiry.name}</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                {inquiry.message.slice(0, 50)}
                {inquiry.message.length > 50 ? "..." : ""}
              </Typography>
            </CardContent>
            <Box sx={{ display: "flex", justifyContent: "center", pb: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleInquiryClick(inquiry._id)}
                sx={{
                  bgcolor: "#151717",
                  color: "white",
                  "&:hover": { bgcolor: "#252727" },
                }}
              >
                View Details
              </Button>
            </Box>
          </Card>
        ))
      )}
    </Box>
  );
};

export default InquiriesPreview;

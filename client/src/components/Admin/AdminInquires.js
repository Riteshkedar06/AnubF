import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Snackbar,
} from "@mui/material";

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const response = await axios.get("http://localhost:5000/inquiries");
      setInquiries(response.data);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    }
  };

  const handleDelete = async (inquiryId) => {
    try {
      await axios.delete(`http://localhost:5000/inquiries/${inquiryId}`);
      fetchInquiries(); // Fetch updated list after deletion
      setSnackbarMessage("Inquiry solved and deleted.");
      setSnackbarOpen(true);
    } catch (error) {
      console.error(`Error deleting inquiry ${inquiryId}:`, error);
      setSnackbarMessage("Error deleting inquiry.");
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container sx={{ marginTop: "2rem" }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "#203B2B",
          marginBottom: "20px",
          fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem", lg: "3rem" },
        }}
        gutterBottom
      >
        All Inquiries
      </Typography>
      <List
        sx={{
          bgcolor: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: "2rem",
          p: 2,
        }}
      >
        {inquiries.map((inquiry) => (
          <ListItem key={inquiry._id} alignItems="center">
            <ListItemText
              secondary={
                <>
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{ display: "block", color: "text.primary" }}
                  >
                    Email: {inquiry.email}
                  </Typography>
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{ display: "block", color: "text.secondary" }}
                  >
                    Name: {inquiry.name}
                  </Typography>
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{ display: "block", color: "text.secondary" }}
                  >
                    City: {inquiry.city}
                  </Typography>
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{ display: "block", color: "text.secondary" }}
                  >
                    Contact: {inquiry.contact}
                  </Typography>
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{ display: "block", color: "text.secondary" }}
                  >
                    Message: {inquiry.message}
                  </Typography>
                </>
              }
            />
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDelete(inquiry._id)}
              sx={{ ml: 2 }}
            >
              Solved
            </Button>
          </ListItem>
        ))}
      </List>

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

export default AdminInquiries;

import React, { useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    surname: "",
    salutation: "",
    companyName: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/newsletter/subscribe",
        formData
      );
      console.log(response.data);
      // Handle success or error messages here
    } catch (error) {
      console.error("Subscription error:", error);
    }
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        maxWidth: "1200px",
        margin: "5rem auto",
        padding: "20px",
        gap: "20px",
      }}
    >
      <CardContent
        component="form"
        onSubmit={handleSubmit}
        sx={{
          flex: 1,
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Subscribe Now
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Elevate your workspace with our newsletter. Sign up and receive the
          latest product news, workplace trends, and exclusive event invitations
          near you.
        </Typography>
        <TextField
          required
          label="Email"
          variant="outlined"
          fullWidth
          name="email"
          value={formData.email}
          onChange={handleChange}
          sx={{ marginBottom: "10px" }}
          helperText="Please complete this required field."
        />
        <Box sx={{ display: "flex", gap: "10px" }}>
          <TextField
            required
            label="First name"
            variant="outlined"
            fullWidth
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            helperText="Please complete this required field."
          />
          <TextField
            required
            label="Surname"
            variant="outlined"
            fullWidth
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            helperText="Please complete this required field."
          />
        </Box>
        <Box sx={{ display: "flex", gap: "10px" }}>
          <FormControl required fullWidth>
            <InputLabel>Salutation</InputLabel>
            <Select
              name="salutation"
              value={formData.salutation}
              onChange={handleChange}
              label="Salutation"
            >
              <MenuItem value="">
                <em>Please Select</em>
              </MenuItem>
              <MenuItem value="Mr">Mr</MenuItem>
              <MenuItem value="Mrs">Mrs</MenuItem>
              <MenuItem value="Ms">Ms</MenuItem>
              <MenuItem value="Dr">Dr</MenuItem>
            </Select>
            <Typography variant="caption" color="error">
              Please complete this required field.
            </Typography>
          </FormControl>
          <TextField
            required
            label="Company name"
            variant="outlined"
            fullWidth
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            helperText="Please complete this required field."
          />
        </Box>
        <Button
          variant="contained"
          type="submit"
          sx={{
            background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
            color: "white",
          }}
        >
          SUBMIT
        </Button>
      </CardContent>
      <CardMedia
        component="img"
        image="./bg.jpg"
        sx={{
          flex: 1,
          maxWidth: { xs: "100%", md: "50%" },
          height: "auto",
        }}
      />
    </Card>
  );
};

export default Contact;

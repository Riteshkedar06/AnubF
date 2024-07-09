import React, { useState, useContext } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
    setFormData({ email: "", password: "", confirmPassword: "" });
    setError(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (isSignUp && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      console.log("Submitting form data:", formData);
      const url = isSignUp
        ? "http://localhost:5000/auth/register"
        : "http://localhost:5000/auth/login";
      const { email, password } = formData;
      const response = await axios.post(url, { email, password });
      console.log("Server response:", response);
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      setIsAuthenticated(true);

      navigate("/admin");
    } catch (error) {
      console.error("Error during form submission:", error);
      setError("Error during form submission");
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          bgcolor: "#ffffff",
          padding: 4,
          width: 450,
          borderRadius: 2,
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
          margin: "auto",
          mt: 4,
          boxShadow: 3,
        }}
      >
        <img
          src="./logo2.png"
          alt="Furniture World Logo"
          style={{ width: 100, marginBottom: 20 }}
        />
        <Typography component="h1" variant="h5">
          {isSignUp ? "Sign Up" : "Welcome back"}
        </Typography>
        <Typography component="p" color="text.secondary" gutterBottom>
          {isSignUp
            ? "Please enter your details to sign up"
            : "Please enter your details"}
        </Typography>

        {error && (
          <Typography color="error" gutterBottom>
            {error}
          </Typography>
        )}

        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography
              variant="subtitle1"
              sx={{ color: "#151717", fontWeight: 600 }}
            >
              Email
            </Typography>
            <Box
              sx={{
                border: "1.5px solid #ecedec",
                borderRadius: 1,
                height: 50,
                display: "flex",
                alignItems: "center",
                pl: 1,
                transition: "0.2s ease-in-out",
                "&:focus-within": {
                  borderColor: "#2d79f3",
                },
              }}
            >
              <TextField
                fullWidth
                variant="standard"
                name="email"
                value={formData.email}
                onChange={handleChange}
                InputProps={{ disableUnderline: true }}
                placeholder="Enter your Email"
                sx={{ ml: 1 }}
              />
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2 }}>
            <Typography
              variant="subtitle1"
              sx={{ color: "#151717", fontWeight: 600 }}
            >
              Password
            </Typography>
            <Box
              sx={{
                border: "1.5px solid #ecedec",
                borderRadius: 1,
                height: 50,
                display: "flex",
                alignItems: "center",
                pl: 1,
                transition: "0.2s ease-in-out",
                "&:focus-within": {
                  borderColor: "#2d79f3",
                },
              }}
            >
              <TextField
                fullWidth
                variant="standard"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                InputProps={{ disableUnderline: true }}
                placeholder="Enter your Password"
                sx={{ ml: 1 }}
              />
            </Box>
          </Box>
          {isSignUp && (
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2 }}
            >
              <Typography
                variant="subtitle1"
                sx={{ color: "#151717", fontWeight: 600 }}
              >
                Confirm Password
              </Typography>
              <Box
                sx={{
                  border: "1.5px solid #ecedec",
                  borderRadius: 1,
                  height: 50,
                  display: "flex",
                  alignItems: "center",
                  pl: 1,
                  transition: "0.2s ease-in-out",
                  "&:focus-within": {
                    borderColor: "#2d79f3",
                  },
                }}
              >
                <TextField
                  fullWidth
                  variant="standard"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  InputProps={{ disableUnderline: true }}
                  placeholder="Confirm your Password"
                  sx={{ ml: 1 }}
                />
              </Box>
            </Box>
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 2,
            }}
          >
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Link href="#" variant="body2" sx={{ color: "#2d79f3" }}>
              Forgot password?
            </Link>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: "#151717",
              color: "white",
              height: 50,
              borderRadius: 1,
              fontWeight: 500,
              fontSize: 15,
              "&:hover": { bgcolor: "#252727" },
            }}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <Typography
            variant="body2"
            align="center"
            sx={{ color: "black", fontSize: 14, my: 1 }}
          >
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <Link
              href="#"
              variant="body2"
              sx={{ color: "#2d79f3", fontWeight: 500, cursor: "pointer" }}
              onClick={toggleSignUp}
            >
              {isSignUp ? "Sign in" : "Sign Up"}
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Auth;

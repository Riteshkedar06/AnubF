import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Link,
  Box,
} from "@mui/material";
import axios from "axios";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/newsletter/subscribe",
        { email }
      );
      if (response.data.is_subscribed) {
        setMessage("Thank you for subscribing!");
      } else {
        setMessage(response.data.message || "An error occurred.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        width: "100%",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#0d1005",
          color: "white",
          p: 4,
          borderTopLeftRadius: "6rem",
          height: { xs: "auto", md: "auto" },
          width: "100%",
        }}
      >
        <Container sx={{ alignItems: "center" }}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              gap: 4,
            }}
          >
            <Box sx={{ flex: "1 1 30%", minWidth: "250px" }}>
              <img
                src="logo2.png"
                alt="Anub Furniture"
                style={{ width: "50px" }}
              />
              <Typography variant="body1" sx={{ mt: 2 }}>
                Anub Furniture is a modern and innovative furniture company
                specializing in creating stylish and functional pieces for
                contemporary living spaces.
              </Typography>
            </Box>
            <Box sx={{ flex: "1 1 15%", minWidth: "150px" }}>
              <Typography variant="h6" gutterBottom>
                Office
              </Typography>
              <Typography variant="body2">
                Katai Pipeline Road, Near Nevali-phata, Dombivli Maharashtra,
                PIN:421203, India
              </Typography>
              <Typography variant="body2">anubfurniture@gmail.com</Typography>
              <Typography variant="body2">+91-87791 55512</Typography>
              <Typography variant="body2">+91-99874 93899</Typography>
            </Box>
            <Box sx={{ flex: "1 1 15%", minWidth: "150px" }}>
              <Typography variant="h6" gutterBottom>
                Links
              </Typography>
              <Link href="/" color="inherit" variant="body2">
                Home
              </Link>
              <br />
              <Link href="/products" color="inherit" variant="body2">
                Products
              </Link>
              <br />
              <Link href="/material" color="inherit" variant="body2">
                Materials
              </Link>
              <br />
              <Link href="/blogs" color="inherit" variant="body2">
                Blogs
              </Link>
              <br />
              <Link href="/aboutus" color="inherit" variant="body2">
                About Us
              </Link>
              <br />
              <Link href="#" color="inherit" variant="body2">
                Our Partner
              </Link>
              <br />
              <Link href="/contact" color="inherit" variant="body2">
                Contact
              </Link>
              <br />
            </Box>
            <Box sx={{ flex: "1 1 30%", minWidth: "250px" }}>
              <Typography variant="h6" gutterBottom>
                Newsletter
              </Typography>
              <form onSubmit={handleSubscribe}>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Enter Your email-id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{
                    backgroundColor: "white",
                    borderRadius: 1,
                    mb: 2,
                    width: "100%",
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    bgcolor: "#83B735",
                    fontSize: { xs: "0.8rem", sm: ".8rem", md: "1rem" },
                    px: { xs: 2, sm: 2, md: 3 },
                    py: { xs: 1, sm: 1.3, md: 1.3 },
                    ":hover": { bgcolor: "#b5d761" },
                  }}
                >
                  Subscribe
                </Button>
              </form>
              {message && (
                <Typography variant="body2" sx={{ mt: 2 }}>
                  {message}
                </Typography>
              )}
              <Box sx={{ mt: 2 }}>
                <Link href="#">
                  <i
                    className="fab fa-linkedin"
                    style={{ color: "white", marginRight: "10px" }}
                  ></i>
                </Link>
                <Link href="#">
                  <i
                    className="fas fa-phone"
                    style={{ color: "white", marginRight: "10px" }}
                  ></i>
                </Link>
                <Link href="#">
                  <i className="fab fa-youtube" style={{ color: "white" }}></i>
                </Link>
              </Box>
            </Box>
          </Box>
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Typography variant="body2">
              Anub Furniture © 2023 - All Rights Reserved
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;

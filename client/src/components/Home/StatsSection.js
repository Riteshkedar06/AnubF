import React from "react";
import { Box, Grid, Typography, Paper, Divider } from "@mui/material";
import { styled } from "@mui/system";

const StatBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: "center",
  borderRadius: theme.spacing(2),
  backgroundColor: "#f8f8f8",
}));

const stats = [
  { number: "37", label: "destinations" },
  { number: "10k", label: "HAPPY CLIENTS" },
  { number: "156", label: "CUPS OF COFFEE" },
];

const StatsSection = () => {
  return (
    <Box sx={{ background: "#FFF", p: 5, my: 2 }}>
      <Typography
        variant="h4"
        component="div"
        gutterBottom
        textAlign="center"
        sx={{
          fontWeight: "bold",
          color: "#415217",
          fontSize: { xs: "1.5rem", sm: "1.5rem", md: "2rem", lg: "2rem" },
        }}
      >
        We can take you anywhere
      </Typography>
      <Divider sx={{ mb: 5 }} />
      <Grid container spacing={3} justifyContent="center">
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={4} md={3} key={index}>
            <StatBox>
              <Typography variant="h3" component="div" color="#415217">
                {stat.number}
              </Typography>
              <Typography variant="subtitle1" component="div">
                {stat.label}
              </Typography>
            </StatBox>
          </Grid>
        ))}
      </Grid>
      <Divider sx={{ mt: 5 }} />
    </Box>
  );
};

export default StatsSection;

import React from "react";
import {
  Box,
  Grid,
  Link,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";

const clients = [
  { src: "./blog.jpg", alt: "Client 1", width: 100, height: 100 },
  { src: "./blog.jpg", alt: "Client 2", width: 100, height: 100 },
  { src: "./blog.jpg", alt: "Client 3", width: 100, height: 100 },
  { src: "./blog.jpg", alt: "Client 4", width: 110, height: 110 },
];

const clientNames = [
  [
    "Renaissance Jewellery Ltd",
    "LIC of India",
    "Oil States India Pvt. Ltd. – Taloja",
  ],
  [
    "E- Furtherance",
    "RMX Couriers",
    "SRK Gems – Surat – Full Height Partitions",
  ],
  [
    "Dousefire Systems",
    "Kalpataru Habitat",
    "Proctor & Gamble India Ltd. – GOA",
  ],
  [
    "A. Z. Electricals – Sanpada & Khalapur",
    "G South – BMC office",
    "Bayer Vapi Ltd. – Vapi",
  ],
  ["Naaptol.- Rabale", "Dadar Pumping Station – 3rd Floor", "GEP – Airoli"],
  [
    "Prime Focus Technologies – Andheri MIDC",
    "Techlink Infoware Pvt. Ltd.",
    "New Era Technologies Pvt. Ltd",
  ],
  [
    "Famy Care Ltd. – Vapi- Bilad",
    "GHCL – Kandivali",
    "DB Realty – Goregaon / Parel",
  ],
  [
    "Neelkanth Woods – Thane – Godbunder road",
    "Route SMS",
    "EBC Bearing Corporation – Andheri",
  ],
  [
    "Symphony Interiors – Andheri – Marol",
    "Ace Berverages Pvt. Ltd",
    "Tata Sky – Parel",
  ],
  [
    "Tata AIG.- Lower Parel",
    "Ankit Gems – Surat – Full Height Partitions",
    "Saraswat Bank Ltd. Powai",
  ],
  [
    "Human Dynamics – Powai",
    "Piramal Enterprises – Vikhorli",
    "Sterlite – Pune",
  ],
  [
    "Vertex Logistics India Pvt.Ltd. India Cements – Pune",
    "TCS - Thane",
    "Maserati Car Showroom – Andheri",
  ],
  [
    "PKMG – Bandra – BKC",
    "Maharshtra Traffic Police – Worli",
    "Quintile India Pvt. Ltd. – Andheri",
  ],
  [
    "Ajay Bhai Chaudhary Office – Surat",
    "DB Realty – Goregaon / Parel",
    "Oil States India Pvt. Ltd. – Taloja",
  ],
  [
    "C R Realty – Bandra – BKC",
    "EBC Bearing Corporation – Andheri",
    "SRK Gems – Surat – Full Height Partitions",
  ],
];

const Clients = () => {
  return (
    <Box
      sx={{
        p: 4,
      }}
    >
      <Box
        sx={{
          py: 1,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ my: 10 }}>
          <title>Our Clients</title>
          <Box
            component="section"
            sx={{
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Grid container spacing={2}>
              {clients.map((client, index) => (
                <Grid
                  item
                  key={index}
                  xs={6}
                  sm={6}
                  md={3}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    component="img"
                    src={client.src}
                    alt={client.alt}
                    width={client.width}
                    height={client.height}
                    sx={{
                      alignItems: "center",
                      justifyContent: "center",
                      width: 200,
                      height: 200,
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box sx={{ mt: 6 }}>
            <Table>
              <TableBody>
                {clientNames.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {row.map((name, cellIndex) => (
                      <TableCell
                        key={cellIndex}
                        sx={{
                          p: 1,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {name}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Clients;

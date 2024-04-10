import React, { useState } from "react";
import { Box, Typography, Zoom, Grid } from "@mui/material";
import { ServiceCard } from "../components/ServiceCard.tsx";
import TopBanner2 from "../components/TopBanner2.tsx";
import Flower from "../images/ServicePageImages/FlowerDelivery.svg";
import Medicine from "../images/ServicePageImages/MedicineDelivery.svg";
import Sanitation from "../images/ServicePageImages/SanitationServices.svg";
import Security from "../images/ServicePageImages/SecurityServices.svg";
import Gift from "../images/ServicePageImages/GiftDelivery.svg";
import MedicalDevice from "../images/ServicePageImages/MedicalDeviceDelivery.svg";
import Room from "../images/ServicePageImages/RoomScheduling.svg";
import Template from "../images/ServicePageImages/ServicesTemplate.svg";

export default function ServicesPage() {
  const [showCards] = useState(true); // Initialize to true to show cards initially

  // Define service paths and images
  const serviceData = [
    { path: "/Services/FlowerDelivery", image: Flower },
    { path: "/Services/MedicineDelivery", image: Medicine },
    { path: "/Services/SanitationService", image: Sanitation },
    { path: "/Services/SecurityService", image: Security },
    { path: "/Services/GiftDelivery", image: Gift },
    { path: "/Services/MedicalDeviceDelivery", image: MedicalDevice },
    { path: "/Services/RoomScheduling", image: Room },
    { path: "/Services/ServicesTemplate", image: Template },
  ];

  return (
    <>
      <TopBanner2 />
      <Box
        sx={{
          mt: 20,
          backgroundColor: "#ffffff",
        }}
      >
        <Typography
          variant={"h1"}
          align={"center"}
          color={"#003A96"}
          gutterBottom={true}
          fontSize={36}
          //fontWeight={'bold'}
          fontStyle={"inherit"}
          fontFamily={"sans-serif"}
        >
          Services
        </Typography>
      </Box>
      <div
        style={{
          padding: 20,
          display: "flex",
          justifyContent: "center",
          marginLeft: "2.4%",
          marginRight: "2.4%",
        }}
      >
        <Grid container spacing={3} direction={"row"}>
          {serviceData.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={index}>
              <Zoom
                in={showCards}
                style={{
                  transitionDelay: showCards ? `${index * 200}ms` : "0ms",
                }}
              >
                <div>
                  <ServiceCard
                    servicePath={service.path}
                    imagePath={service.image}
                  />
                </div>
              </Zoom>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}

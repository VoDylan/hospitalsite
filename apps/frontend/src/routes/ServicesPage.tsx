import React, { useState } from "react";
import { Box, Typography, Zoom, Grid } from "@mui/material";
import { ServiceCard } from "../components/homepage/ServiceCard.tsx";
import TopBanner2 from "../components/banner/TopBanner2.tsx";
//import Flower from "../images/servicePageImages/FlowerDelivery.svg";
//import Medicine from "../images/servicePageImages/MedicineDelivery.svg";
import sanitation from "../images/servicePageImages/janitorService.jpg";
import security from "../images/servicePageImages/securityService.jpg";
//import Gift from "../images/servicePageImages/GiftDelivery.svg";
import medicalDevice from "../images/servicePageImages/medicalDevices.jpg";
//import Room from "../images/servicePageImages/RoomScheduling.svg";
import Template from "../images/servicePageImages/ServicesTemplate.svg";
import flower from "../images/servicePageImages/Flower.jpg";
import gift from "../images/servicePageImages/giftBasket.jpg";
import medicine from "../images/servicePageImages/medicineCard.jpg";
import signL from "../images/servicePageImages/RoomScheduling.jpg";

export default function ServicesPage() {
  const [showCards] = useState(true); // Initialize to true to show cards initially

  // Define service paths and images
  const serviceData = [
    { path: "/Services/FlowerDelivery",
      image: flower,
      title: 'Flower Delivery',
      description: 'Deliver flowers to a friend or loved one',
      buttonContent: 'Get Flowers'},
    { path: "/Services/MedicineDelivery",
      image: medicine,
      title: 'Medicine Delivery',
      description: 'Get medicine for yourself or a dependent',
      buttonContent: 'Get Medicine'},
    { path: "/Services/SanitationService",
      image: sanitation,
      title: 'Sanitation Service',
      description: 'Request sanitation at a location',
      buttonContent: 'Request Sanitation'},
    { path: "/Services/SecurityService",
      image: security,
      title: 'Security',
      description: 'Request security at a location',
      buttonContent: 'Request Security'},
    { path: "/Services/GiftDelivery",
      image: gift,
      title: 'Gift Delivery',
      description: 'Send a gift to a friend or loved one',
      buttonContent: 'Get Gift'},
    { path: "/Services/DeviceDeliveryService",
      image: medicalDevice,
      title: 'Medical Device Delivery',
      description: 'Get medical devices for yourself or a dependent',
      buttonContent: 'Get Device'},
    { path: "/Services/RoomScheduling",
      image: signL,
      title: 'Room Scheduling',
      description: 'Schedule a room for yourself or a dependent',
      buttonContent: 'Schedule Room'},
    { path: "",
      image: Template,
      title: 'More Services Soon',
      description: 'More services to be displayed here, coming soon!',
      buttonContent: 'Home Page'
      },
  ];

  return (
    <>
      <TopBanner2 />
      <Box
        sx={{
          mt: 15,
          backgroundColor: "#ffffff",
        }}
      >
        <Box sx={{
          backgroundColor: "#003A96",
          position: "relative",
          marginBottom: "2rem",
          height: "6rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: "90%",
        }}>
          <Typography
            variant={"h1"}
            color={"white"}
            gutterBottom={true}
            fontSize={46}
            //fontWeight={'bold'}
            fontStyle={"inherit"}
            fontFamily={"sans-serif"}
          >
            Services
          </Typography>
        </Box>
      </Box>
      <div
        style={{
          padding: 10,
          display: "flex",
          justifyContent: "center",
          marginLeft: "2.4%",
          marginRight: "2.4%",
        }}
      >
        <Box
        >
        <Grid container spacing={5} direction={"row"}>
          {serviceData.map((service:{path: string, image: string, title: string, description: string, buttonContent: string}, index) => (
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
                    title={service.title}
                    description={service.description}
                    buttonContent={service.buttonContent}
                  />
                </div>
              </Zoom>
            </Grid>
          ))}
        </Grid>
        </Box>
      </div>
    </>
  );
}

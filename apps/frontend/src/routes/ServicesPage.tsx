import { Box, Grid, Typography } from "@mui/material";
import { ServiceCard } from "../components/ServiceCard.tsx";
import TopBanner2 from "../components/TopBanner2.tsx";
import Flower from "../../public/ServicePageImages/FlowerDelivery.svg";
import Medicine from "../../public/ServicePageImages/MedicineDelivery.svg";
import Sanitation from "../../public/ServicePageImages/SanitationServices.svg";
import Security from "../../public/ServicePageImages/SecurityServices.svg";
import Gift from "../../public/ServicePageImages/GiftDelivery.svg";
import MedicalDevice from "../../public/ServicePageImages/MedicalDeviceDelivery.svg";
import Room from "../../public/ServicePageImages/RoomScheduling.svg";
import Template from "../../public/ServicePageImages/ServicesTemplate.svg";

export default function ServicesPage() {
  // Define service paths and images
  const serviceData = [
    { path: "/Services/FlowerDelivery", image: Flower },
    { path: "/Services/MedicineDelivery", image: Medicine },
    { path: "/Services/MedicineDelivery", image: Sanitation },
    { path: "/Services/MedicineDelivery", image: Security },
    { path: "/Services/MedicineDelivery", image: Gift },
    { path: "/Services/MedicineDelivery", image: MedicalDevice },
    { path: "/Services/MedicineDelivery", image: Room },
    { path: "/Services/MedicineDelivery", image: Template },
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
          color={"Black"}
          gutterBottom={true}
          fontSize={40}
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
        }}
      >
        <Grid container spacing={3}>
          {serviceData.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
              <ServiceCard
                servicePath={service.path}
                imagePath={service.image}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}

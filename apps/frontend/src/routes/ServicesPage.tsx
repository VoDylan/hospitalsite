import { Box, Grid, Typography } from "@mui/material";
import { ServiceCard } from "../components/ServiceCard.tsx";

export default function ServicesPage() {
  return (
    <div>
      <Box
        sx={{
          backgroundColor: "#012D5A",
        }}
      >
        <Typography
          variant={"h1"}
          align={"center"}
          color={"white"}
          gutterBottom={true}
        >
          Services
        </Typography>
      </Box>
      <div style={{ padding: 80 }}>
        <Grid
          container
          direction={"row"}
          gap={5}
          justifyContent={"space-evenly"}
          // alignItems={"center"}
        >
          <Grid>
            <ServiceCard
              service={"Flower Delivery"}
              servicePath={"http://localhost:3000/FlowerDeliveryService"}
              imagePath={"../../public/Flower.jpg"}
              imageAlt={"Flower"}
            />
          </Grid>
          <Grid>
            <ServiceCard
              service={"More Coming Soon!"}
              servicePath={"http://localhost:3000/Services"}
              imagePath={"../../public/Clock.png"}
              imageAlt={"More coming soon"}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

import { Box, Grid, Typography } from "@mui/material";
import { ServiceCard } from "../components/ServiceCard.tsx";
import TopBanner2 from "../components/TopBanner2.tsx";
import bgImage from "../../public/Clock.png";

export default function ServicesPage() {
  return (
    <>
      <TopBanner2 />
      <Box
        sx={{
          mt: 15,
          backgroundColor: "#003A96",
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
        >
          <Grid>
            <ServiceCard
              service={"Flower Delivery"}
              servicePath={"/Services/FlowerDelivery"}
              imagePath={"../../public/Flower.jpg"}
              imageAlt={"Flower"}
            />
          </Grid>
          <Grid>
            <ServiceCard
              service={"More Coming Soon!"}
              servicePath={"/Services"}
              imagePath={bgImage}
              imageAlt={"More coming soon"}
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
}

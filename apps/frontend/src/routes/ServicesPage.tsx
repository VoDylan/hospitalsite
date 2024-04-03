import { Box, Grid, Typography } from "@mui/material";
import { ServiceCard } from "../components/ServiceCard.tsx";
import TopBanner from "../components/TopBanner.tsx";

export default function ServicesPage() {
  return (
    <>
      <TopBanner />
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
          ServicesWoah
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
              imagePath={"../../public/Clock.png"}
              imageAlt={"More coming soon"}
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
}

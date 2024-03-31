import { Grid } from "@mui/material";
import { ServiceCard } from "../components/ServiceCard.tsx";

export default function ServicesPage() {
  return (
    <div>
      <Grid
        container
        direction={"row"}
        justifyContent={"space-evenly"}
        alignItems={"baseline"}
      >
        <Grid></Grid>
        <Grid>
          <ServiceCard
            service={"Flower Delivery"}
            servicePath={"http://localhost:3000/FlowerDeliveryService"}
            imagePath={"../../public/Flower.jpg"}
            imageAlt={"Flower"}
          />
        </Grid>
        <Grid></Grid>
        <Grid></Grid>
      </Grid>
    </div>
  );
}

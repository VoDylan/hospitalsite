import ServiceCarousel from "./ServiceCarousel.tsx";
import { Box, Stack, Button } from "@mui/material";
import { Link } from "react-router-dom";

function ServicesPreview() {
  return (
    <Box>
      <ServiceCarousel/>
      <Stack
        direction={"row"}
        sx={{
          display: "flex",
          alignContent: "center",
          justifyContent: "end",
          marginRight: "50px",
          marginBottom: "10px",
        }}
      >
        <Link to={"/Services"}>
          <Box sx={{
            marginTop: "-185px"

          }}>
          <Button variant="contained" size="small">
            See All {">"}
          </Button>
      </Box>
        </Link>
      </Stack>
    </Box>
  );
}

export default ServicesPreview;


import ServiceCarousel from "./ServiceCarousel.tsx";
import { Box, Stack, Button } from "@mui/material";
import { Link } from "react-router-dom";

function ServicesPreview() {
  return (
    <Box sx={{ marginTop: "4%" }}>
      <ServiceCarousel/>
      <Stack
        direction={"row"}
        sx={{
          display: "flex",
          alignContent: "center",
          justifyContent: "end",
          marginRight: "150px",
          marginBottom: "45px",
        }}
      >
        <Link to={"/Services"}>
          <Box sx={{
            marginTop: "-20px"

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


import { Box, Grid } from "@mui/material";

export default function ServicesPage() {
  return (
    <div>
      <Grid
        container
        direction={"row"}
        justifyContent={"space-evenly"}
        alignItems={"baseline"}
      >
        <Grid>
          <Box
            sx={{
              width: 360,
              height: 360,
              borderRadius: 1,
              bgcolor: "primary.main",
              "&:hover": {
                bgcolor: "primary.dark",
              },
            }}
          >
            Hello
          </Box>
        </Grid>
        <Grid>
          <Box
            sx={{
              width: 360,
              height: 360,
              borderRadius: 1,
              bgcolor: "primary.main",
              "&:hover": {
                bgcolor: "primary.dark",
              },
            }}
          >
            Hello
          </Box>
        </Grid>
        <Grid>
          <Box
            sx={{
              width: 360,
              height: 360,
              borderRadius: 1,
              bgcolor: "primary.main",
              "&:hover": {
                bgcolor: "primary.dark",
              },
            }}
          >
            Hello
          </Box>
        </Grid>
        <Grid>
          <Box
            sx={{
              width: 360,
              height: 360,
              borderRadius: 1,
              bgcolor: "primary.main",
              "&:hover": {
                bgcolor: "primary.dark",
              },
            }}
          >
            Hello
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

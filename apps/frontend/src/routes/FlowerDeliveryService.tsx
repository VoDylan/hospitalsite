import { Box, Grid, Typography } from "@mui/material";
function FlowerDeliveryService() {
  return (
    <>
      <Grid
        container
        my={8}
        rowSpacing={8}
        columnSpacing={4}
        alignContent={"center"}
        alignItems={"flexStart"}
        boxShadow={4}
      >
        <Grid
          item
          xs={12}
          columnSpacing={0}
          sx={{
            alignItems: "flexStart",
            bgcolor: "primary.main",
          }}
        >
          <Typography
            color={"white"}
            align={"center"}
            fontStyle={"Open Sans"}
            fontSize={40}
          >
            Flower Delivery Service Form
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Box>
            <Typography>Box 2</Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box>
            <Typography>Box 2</Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box>
            <Typography>Box 3</Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box>
            <Typography>Box 4</Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box>
            <Typography>Box 5</Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <Typography align={"center"}>Submit Button Here</Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default FlowerDeliveryService;

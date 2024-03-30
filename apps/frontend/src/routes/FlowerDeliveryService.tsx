import { Grid, Typography } from "@mui/material";
function FlowerDeliveryService() {
  return (
    <>
      <Grid
        container
        bgcolor={"primary.main"}
        my={8}
        spacing={4}
        alignSelf={"center"}
        alignContent={"center"}
      >
        <Grid item xs={5}>
          <Typography>Box 1</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography>Box 2</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography>Box 2</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography>Box 3</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography>Box 4</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography>Box 5</Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default FlowerDeliveryService;

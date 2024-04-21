import {Box, Grid, Stack, Typography} from "@mui/material";

interface AboutCardProps {
  role: string;
  name: string;
  bio: string;
  email: string;
  imagePath: string;
}

export function AboutCardLeft(props: AboutCardProps) {
  return (
    <Box
      sx={{
        backgroundColor: "lightgray",
      }}
    >
      <Stack
        padding={2}
      >
        <Typography
          variant="h5" component="div"
          sx={{
            textAlign: "left",
          }}
        >
          {props.role}
        </Typography>
        <Typography
          variant="h5" component="div"
          sx={{
            textAlign: "left",
          }}
        >
          {props.name}
        </Typography>
        <Grid
          container
          spacing={2}
          xs={12}
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid item xs={8}>
            <Stack>
              <Typography
                variant="h5" component="div"
                sx={{
                  textAlign: "left",
                }}
              >
                {props.bio}
              </Typography>
              <Typography
                variant="h5" component="div"
                sx={{
                  textAlign: "left",
                }}
              >
                {props.email}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <img
              src={props.imagePath}
              alt={"Picture of " + props.name}
              style={{maxWidth: "100%"}}
            />
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}

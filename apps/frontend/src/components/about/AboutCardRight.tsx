import {Box, Grid, Stack, Typography} from "@mui/material";

interface AboutCardProps {
  role: string;
  name: string;
  bio: string;
  email: string;
  imagePath: string;
}

export function AboutCardRight(props: AboutCardProps) {
  return (
    <>
      <br/>
      <br/>
      <Box
          sx={{
            mx: 'auto',
            backgroundColor: "lightgray",
            maxWidth: "70%",
            borderRadius: "20px",
          }}
      >
        <Stack
            padding={2}
        >
          <Box
              sx={{
                backgroundColor: "lightgray",
              }}
          >
            <Typography
                variant="h4"
                component="div"
                sx={{
                  textAlign: "left",
                }}
            >
              <b>{props.role}</b>
            </Typography>
            <Typography
                variant="h4"
                component="div"
                sx={{
                  textAlign: "left",
                }}
            >
              {props.name}
            </Typography>
          </Box>
          <Box
              sx={{
                paddingTop: 3,
              }}
          >
            <Grid
                container
                spacing={2}
                xs={12}
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
            >
              <Grid item xs={4}>
                <img
                    src={props.imagePath}
                    alt={"Picture of " + props.name}
                    style={{
                      maxWidth: "100%",
                      borderRadius: "20%",
                    }}
                />
              </Grid>
              <Grid item xs={8}>
                <Stack>
                  <Typography
                      variant="h5"
                      component="div"
                      sx={{
                        textAlign: "left",
                      }}
                  >
                    {props.bio}
                  </Typography>
                  <Typography
                      variant="h5"
                      component="div"
                      sx={{
                        paddingTop: 3,
                        textAlign: "left",
                      }}
                  >
                    Email: {props.email}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Box>
    </>
  );
}

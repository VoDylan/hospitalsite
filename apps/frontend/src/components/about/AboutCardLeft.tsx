import {Box, Grid, Stack, Typography} from "@mui/material";
import { useState } from "react";

interface AboutCardProps {
  role: string;
  name: string;
  bio: string;
  email: string;
  imagePath: string;
  quote: string;
}

export function AboutCardLeft(props: AboutCardProps) {
  const [isHovered, setIsHovered] = useState(false);
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
            position: 'relative',
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
      >
        <Stack
            padding={2}
        >
          <Box>
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
              <Grid item xs={4}>
                <img
                    src={props.imagePath}
                    alt={"Picture of " + props.name}
                    style={{
                      maxWidth: "100%",
                      borderRadius: "20%",
                    }}
                />
                {isHovered && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 124,
                      left: 700,
                      right: 32,
                      bottom: 20,
                      backgroundColor: 'rgba(0,0,0,0.2)',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '20%',
                    }}
                  >
                    <Typography variant="h6" sx={{ p: 2, textAlign: 'center' }}>
                      {props.quote}
                    </Typography>
                  </Box>
                )}
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Box>
    </>
  );
}

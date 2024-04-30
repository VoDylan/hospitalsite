import { Card, CardMedia, Box, Typography, Stack, CardActions, Link as MuiLink } from "@mui/material";

interface ServiceProps {
  servicePath: string;
  imagePath: string;
  title: string;
  description: string;
  buttonContent?: string | undefined | null;
}

export function ServiceCard(props: ServiceProps) {
  return (
    <CardActions style={{ marginTop: "auto", justifyContent: "center" }}>
      <MuiLink href={props.servicePath} underline="none">
        <Box
          component={Card}
          sx={{
            boxShadow: 3,
            display: "flex",
            width: "250px", // Set the width of each card
            height: "250px", // Set the height of each card
            transition: "0.3s",
            "&:hover": {
              filter: "brightness(95%)", // Darken the card slightly on hover
              "& .MuiCardMedia-img": {
                transition: "0.3s",
                filter: "brightness(95%)", // Darken the image on hover
              },
            },
          }}
        >
          <Box sx={{ position: "relative", display: "flex" }} >
            <Stack>
              <CardMedia
                component={"img"}
                image={props.imagePath}
                sx={{ width: "250px", height: "140px", display: "flex", marginBottom: "15px"}} // Ensure the image fills the entire card
              />
              <Typography
                gutterBottom variant="h5" component="div"
                sx={{
                  textAlign: "center",
                }}
              >
                {props.title}
              </Typography>
              <Typography
                variant="body2" color="text.secondary"
                sx={{
                  textAlign: "center",
                  marginLeft: "5%",
                  marginRight: "5%",
                  wordBreak: "break-word",
                }}
              >
                {props.description}
              </Typography>
            </Stack>
          </Box>
        </Box>
      </MuiLink>
    </CardActions>
  );
}

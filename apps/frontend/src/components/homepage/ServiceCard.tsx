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
    <Card
      sx={{
        boxShadow: 3,
        display: "flex",
        width: "250px", // Set the width of each card
        height: "310px", // Set the height of each card
        "&:hover": {
          color: "black",
        },
      }}
    >
      <Box sx={{ position: "relative", display: "flex" }} >
        <Stack>
          <CardMedia
            component={"img"}
            image={props.imagePath}
            sx={{ width: "250px", height: "190px", display: "flex", marginBottom: "15px"}} // Ensure the image fills the entire card
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
              marginBottom: "15px",
              marginLeft: "5%",
              marginRight: "5%",
            }}
          >
            {props.description}
                </Typography>
              </Stack>
            </Box>
          </Card>
        </MuiLink>
      </CardActions>
  );
}

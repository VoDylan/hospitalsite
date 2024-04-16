import { Card, CardMedia, Box, Typography, Stack, Button, CardActions, Link as MuiLink } from "@mui/material";

interface ServiceProps {
  servicePath: string;
  imagePath: string;
  title: string;
  description: string;
  buttonContent?: string | undefined | null;
}

export function ServiceCard(props: ServiceProps) {
  return (
    <Card
      sx={{
        boxShadow: 3,
        display: "flex",
        width: "fit-content", // Set the width of each card
        height: "fit-content", // Set the height of each card
        "&:hover": {
          color: "black",
        },
      }}
    >
      <Box sx={{ position: "relative", display: "flex" }}>
        <Stack>
          <CardMedia
            component={"img"}
            image={props.imagePath}
            sx={{ width: "350px", height: "310px", display: "flex", marginBottom: "15px"}} // Ensure the image fills the entire card
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
              marginBottom: "15px"
            }}
          >
            {props.description}
          </Typography>
          <CardActions style={{ marginTop: "auto", justifyContent: "center" }}>
            {props.buttonContent && ( // Render button only if buttonContent is provided
              <MuiLink href={props.servicePath} underline="none">
                <Button variant="contained" size="large" sx={{ width: "100%" }}>
                  {props.buttonContent}
                </Button>
              </MuiLink>
            )}
          </CardActions>
        </Stack>
      </Box>
    </Card>
  );
}

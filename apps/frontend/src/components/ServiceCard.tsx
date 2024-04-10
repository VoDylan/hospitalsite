import { Card, CardActionArea, CardMedia, Box } from "@mui/material";

interface ServiceProps {
  servicePath: string;
  imagePath: string;
}

export function ServiceCard(props: ServiceProps) {
  return (
    <Card
      sx={{
        boxShadow: 3,
        display: "flex",
        width: "90%", // Set the width of each card
        height: "25vh", // Set the height of each card
        "&:hover": {
          color: "black",
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardActionArea href={props.servicePath}>
          <CardMedia
            component={"img"}
            image={props.imagePath}
            sx={{ width: "100%", height: "100%" }} // Ensure the image fills the entire card
          />
        </CardActionArea>
      </Box>
    </Card>
  );
}

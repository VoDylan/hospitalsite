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
        width: "fit-content", // Set the width of each card
        height: "fit-content", // Set the height of each card
        "&:hover": {
          color: "black",
        },
      }}
    >
      <Box sx={{ position: "relative", display: "flex" }}>
        <CardActionArea href={props.servicePath}>
          <CardMedia
            component={"img"}
            image={props.imagePath}
            sx={{ width: "100%", height: "100%", display: "flex" }} // Ensure the image fills the entire card
          />
        </CardActionArea>
      </Box>
    </Card>
  );
}

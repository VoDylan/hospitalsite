import {
  Card,
  CardActionArea,
  CardMedia,
  Box,
  Typography,
} from "@mui/material";

interface ServiceProps {
  service: string;
  imagePath: string;
  imageAlt: string;
}

export function ServiceCard(props: ServiceProps) {
  return (
    <Card
      sx={{
        maxWidth: 360,
        maxHeight: 500,
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardActionArea>
          <CardMedia
            component={"img"}
            image={props.imagePath}
            alt={props.imageAlt}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "100%",
              bgcolor: "rgba(21, 57, 144, 0.50)",
              color: "white",
              padding: "10px",
            }}
          >
            <Typography variant="h5">{props.service}</Typography>
          </Box>
        </CardActionArea>
      </Box>
    </Card>
  );
}

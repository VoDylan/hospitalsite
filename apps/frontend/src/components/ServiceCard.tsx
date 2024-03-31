import {
  Card,
  CardActionArea,
  CardMedia,
  Box,
  Typography,
} from "@mui/material";

interface ServiceProps {
  service: string;
  servicePath: string;
  imagePath: string;
  imageAlt: string;
}

export function ServiceCard(props: ServiceProps) {
  return (
    <Card
      sx={{
        maxWidth: 360,
        minWidth: 360,
        maxHeight: 360,
        minHeight: 360,
        borderRadius: 10,
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
              display: "flex",
            }}
          >
            <Typography
              variant="h3"
              display={"flex"}
              alignItems={"center"}
              align={"center"}
            >
              {props.service}
            </Typography>
          </Box>
        </CardActionArea>
      </Box>
    </Card>
  );
}

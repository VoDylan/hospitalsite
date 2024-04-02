import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/material";

interface CardProps {
  image: string;
  title: string;
  description: string;
  buttonText: string;
  path: string;
  cardTitle: string;
  cardDescription: string;
}

export default function CustomCard({
  image,
  title,
  description,
  buttonText,
  path,
  cardTitle,
  cardDescription,
}: CardProps) {
  return (
    <Card sx={{ position: "relative", width: "100vw", height: "52vh" }}>
      <CardMedia
        sx={{ height: "60vh", position: "relative" }}
        image={image}
        title={title}
      >
        <Stack direction={"row"}>
          <Box
            sx={{
              color: "black",
              fontSize: 40,
              fontWeight: "bold",
              position: "absolute",
              width: 500,
              top: "20%",
              left: "8%",
            }}
          >
            {cardTitle}
          </Box>
          <Box
            sx={{
              color: "black",
              fontSize: 20,
              position: "absolute",
              width: 400,
              top: "43%",
              left: "8%",
            }}
          >
            {cardDescription}
          </Box>
          <Button
            sx={{ position: "absolute", width: 220, top: "60%", left: "8%" }}
            component={Link}
            to={path}
            variant="contained"
            color="primary"
          >
            {buttonText}
          </Button>
        </Stack>
      </CardMedia>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={path}>
          <Button variant="contained" size="large">
            {buttonText}
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}

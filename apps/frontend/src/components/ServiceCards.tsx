import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

interface CardProps {
  image: string;
  title: string;
  description: string;
  buttonText: string;
  path: string;
}

export default function ServiceCard({
  image,
  title,
  description,
  buttonText,
  path,
}: CardProps) {
  return (
    <Card sx={{ position: "relative", width: "100vw", height: "60vh" }}>
      <CardMedia
        sx={{ height: "25vh", position: "relative" }}
        image={image}
        title={title}
      ></CardMedia>
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
          <Button
            sx={{ position: "absolute", top: "85%" }}
            variant="contained"
            size="large"
          >
            {buttonText}
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}

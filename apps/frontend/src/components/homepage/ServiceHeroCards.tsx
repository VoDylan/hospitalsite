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

const ServiceCard: React.FC<CardProps> = ({
                                            image,
                                            title,
                                            description,
                                            buttonText,
                                            path,
                                          }: CardProps) => {
  return (
    <Card
      sx={{
        width: "250px", // Set desired width
        height: "350px", // Set desired height
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // Center content horizontally
      }}
    >
      <CardMedia
        sx={{ height: "60%", minWidth: "100%" }} // Adjust height and width of the media
        image={image}
        title={title}
      ></CardMedia>
      <CardContent style={{ backgroundColor: "white", textAlign: "center" }}>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions style={{ justifyContent: "center" }}>
        <Link to={path}>
          <Button variant="contained" size="large" sx={{ width: "100%" }}>
            {buttonText}
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default ServiceCard;


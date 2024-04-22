import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
import Stack from "@mui/material/Stack";
import {Box} from "@mui/material";


interface CardProps {
  image: string;
  title: string;
  description: string;
  buttonText: string;
  path: string;
  cardTitle: string;
  cardDescription: string;

}

export default function VideoCard({
  image,
  title,
  description,
  buttonText,
  path,
  cardTitle,
  cardDescription,

}: CardProps) {
  return (
    <Card sx={{position: "relative", width: "100vw", height: "65vh"}}>
      <CardMedia
        sx={{
          height: "70vh",
          position: "relative",
          backgroundPosition: "center 8%",
        }}
        component={'video'}
        image={image}
        title={title}
        autoPlay
      >
        <Stack
          direction={"row"}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            marginLeft: "8%",
            minHeight: "65vh",
          }}
        >
          <Box
            sx={{
              color: "#000000",
              fontSize: 40,
              position: "relative",
              marginTop: "6%",
              marginBottom: "0.75%",
              width: "26vw",
            }}
          >
            {cardTitle}
          </Box>
          <Box
            sx={{
              color: "#000000",
              fontSize: 20,
              fontWeight: "lighter",
              width: "26vw",
              whiteSpace: "nowrap",
            }}
          >
            {cardDescription}
          </Box>
          <Button
            sx={{
              position: "relative",
              marginTop: "2%",
              width: "auto",
              minWidth: "10vw",
              whiteSpace: "nowrap",
            }}
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

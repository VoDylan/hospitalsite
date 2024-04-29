import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/material";


interface CardProps {
  image: string;
  title: string;
  buttonText: string;
  path: string;
  cardTitle: string;
  cardDescription: string;
}

export default function CustomCard({
  image,
  title,
  buttonText,
  path,
  cardTitle,
  cardDescription,
}: CardProps) {
  return (
    <Card sx={{ position: "relative", width: "100vw", height: "65vh" }}>
      <CardMedia
        sx={{
          width:'100%',
          zIndex: 0,
          position: "relative",
          backgroundPosition: "center 8%",
        }}
        component={'video'}
        image={image}
        title={title}
        autoPlay
        loop
        muted

      >
      </CardMedia>

        <Stack
          direction={"row"}
          sx={{
            position: "absolute",
            top: 22,
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
    color: "#003A96",
    fontSize: 40,
    position: "relative",
    marginTop: "6%",
    marginBottom: "0.75%",
    width: "26vw",
    // borderRadius: '1rem',
    // backdropFilter: 'blur(10px)',
  }}>
          <Box
            sx={{
              color: "#003A96",
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
              color: "#003A96",
              fontSize: 20,
              fontWeight: "lighter",
              width: "26vw",
              whiteSpace: "nowrap",
            }}
          >
            {cardDescription}
          </Box>
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

{/*      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>*/}
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

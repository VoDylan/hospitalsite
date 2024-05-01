import React from "react";
import Card from "@mui/material/Card";
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
    <Card sx={{ position: "relative", width: "100vw", height: "62vh" }}>
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
          top: 0,
          left: '1%',
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
            marginTop: "12%",
            marginBottom: "0.75%",
            width: "26vw",
            borderRadius: '1rem',
            padding: "25px",
          }}>
          <Box sx={{ zIndex: 1, position: "relative"}}>
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
              marginTop: "4%",
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
                marginTop: "6%",
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
          </Box>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "white",
              opacity: "0.3",
              borderRadius: "1em",
              boxShadow: "0 0 2em 2em white",
            }}
          >

          </Box>


        </Box>
      </Stack>


    </Card>
  );
};

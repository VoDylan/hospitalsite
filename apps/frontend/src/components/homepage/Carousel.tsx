import React, { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import {IconButton, Button, styled, Typography } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import RateReviewSharpIcon from "@mui/icons-material/RateReviewSharp";
import InfoIcon from "@mui/icons-material/Info";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import CustomCard from "./Card.tsx"; // Update path to Card component
import ServiceCarousel from "./ServiceCarousel.tsx";
import { Link } from "react-router-dom";
import LowerLevel from "../../images/mapImages/00_thelowerlevel1.png";
import noLady from "../../images/noLady.jpg";

interface CardData {
  image: string;
  title: string;
  description: string;
  buttonText: string;
  path: string;
  cardTitle: string;
  cardDescription: string;
}

const Dot = styled("span")(({ theme }) => ({
  height: "10px",
  width: "10px",
  borderRadius: "50%",
  backgroundColor: theme.palette.primary.main,
  margin: "0 5px",
  cursor: "pointer",
}));

function MainCarousel() {
  const [cards, setCards] = useState<CardData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [autoScroll, setAutoScroll] = useState<boolean>(true);
  const [autoScrollTimeout, setAutoScrollTimeout] =
    useState<NodeJS.Timeout | null>(null);

  const handleNextPage = useCallback(() => {
    setCurrentPage((prevPage) => (prevPage + 1) % cards.length);
    setAutoScroll(false);
    clearTimeout(autoScrollTimeout as NodeJS.Timeout);
    const newTimeout = setTimeout(() => {
      setAutoScroll(true);
    }, 1500); // After 8 seconds, re-enable autoScroll
    setAutoScrollTimeout(newTimeout);
  }, [cards.length, autoScrollTimeout]);

  const handlePrevPage = useCallback(() => {
    setCurrentPage((prevPage) =>
      prevPage === 0 ? cards.length - 1 : prevPage - 1,
    );
    setAutoScroll(false);
    clearTimeout(autoScrollTimeout as NodeJS.Timeout);
    const newTimeout = setTimeout(() => {
      setAutoScroll(true);
    }, 1500); // After 8 seconds, re-enable autoScroll
    setAutoScrollTimeout(newTimeout);
  }, [cards.length, autoScrollTimeout]);

  useEffect(() => {
    const mainCards: CardData[] = [
      {
        image: LowerLevel,
        title: "Directions",
        description:
          "Graphical display for directions to anywhere in the hospital!",
        buttonText: "Go To Map!",
        path: "/Map",
        cardTitle: "Simplify Your Hospital Experience",
        cardDescription: "Graphical navigation to anywhere in the hospital",
      },
      {
        image: noLady,
        title: "Services",
        description: "Request a service!",
        buttonText: "Request a Service!",
        path: "/Services",
        cardTitle: "Streamline Your Service Requests",
        cardDescription: "Access all of our available services in one place",
      },
    ];

    setCards(mainCards);
    if (autoScroll) {
      const interval = setInterval(handleNextPage, 4500);
      return () => clearInterval(interval);
    }
  }, [handleNextPage, autoScroll]);

  return (
    <>
      {/*<TopBanner />*/}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column", // Change to column direction
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          height: "50vh",
          width: "100%",
        }}
      >
        {/*Cards*/}
        <Box sx={{ width: "100vw", height: "50vh", display: "flex" }}>
          {cards.map((card, index) => (
            <Box
              key={`card-${index}`}
              sx={{
                display: currentPage === index ? "block" : "none",
              }}
            >
              <Slide direction="left" in={currentPage === index}>
                <Stack
                  spacing={2}
                  direction="row"
                  alignContent="center"
                  justifyContent="center"
                  sx={{ width: "100%", height: "100%" }}
                >
                  <CustomCard
                    key={index}
                    image={card.image}
                    title={card.title}
                    description={card.description}
                    buttonText={card.buttonText}
                    path={card.path}
                    cardTitle={card.cardTitle}
                    cardDescription={card.cardDescription}
                  />
                </Stack>
              </Slide>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Navigation Buttons */}
      <Stack
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          marginTop: "4%",
          height: "220px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconButton onClick={handlePrevPage} sx={{ margin: 5 }}>
          <NavigateBeforeIcon />
        </IconButton>

        {[...Array(cards.length)].map((_, index) => (
          <Dot
            key={index}
            onClick={() => setCurrentPage(index)}
            style={{ opacity: currentPage === index ? 1 : 0.5 }}
          />
        ))}

        <IconButton
          onClick={handleNextPage}
          sx={{
            margin: 5,
          }}
        >
          <NavigateNextIcon />
        </IconButton>
      </Stack>


      {/*{Icons}*/}
      <Stack
        direction={"row"}
        display={"flex"}
        justifyContent={"center"}
        marginTop={'-4%'}
        marginBottom={'0.5%'}
      >

        <a
          href="/Credits"
        >
          <IconButton
            sx={{ color: "#186BD9" }}
            size="large"
            aria-label="Credits"
          >
            <RateReviewSharpIcon />
          </IconButton>
          <Button variant={"text"}>
            Credits
          </Button>
        </a>

        <a
          href="https://www.brighamandwomens.org/about-bwh"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconButton
            sx={{ color: "#186BD9" }}
            size="large"
            aria-label="About Brigham and Women's Hospital"
          >
            <InfoIcon />
          </IconButton>
          <Button variant={"text"}>About Us! (Real Link)</Button>
        </a>
      </Stack>

      <Box
        sx={{
          color: "#186BD9",
        opacity: "0.7",
        marginBottom: "2%"}}
        display={"flex"}
        justifyContent={"center"}>
        <Typography variant = "subtitle1"
        fontSize={"12px"}>
          This website is a term project exercise for WPI CS 3733 Software Engineering (Prof. Wong) and is not to be confused with the actual Brigham & Women’s Hospital website
        </Typography>
      </Box>

      {/*{Divider Bar}*/}
      <Box
        sx={{
          width: "100%",
          height: "8vh",
          backgroundColor: "#003A96",
          opacity: "90%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            color: "white",
            fontSize: 40,
            //textDecoration: "underline",
            marginLeft: "2%",
            fontStyle: "inherit",
            fontFamily: "sans-serif",
          }}
        >
          Services
        </Box>
      </Box>
      <ServiceCarousel />
      <Stack
        direction={"row"}
        sx={{
          display: "flex",
          alignContent: "center",
          justifyContent: "end",
          marginRight: "70px",
          marginBottom: "10px",
        }}
      >
        <Link to={"/Services"}>
          <Button variant="contained" size="large">
            See All {">"}
          </Button>
        </Link>
      </Stack>
    </>
  );
}

export default MainCarousel;

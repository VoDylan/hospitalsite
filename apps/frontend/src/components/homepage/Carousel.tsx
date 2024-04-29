import React, { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import {IconButton, styled } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import CustomCard from "./Card.tsx"; // Update path to Card component

import noLady from "../../videos/noLady.mp4";
import mapVideo from "../../videos/finaledit2.mp4";

interface CardData {
  image: string;
  title: string;

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

function Carousel() {
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
    }, 8); // After 8 seconds, re-enable autoScroll
    //1500 = 8 sec
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
        image: mapVideo,
        title: "Directions",
        buttonText: "Go To Map!",
        path: "/Map",
        cardTitle: "Simplify Your Hospital Experience",
        cardDescription: "Graphical navigation to anywhere in the hospital",
      },
      {
        image: noLady,
        title: "Services",
        buttonText: "Request a Service!",
        path: "/Services",
        cardTitle: "Streamline Your Service Requests",
        cardDescription: "Access all of our available services in one place",
      },
    ];



    setCards(mainCards);
    if (autoScroll) {
      const interval = setInterval(handleNextPage, 5500);
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
          height: "40vh",
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
          marginTop: "6%",
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
    </>
  );
}

export default Carousel;

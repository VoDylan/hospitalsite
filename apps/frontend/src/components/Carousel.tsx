import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { IconButton, Button } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import CustomCard from "../components/Card.tsx"; // Update path to Card component
import TopBanner from "../components/TopBanner.tsx";
import ServiceCarousel from "../components/ServiceCarousel.tsx";
import { Link } from "react-router-dom";

interface CardData {
  image: string;
  title: string;
  description: string;
  buttonText: string;
  path: string;
  cardTitle: string;
  cardDescription: string;
}

function Carousel() {
  const [cards, setCards] = useState<CardData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [slideDirection, setSlideDirection] = useState<
    "right" | "left" | undefined
  >("left");

  const mainCards: CardData[] = [
    {
      image: "../../public/00_thelowerlevel1.png",
      title: "Directions",
      description:
        "Graphical display for directions to anywhere in the hospital!",
      buttonText: "Go To Map!",
      path: "/Map",
      cardTitle: "Simplify Your Hospital Experience",
      cardDescription: "Graphical navigation to anywhere in the hospital",
    },
    {
      image: "../../public/noLady.jpg",
      title: "Services",
      description: "Request a service!",
      buttonText: "Request a Service!",
      path: "/Services",
      cardTitle: "Streamline Your Service Requests",
      cardDescription:
        "Access all of our available services in one place and get efficient responses",
    },
  ];

  const handleNextPage = () => {
    let nextPage = currentPage + 1;
    if (nextPage >= cards.length) {
      nextPage = 0; // Go back to the first slide if at the end
    }
    setSlideDirection("left");
    setCurrentPage(nextPage);
  };

  const handlePrevPage = () => {
    let prevPage = currentPage - 1;
    if (prevPage < 0) {
      prevPage = cards.length - 1; // Go to the last slide if at the beginning
    }
    setSlideDirection("right");
    setCurrentPage(prevPage);
  };

  useEffect(() => {
    setCards(mainCards);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TopBanner />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column", // Change to column direction
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          height: "90vh",
          width: "100%",
        }}
      >
        {/*Cards*/}
        <Box sx={{ width: "100vw", height: "45vh", display: "flex" }}>
          {cards.map((card, index) => (
            <Box
              key={`card-${index}`}
              sx={{
                display: currentPage === index ? "block" : "none",
              }}
            >
              <Slide direction={slideDirection} in={currentPage === index}>
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
          {/* Navigation Buttons */}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            marginTop: "35px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton onClick={handlePrevPage} sx={{ margin: 5 }}>
            <NavigateBeforeIcon />
          </IconButton>

          <IconButton
            onClick={handleNextPage}
            sx={{
              margin: 5,
            }}
          >
            <NavigateNextIcon />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          color: "black",
          fontSize: 40,
          fontWeight: "bold",
          width: 500,
          marginLeft: "70px",
          textDecoration: "underline",
        }}
      >
        Services
      </Box>
      <ServiceCarousel />
      <Stack
        direction={"row"}
        sx={{
          display: "flex",
          alignContent: "center",
          justifyContent: "end",
          marginRight: "70px",
          marginBottom: "50px",
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

export default Carousel;

import ServiceCards from "./ServiceHeroCards.tsx";
import Stack from "@mui/material/Stack";
import flower from "../images/Flower.jpg";
import bus from "../images/bus.jpg";
import priest from "../images/priest-last-rites.jpg";
import signL from "../images/language.webp";

interface secondaryCardData {
  image: string;
  title: string;
  description: string;
  buttonText: string;
  path: string;
}

function ServiceCarousel() {
  const secondaryCards: secondaryCardData[] = [
    {
      image: flower,
      title: "Flower Delivery",
      description: "Request flowers to be sent to a friend or loved one!",
      buttonText: "Get Flowers",
      path: "/Services/FlowerDelivery",
    },
    {
      image: bus,
      title: "Services",
      description: "Coming Soon!",
      buttonText: "Request Service",
      path: "/Services",
    },
    {
      image: priest,
      title: "Services",
      description: "Coming Soon!",
      buttonText: "Request Service",
      path: "/Services",
    },
    {
      image: signL,
      title: "Services",
      description: "Coming Soon!",
      buttonText: "Request Service",
      path: "/Services",
    },
  ];

  return (
    <>
      <Stack
        sx={{
          margin: "70px",
          marginBottom: "10px",
        }}
        direction={"row"}
        spacing={6}
        display={"flex"}
        alignContent={"center"}
        justifyContent={"center"}
      >
        {secondaryCards.map((card, index) => (
          <ServiceCards
            key={index}
            image={card.image}
            title={card.title}
            description={card.description}
            buttonText={card.buttonText}
            path={card.path}
          />
        ))}
      </Stack>
    </>
  );
}

export default ServiceCarousel;

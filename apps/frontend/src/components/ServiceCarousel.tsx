import ServiceCards from "./ServiceCards.tsx";
import Stack from "@mui/material/Stack";

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
      image: "../../public/Flower.jpg",
      title: "Flower Delivery",
      description: "Request flowers to be sent to a friend or loved one!",
      buttonText: "Get Flowers",
      path: "/Services/FlowerDelivery",
    },
    {
      image: "../../public/gray.jpg",
      title: "Services",
      description: "Coming Soon!",
      buttonText: "Request a Service!",
      path: "/Services",
    },
    {
      image: "../../public/gray.jpg",
      title: "Services",
      description: "Coming Soon!",
      buttonText: "Request a Service!",
      path: "/Services",
    },
    {
      image: "../../public/gray.jpg",
      title: "Services",
      description: "Coming Soon!",
      buttonText: "Request a Service!",
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
        spacing={4}
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

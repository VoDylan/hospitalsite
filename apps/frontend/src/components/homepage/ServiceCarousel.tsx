import ServiceCards from "./ServiceHeroCards.tsx";
import Stack from "@mui/material/Stack";
import flower from "../../images/servicePageImages/Flower.jpg";
import gift from "../../images/servicePageImages/giftBasket.jpg";
import medicine from "../../images/servicePageImages/medicineCard.jpg";
import signL from "../../images/language.webp";


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
      image: gift,
      title: "Gift Delivery",
      description: "Request for a gift to be sent to a friend or loved one!",
      buttonText: "Get Gift",
      path: "/Services/GiftDelivery",
    },
    {
      image: medicine,
      title: "Medicine Delivery",
      description: "Request for medicine to be delivered to you or a dependant",
      buttonText: "Get Medicine",
      path: "/Services/MedicineDelivery",
    },
    {
      image: signL,
      title: "Room Scheduling",
      description: "Schedule a room booking for yourself or a dependant!",
      buttonText: "Schedule Room",
      path: "/Services/RoomScheduling",
    },
  ];

  return (
    <>
      <Stack
        sx={{
          margin: "70px",
          marginBottom: "1%",
          marginTop: "2.5%",
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

import {Link, SpeedDial, SpeedDialAction, SpeedDialIcon} from "@mui/material";
import Flower from "../images/servicePageImages/FlowerDelivery.svg";
import Medicine from "../images/servicePageImages/MedicineDelivery.svg";
import Sanitation from "../images/servicePageImages/SanitationServices.svg";
import Security from "../images/servicePageImages/SecurityServices.svg";
import Gift from "../images/servicePageImages/GiftDelivery.svg";
import MedicalDevice from "../images/servicePageImages/MedicalDeviceDelivery.svg";
import Room from "../images/servicePageImages/RoomScheduling.svg";

export default function ServicesPage() {

  const linkIcon = (href: string, children: string) => <Link href={href}>{children}</Link>;

  // Define service paths and images
  const serviceData = [
    // { name: "Flower Delivery", path: "/Services/FlowerDelivery", image: Flower },
    // { name: "Gift Delivery", path: "/Services/GiftDelivery", image: Gift },
    // { name: "Medicine Delivery", path: "/Services/MedicineDelivery", image: Medicine },
    // { name: "Medical Devices", path: "/Services/DeviceDeliveryService", image: MedicalDevice },
    // { name: "Sanitation Request", path: "/Services/SanitationService", image: Sanitation },
    // { name: "Security Request", path: "/Services/SecurityService", image: Security },
    // { name: "Room Scheduling", path: "/Services/RoomScheduling", image: Room },
    { name: "Flower Delivery", icon: linkIcon("/Services/FlowerDelivery", Flower)},
    { name: "Gift Delivery", icon: linkIcon("/Services/GiftDelivery", Gift)},
    { name: "Medicine Delivery", icon: linkIcon("/Services/MedicineDelivery", Medicine)},
    { name: "Medical Devices", icon: linkIcon("/Services/DeviceDeliveryService", MedicalDevice)},
    { name: "Sanitation Request", icon: linkIcon("/Services/SanitationService", Sanitation)},
    { name: "Security Request", icon: linkIcon("/Services/SecurityService", Security)},
    { name: "Room Scheduling", icon: linkIcon("/Services/RoomScheduling", Room)},
  ];

  return (
    <>
      <SpeedDial
        ariaLabel={"Services Speed Dial"}
        icon={<SpeedDialIcon/>}
      >
        {serviceData.map((service) => (
          <SpeedDialAction
            key={service.name}
            icon={service.icon}
            tooltipTitle={service.name}
          />
        ))}
      </SpeedDial>
    </>
  );
}

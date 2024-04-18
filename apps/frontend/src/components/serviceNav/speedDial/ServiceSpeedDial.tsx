import {
  Link,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  SpeedDialProps,
  styled,
} from "@mui/material";
import {
  LocalFloristOutlined,
  CardGiftcardOutlined,
  MedicationOutlined,
  TroubleshootOutlined,
  CleanHandsOutlined,
  HealthAndSafetyOutlined,
  CalendarMonthOutlined,
} from "@mui/icons-material";
import { JSX } from "react/jsx-runtime";
import React from "react";

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: "absolute",
  "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
    top: theme.spacing(15),
    left: theme.spacing(50),
  },
}));

export default function ServiceSpeedDial() {
  const linkIcon = (href: string, children: JSX.Element) => (
    <Link href={href}>{children}</Link>
  );

  // Define service paths and images
  const serviceData = [
    {
      name: "Flower Delivery",
      icon: linkIcon("/Services/FlowerDelivery", <LocalFloristOutlined />),
    },
    {
      name: "Gift Delivery",
      icon: linkIcon("/Services/GiftDelivery", <CardGiftcardOutlined />),
    },
    {
      name: "Medicine Delivery",
      icon: linkIcon("/Services/MedicineDelivery", <MedicationOutlined />),
    },
    {
      name: "Medical Devices",
      icon: linkIcon(
        "/Services/DeviceDeliveryService",
        <TroubleshootOutlined />,
      ),
    },
    {
      name: "Sanitation Request",
      icon: linkIcon("/Services/SanitationService", <CleanHandsOutlined />),
    },
    {
      name: "Security Request",
      icon: linkIcon("/Services/SecurityService", <HealthAndSafetyOutlined />),
    },
    {
      name: "Room Scheduling",
      icon: linkIcon("/Services/RoomScheduling", <CalendarMonthOutlined />),
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [direction, setDirection] =
    React.useState<SpeedDialProps["direction"]>("right");

  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  return (
    <>
      <StyledSpeedDial
        ariaLabel={"Services Speed Dial"}
        // sx={{ position: 'absolute', bottom: 300 }}
        icon={<SpeedDialIcon />}
        onClick={handleClick}
        open={open}
        direction={direction}
      >
        {serviceData.map((service) => (
          <SpeedDialAction
            key={service.name}
            icon={service.icon}
            tooltipTitle={service.name}
          />
        ))}
      </StyledSpeedDial>
    </>
  );
}

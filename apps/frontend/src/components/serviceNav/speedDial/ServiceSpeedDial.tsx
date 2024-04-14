import {Link, SpeedDial, SpeedDialAction, SpeedDialIcon} from "@mui/material";
import {LocalFloristOutlined, CardGiftcardOutlined, MedicationOutlined, TroubleshootOutlined,
        CleanHandsOutlined, HealthAndSafetyOutlined, CalendarMonthOutlined} from '@mui/icons-material';
import { JSX } from "react/jsx-runtime";
import React from "react";

export default function ServiceSpeedDial() {
  const linkIcon = (href: string, children: JSX.Element) => <Link href={href}>{children}</Link>;

  // Define service paths and images
  const serviceData = [
    { name: "Flower Delivery", icon: linkIcon("/Services/FlowerDelivery", <LocalFloristOutlined/>)},
    { name: "Gift Delivery", icon: linkIcon("/Services/GiftDelivery", <CardGiftcardOutlined/>)},
    { name: "Medicine Delivery", icon: linkIcon("/Services/MedicineDelivery", <MedicationOutlined/>)},
    { name: "Medical Devices", icon: linkIcon("/Services/DeviceDeliveryService", <TroubleshootOutlined/>)},
    { name: "Sanitation Request", icon: linkIcon("/Services/SanitationService", <CleanHandsOutlined/>)},
    { name: "Security Request", icon: linkIcon("/Services/SecurityService", <HealthAndSafetyOutlined/>)},
    { name: "Room Scheduling", icon: linkIcon("/Services/RoomScheduling", <CalendarMonthOutlined/>)},
  ];

  const [open, setOpen] = React.useState(false);
  const handleClick = () =>
    {if(open) {
      setOpen(false);
    } else {
      setOpen(true);
    }};

  return (
    <>
      <SpeedDial
        ariaLabel={"Services Speed Dial"}
        sx={{ position: 'fixed', bottom: 50, right: 150 }}
        icon={<SpeedDialIcon/>}
        onClick={handleClick}
        open={open}
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

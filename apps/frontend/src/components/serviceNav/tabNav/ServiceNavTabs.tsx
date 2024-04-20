import * as React from "react";
import Tab from "@mui/material/Tab";
import { Box, Tabs } from "@mui/material";
import { Link, matchPath, useLocation } from "react-router-dom";

import {
  LocalFloristOutlined,
  CardGiftcardOutlined,
  MedicationOutlined,
  TroubleshootOutlined,
  CleanHandsOutlined,
  HealthAndSafetyOutlined,
  CalendarMonthOutlined,
  EventAvailableOutlined,
} from "@mui/icons-material";

function useRouteMatch(patterns: string[]) {
  const { pathname } = useLocation();

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }
  return null;
}

export default function ServiceNavTabs() {
  const routeMatch = useRouteMatch([
    "Services/FlowerDelivery",
    "Services/MedicineDelivery",
    "Services/GiftDelivery",
    "Services/RoomScheduling",
    "Services/SanitationService",
    "Services/SecurityService",
    "Services/DeviceDeliveryService",
    "Services/Calendar",
  ]);
  const currentTab = routeMatch?.pattern?.path;
  return (
    <>
      <Box
        sx={{
          width: "100%",
          opacity: "80%",
          backgroundColor: "lightgray",
          borderRadius: 5,
        }}
      >
        <Tabs
          value={currentTab}
          aria-label={"Service Navigation Tabs"}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
        >
          <Tab
            component={Link}
            label="Flowers"
            icon={<LocalFloristOutlined />}
            value="Services/FlowerDelivery"
            to="/Services/FlowerDelivery"
          />
          <Tab
            component={Link}
            label="Gifts"
            icon={<CardGiftcardOutlined />}
            value="Services/GiftDelivery"
            to="/Services/GiftDelivery"
          />
          <Tab
            component={Link}
            label="Medicine"
            icon={<MedicationOutlined />}
            value="Services/MedicineDelivery"
            to="/Services/MedicineDelivery"
          />
          <Tab
            component={Link}
            label="Scheduling"
            icon={<CalendarMonthOutlined />}
            value="Services/RoomScheduling"
            to="/Services/RoomScheduling"
          />
          <Tab
            component={Link}
            label="Sanitation"
            icon={<CleanHandsOutlined />}
            value="Services/SanitationService"
            to="/Services/SanitationService"
          />
          <Tab
            component={Link}
            label="Security"
            icon={<HealthAndSafetyOutlined />}
            value="Services/SecurityService"
            to="/Services/SecurityService"
          />
          <Tab
            component={Link}
            label="Med Device"
            icon={<TroubleshootOutlined />}
            value="Services/DeviceDeliveryService"
            to="/Services/DeviceDeliveryService"
          />
          <Tab
            component={Link}
            label="Appointment"
            icon={<EventAvailableOutlined />}
            value="Services/Calendar"
            to="/Services/Calendar"
          />
        </Tabs>
      </Box>
    </>
  );
}

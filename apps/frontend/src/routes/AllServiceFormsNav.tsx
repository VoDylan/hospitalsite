// import FlowerDeliveryService from "./FlowerDeliveryService.tsx";
// import SanitationService from "./SanitationService.tsx";
// import DeviceDeliveryService from "./DeviceDeliveryService.tsx";
// import GiftDeliveryService from "./GiftDeliveryService.tsx";
// import SecurityService from "./SecurityService.tsx";
// import MedicineDelivery from "./MedicineDelivery.tsx";
// import RoomScheduling from "./RoomScheduling.tsx";

import * as React from 'react';
// import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import {Box, Tabs} from "@mui/material";
import {Link, matchPath, useLocation} from 'react-router-dom';

function samePageLinkNavigation(
  event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
) {
  return !(event.defaultPrevented ||
    event.button !== 0 || // ignore everything but left-click
    event.metaKey ||
    event.ctrlKey ||
    event.altKey ||
    event.shiftKey);
}

interface LinkTabProps {
  label?: string,
  href?: string,
  selected?: boolean,
  Link: React.ElementType
}

function LinkTab(props: LinkTabProps) {
  return (
    <Tab
      component={props.Link}
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        // Routing libraries handle this, you can remove the onClick handle when using them.
        if (samePageLinkNavigation(event)) {
          event.preventDefault();
        }
      }}
      aria-current={props.selected && 'page'}
      {...props}
    />
  );
}

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

export default function AllServiceFormsNav() {
  const routeMatch = useRouteMatch(['Services/FlowerDelivery', 'Services/MedicineDelivery', 'Services/GiftDelivery']);
  const currentTab = routeMatch?.pattern?.path;
  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Tabs
          value={currentTab}
          aria-label={"Service Navigation Tabs"}
          centered
        >
          <Tab component={Link} label="Flowers" value="Services/FlowerDelivery" to="/Services/FlowerDelivery" />
          <Tab component={Link} label="Gifts" value="Services/GiftDelivery" to="/Services/GiftDelivery" />
          <Tab component={Link} label="Medicine" value="Services/MedicineDelivery" to="/Services/MedicineDelivery" />
        </Tabs>
      </Box>
    </>
  );
}

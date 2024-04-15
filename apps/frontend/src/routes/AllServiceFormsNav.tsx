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
import { Link } from 'react-router-dom';

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

export default function AllServiceFormsNav() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    // event.type can be equal to focus with selectionFollowsFocus.
    if (
      event.type !== 'click' ||
      (event.type === 'click' &&
        samePageLinkNavigation(
          event as React.MouseEvent<HTMLAnchorElement, MouseEvent>,
        ))
    ) {
      setValue(newValue);
    }
  };

  return (
    <>
      {/*<Box sx={{ width: '100%', typography: 'body1' }}>*/}
      {/*  <TabContext value={value}>*/}
      {/*    <Box sx={{ borderBottom: 1, borderColor: 'divider',backgroundColor:"lightgray", opacity: "0.5", width: "30%" }}>*/}
      {/*      <TabList onChange={handleChange} aria-label="lab API tabs example">*/}
      {/*        <Tab label="Item One" value="1" />*/}
      {/*        <Tab label="Item Two" value="2" />*/}
      {/*        <Tab label="Item Three" value="3" />*/}
      {/*      </TabList>*/}
      {/*    </Box>*/}
      {/*    <TabPanel value="1"><FlowerDeliveryService/></TabPanel>*/}
      {/*    <TabPanel value="2"><GiftDeliveryService/></TabPanel>*/}
      {/*    <TabPanel value="3"><MedicineDelivery/></TabPanel>*/}
      {/*  </TabContext>*/}
      {/*</Box>*/}
      <Box sx={{ width: '100%' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Services Navigation Tabs"
          role="navigation"
        >
          <Tab component={Link} label="Flowers" to="/Services/FlowerDelivery" />
          <Tab component={Link} label="Gifts" to="/Services/GiftDelivery" />
          <Tab component={Link} label="Medicine" to="/Services/MedicineDelivery" />
        </Tabs>
      </Box>
    </>
  );
}

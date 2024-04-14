import FlowerDeliveryService from "./FlowerDeliveryService.tsx";
// import SanitationService from "./SanitationService.tsx";
// import DeviceDeliveryService from "./DeviceDeliveryService.tsx";
import GiftDeliveryService from "./GiftDeliveryService.tsx";
// import SecurityService from "./SecurityService.tsx";
import MedicineDelivery from "./MedicineDelivery.tsx";
// import RoomScheduling from "./RoomScheduling.tsx";

import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

export default function AllServiceFormsNav() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <Box>Hi</Box>
      <Box>Hi</Box>
      <Box>Hi</Box>
      <Box>Hi</Box>
      <Box>Hi</Box>
      <Box>Hi</Box>
      <Box>Hi</Box>
      <Box>Hi</Box>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Item One" value="1" />
              <Tab label="Item Two" value="2" />
              <Tab label="Item Three" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1"><FlowerDeliveryService/></TabPanel>
          <TabPanel value="2"><GiftDeliveryService/></TabPanel>
          <TabPanel value="3"><MedicineDelivery/></TabPanel>
        </TabContext>
      </Box>
    </>
  );
}

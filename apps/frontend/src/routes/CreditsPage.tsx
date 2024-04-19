import {AccordionDetails, AccordionSummary, AppBar, Box, Tabs, Typography} from "@mui/material";
import {useState} from "react";
import Tab from "@mui/material/Tab";
import Accordion from "@mui/material/Accordion";

export default function CreditsPage() {
const [tabValue, setTabValue] = useState(0);
const handleChange = (event: React.ChangeEvent<object>, newValue: number) => {
  setTabValue(newValue);
};

return (
  <>
    <Box
      sx={{
        mt: 15,
        backgroundColor: "#ffffff",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#003A96",
          position: "relative",
          height: "3.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: "90%",
        }}
      >
        <Typography variant={"h1"} color={"white"} fontSize={46}>
          Credits
        </Typography>
      </Box>

      <AppBar position="static" color="default">
        <Tabs
          value={tabValue}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="Credits Tabs"
        >
          <Tab label="Libraries" />
          <Tab label="Tools" />
          <Tab label="Frameworks" />
        </Tabs>
      </AppBar>

      <Box hidden={tabValue !== 0}>
        <Accordion>
          <AccordionSummary>
            <Typography>Library 1</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Details about Library 1</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary>
            <Typography>Library 2</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Details about Library 2</Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
      <Box hidden={tabValue !== 1}>
        <Typography variant="body1">
          Content for Tools tab
        </Typography>
      </Box>
      <Box hidden={tabValue !== 2}>
        <Typography variant="body1">
          Content for Frameworks tab
        </Typography>
      </Box>
    </Box>
  </>
);
}

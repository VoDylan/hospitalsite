import {AccordionDetails, AccordionSummary, AppBar, Box, Tabs, Typography} from "@mui/material";
import {useState} from "react";
import Tab from "@mui/material/Tab";
import Accordion from "@mui/material/Accordion";

export default function CreditsPage() {
const [tabValue, setTabValue] = useState(0);
const [expandedAccordion, setExpandedAccordion] = useState<string | false>(false);
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
          Software Credits
        </Typography>
      </Box>

      <AppBar position="static" color="default"
      sx={{marginBottom:"2%"}}
      >
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

      <Box hidden={tabValue !== 0}
           sx={{
             marginLeft:"15%",
             marginRight:"15%",
           }}
      >
        <Accordion>
          <AccordionSummary
            sx={{
              background:'#3884d4',
            }}
          >
            <Typography
              fontSize={24}
              align="center"
              sx={{
                width:"100%",
                color:"#ffffff",
                variant:"h2",
              }}
            >
              Material UI
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Details about Library 2</Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
      <Box hidden={tabValue !== 1}
           sx={{
             marginLeft:"15%",
             marginRight:"15%",
           }}
      >
        <Accordion>
          <AccordionSummary
            sx={{
              background:'#3884d4',
            }}
          >
            <Typography
              align="center"
              fontSize={24}
              sx={{
                width:"100%",
                color:"#ffffff",
                variant:"h2",
              }}
            >
              Github
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Hello
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            sx={{
              background:'#3884d4',
            }}
          >
            <Typography
              fontSize={24}
              align="center"
              sx={{
                width:"100%",
                color:"#ffffff",
                variant:"h2",
              }}
            >
              Taiga
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Details about Library 2</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            sx={{
              background:'#3884d4',
            }}
          >
            <Typography
              fontSize={24}
              align="center"
              sx={{
                width:"100%",
                color:"#ffffff",
                variant:"h2",
              }}
            >
              Figma
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Details about Library 2</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            sx={{
              background:'#3884d4',
            }}
          >
            <Typography
              fontSize={24}
              align="center"
              sx={{
                width:"100%",
                color:"#ffffff",
                variant:"h2",
              }}
            >
              Auth0
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Details about Library 2</Typography>
          </AccordionDetails>
        </Accordion>
      </Box>

      <Box hidden={tabValue !== 2}
           sx={{
             marginLeft:"15%",
             marginRight:"15%",
           }}
      >
        <Accordion>
          <AccordionSummary
            sx={{
              background:'#3884d4',
            }}
          >
            <Typography
              align="center"
              fontSize={24}
              sx={{
                width:"100%",
                color:"#ffffff",
                variant:"h2",
              }}
            >
              React
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Hello
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>

    </Box>
  </>
);
}

import {AccordionDetails, AccordionSummary, AppBar, Box, Tabs, Typography} from "@mui/material";
import {useState} from "react";
import Tab from "@mui/material/Tab";
import Accordion from "@mui/material/Accordion";
import Auth0 from "../images/creditImages/Auth0-logo.png";
import Figma from "../images/creditImages/figma-logo.png";
import Github from "../images/creditImages/GitHub-logo.png";
import MaterialUI from "../images/creditImages/material-ui-logo.png";
import ReactImg from "../images/creditImages/react-logo.png";
import Taiga from "../images/creditImages/taiga-logo.png";
import Webstorm from "../images/creditImages/webstorm-logo1.png";

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
             marginLeft:"7.5%",
             marginRight:"7.5%",
           }}
      >
        <Accordion>
          <AccordionSummary
            sx={{
              background:'#3884d4',
              border: '1px solid #003A96',
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
            <div style={{display: 'flex', alignItems: 'center'}}>
              <a href="https://material-ui.com/" target="_blank" rel="noopener noreferrer">
                <img src={MaterialUI} alt="Material UI logo" style={{width: 450, height: 220}}/>
              </a>
              <p style={{marginLeft: '20px'}}>
                Material UI is an incredibly useful library that builds upon existing React components.
                It allowed for us to generate a unique design for the website, incorporating features such as
                the carousel on our home page, a variety of menus and buttons, and even the accordion these
                credits are in.
              </p>
            </div>
          </AccordionDetails>
        </Accordion>
      </Box>
      <Box hidden={tabValue !== 1}
           sx={{
             marginLeft: "7.5%",
             marginRight: "7.5%",
           }}
      >
        <Accordion>
          <AccordionSummary
            sx={{
              background: '#3884d4',
              border: '1px solid #003A96',
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
            <div style={{display: 'flex', alignItems: 'center'}}>
              <a href="https://material-ui.com/" target="_blank" rel="noopener noreferrer">
                <img src={Github} alt="Github logo" style={{width: 450, height: 200}}/>
              </a>
              <p style={{marginLeft: '20px'}}>
                Material UI is an incredibly useful library that builds upon existing React components.
                It allowed for us to generate a unique design for the website, incorporating features such as
                the carousel on our home page, a variety of menus and buttons, and even the accordion these
                credits are in.
              </p>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            sx={{
              background: '#3884d4',
              border: '1px solid #003A96',
            }}
          >
            <Typography
              fontSize={24}
              align="center"
              sx={{
                width: "100%",
                color: "#ffffff",
                variant: "h2",
              }}
            >
              Taiga
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <a href="https://material-ui.com/" target="_blank" rel="noopener noreferrer">
                <img src={Taiga} alt="Taiga logo" style={{width: 450, height: 200}}/>
              </a>
              <p style={{marginLeft: '20px'}}>
                Material UI is an incredibly useful library that builds upon existing React components.
                It allowed for us to generate a unique design for the website, incorporating features such as
                the carousel on our home page, a variety of menus and buttons, and even the accordion these
                credits are in.
              </p>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            sx={{
              background: '#3884d4',
              border: '1px solid #003A96',
            }}
          >
            <Typography
              fontSize={24}
              align="center"
              sx={{
                width: "100%",
                color: "#ffffff",
                variant: "h2",
              }}
            >
              Figma
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <a href="https://material-ui.com/" target="_blank" rel="noopener noreferrer">
                <img src={Figma} alt="Figma logo" style={{width: 450, height: 200}}/>
              </a>
              <p style={{marginLeft: '20px'}}>
                Material UI is an incredibly useful library that builds upon existing React components.
                It allowed for us to generate a unique design for the website, incorporating features such as
                the carousel on our home page, a variety of menus and buttons, and even the accordion these
                credits are in.
              </p>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            sx={{
              background: '#3884d4',
              border: '1px solid #003A96',
            }}
          >
            <Typography
              fontSize={24}
              align="center"
              sx={{
                width: "100%",
                color: "#ffffff",
                variant: "h2",
              }}
            >
              Auth0
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <a href="https://material-ui.com/" target="_blank" rel="noopener noreferrer">
                <img src={Auth0} alt="Auth0 logo" style={{width: 450, height: 150}}/>
              </a>
              <p style={{marginLeft: '20px'}}>
                Material UI is an incredibly useful library that builds upon existing React components.
                It allowed for us to generate a unique design for the website, incorporating features such as
                the carousel on our home page, a variety of menus and buttons, and even the accordion these
                credits are in.
              </p>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            sx={{
              background: '#3884d4',
              border: '1px solid #003A96',
            }}
          >
            <Typography
              fontSize={24}
              align="center"
              sx={{
                width: "100%",
                color: "#ffffff",
                variant: "h2",
              }}
            >
              Webstorm
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <a href="https://material-ui.com/" target="_blank" rel="noopener noreferrer">
                <img src={Webstorm} alt="Webstorm logo" style={{width: 450, height: 200}}/>
              </a>
              <p style={{marginLeft: '20px'}}>
                Material UI is an incredibly useful library that builds upon existing React components.
                It allowed for us to generate a unique design for the website, incorporating features such as
                the carousel on our home page, a variety of menus and buttons, and even the accordion these
                credits are in.
              </p>
            </div>
          </AccordionDetails>
        </Accordion>
      </Box>
      <Box hidden={tabValue !== 2}
           sx={{
             marginLeft: "7.5%",
             marginRight: "7.5%",
           }}
      >
        <Accordion>
          <AccordionSummary
            sx={{
              background: '#3884d4',
              border: '1px solid #003A96',
            }}
          >
            <Typography
              align="center"
              fontSize={24}
              sx={{
                width: "100%",
                color: "#ffffff",
                variant: "h2",
              }}
            >
              React
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <a href="https://material-ui.com/" target="_blank" rel="noopener noreferrer">
                <img src={ReactImg} alt="React logo" style={{width: 450, height: 150}}/>
              </a>
              <p style={{marginLeft: '20px'}}>
                Material UI is an incredibly useful library that builds upon existing React components.
                It allowed for us to generate a unique design for the website, incorporating features such as
                the carousel on our home page, a variety of menus and buttons, and even the accordion these
                credits are in.
              </p>
            </div>
          </AccordionDetails>
        </Accordion>
      </Box>

    </Box>
  </>
);
}

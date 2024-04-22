import {AccordionDetails, AccordionSummary, AppBar, Box, Tabs, Typography} from "@mui/material";
import {useState} from "react";
import Tab from "@mui/material/Tab";
import Accordion from "@mui/material/Accordion";
import Auth0 from "../images/creditImages/Auth0-logo.png";
import Figma from "../images/creditImages/figma-logo.png";
import Github from "../images/creditImages/GitHub-logo.png";
import MaterialUI from "../images/creditImages/material-ui-logo-removebg-preview.png";
import ReactImg from "../images/creditImages/react-logo-removebg-preview.png";
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
          <AccordionDetails
            sx={{
              "&:hover": {
                backgroundColor: "#eee", // Darken on hover
              },
            }}
          >
            <a href="https://material-ui.com/" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", textDecoration: "none", color: "inherit" }}>
              <img src={MaterialUI} alt="Material UI logo" style={{ width: 400, height: 200}} />
              <div>
                <Typography variant="body1"
                  sx={{marginLeft: '20px'}}
                >
                  Material UI is an incredibly useful library that builds upon existing React components.
                  It allowed for us to generate a unique design for the website, incorporating features such as the carousel
                  on our home page, a variety of menus and buttons, and even the accordion these credits are in.
                </Typography>
              </div>
            </a>
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
          <AccordionDetails
            sx={{
              "&:hover": {
                backgroundColor: "#eee", // Darken on hover
              },
            }}
          >
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", textDecoration: "none", color: "inherit" }}>
              <img src={Github} alt="Github logo" style={{ width: 400, height: 200}} />
              <div>
                <Typography variant="body1"
                            sx={{marginLeft: '20px'}}
                >
                  Github is an integral software tool that is used for code repository management.
                  Our team utilized Github for essentially everything involving the code. This included
                  storing our main branch, creating new
                  branches, pushing code, pulling code, and reviewing one another's work.

                </Typography>
              </div>
            </a>
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
          <AccordionDetails
            sx={{
              "&:hover": {
                backgroundColor: "#eee", // Darken on hover
              },
            }}
          >
            <a href="https://taiga.io/" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", textDecoration: "none", color: "inherit" }}>
              <img src={Taiga} alt="Taiga logo" style={{ width: 370, height: 150}} />
              <div>
                <Typography variant="body1"
                            sx={{marginLeft: '20px'}}
                >
                  Taiga is a project management platform that allowed for us to streamline the production
                  of the website. It is very helpful with creating and assigning tasks/user stories,
                  tracking tasks of each team member, and tracking the progress of the team as a whole.
                </Typography>
              </div>
            </a>
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
          <AccordionDetails
            sx={{
              "&:hover": {
                backgroundColor: "#eee", // Darken on hover
              },
            }}
          >
            <a href="https://www.figma.com/" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", textDecoration: "none", color: "inherit" }}>
              <img src={Figma} alt="Figma logo" style={{ width: 400, height: 175}} />
              <div>
                <Typography variant="body1"
                            sx={{marginLeft: '20px'}}
                >
                  Figma is a very useful software tool that allows for the user to generate potential website designs.
                  Our team utilized Figma in order to brainstorm front end design choices and organize our themes/styles.
                </Typography>
              </div>
            </a>
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
          <AccordionDetails
            sx={{
              "&:hover": {
                backgroundColor: "#eee", // Darken on hover
              },
            }}
          >
            <a href="https://auth0.com/" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", textDecoration: "none", color: "inherit" }}>
              <img src={Auth0} alt="Auth0 logo" style={{ width: 350, height: 120}} />
              <div>
                <Typography variant="body1"
                            sx={{marginLeft: '20px'}}
                >
                  Auth0 is a third party tool that can be implemented in order to track sign-ins to a website.
                  We utilized Auth0 within our website in order to lock out certain features such as the database
                  until a proper log-in is given.
                </Typography>
              </div>
            </a>
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
          <AccordionDetails
            sx={{
              "&:hover": {
                backgroundColor: "#eee", // Darken on hover
              },
            }}
          >
            <a href="https://www.jetbrains.com/webstorm/" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", textDecoration: "none", color: "inherit" }}>
              <img src={Webstorm} alt="Webstorm logo" style={{ width: 350, height: 150}} />
              <div>
                <Typography variant="body1"
                            sx={{marginLeft: '20px'}}
                >
                  Webstorm is a Jetbrains IDE that specializes in javascript and typescript development. Webstorm was incredibly
                  helpful towards our team building this website, as it provided intuitive Git integration on top of a plethora
                  of beneficial quality of life features.
                </Typography>
              </div>
            </a>
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
          <AccordionDetails
            sx={{
              "&:hover": {
                backgroundColor: "#eee", // Darken on hover
              },
            }}
          >
            <a href="https://react.dev/" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", textDecoration: "none", color: "inherit" }}>
              <img src={ReactImg} alt="React logo" style={{ width: 360, height: 125}} />
              <div>
                <Typography variant="body1"
                            sx={{marginLeft: '20px'}}
                >
                  The React framework is the foundation that this website utilizes in order to run. This framework allowed for
                  us to use the Material UI library, and the convenient styling features it brought.
                </Typography>
              </div>
            </a>
          </AccordionDetails>
        </Accordion>
      </Box>

    </Box>
  </>
);
}

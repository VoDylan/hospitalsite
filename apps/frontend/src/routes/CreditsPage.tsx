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
import Prisma from "../images/creditImages/prisma-logo.png";
import AWS from "../images/creditImages/aws-logo.png";
import Postgres from "../images/creditImages/PostgreSQL-Logo.png";
import Threado from "../images/creditImages/threado-logo-removebg-preview.png";

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
        marginBottom: "30px",
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
        <Typography variant={"h1"} color={"white"} fontSize={40}>
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
              PostgreSQL
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              "&:hover": {
                backgroundColor: "#eee", // Darken on hover
              },
            }}
          >
            <a href="https://www.postgresql.org/" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", textDecoration: "none", color: "inherit" }}>
              <img src={Postgres} alt="PostgreSQL logo" style={{ width: 350, height: 150}} />
              <div>
                <Typography variant="body1"
                            sx={{marginLeft: '20px'}}
                >
                  PostgreSQL is a database management system that allowed us to efficiently manage a large amount of data
                  while maintaining a high performance throughout the website.
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
              Prisma
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              "&:hover": {
                backgroundColor: "#eee", // Darken on hover
              },
            }}
          >
            <a href="https://www.prisma.io/" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", textDecoration: "none", color: "inherit" }}>
              <img src={Prisma} alt="Prisma logo" style={{ width: 350, height: 150}} />
              <div>
                <Typography variant="body1"
                            sx={{marginLeft: '20px'}}
                >
                  Prisma is a database toolkit that was essential for our team to be able to access the database
                  in an efficient and intuitive manner. Through its Object-Relational-Mapping (ORM) layer, complexities are
                  abstracted away and we are able to simply focus on writing application logic.
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
              Amazon Web Services
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              "&:hover": {
                backgroundColor: "#eee", // Darken on hover
              },
            }}
          >
            <a href="https://aws.amazon.com/free/?gclid=Cj0KCQjwlZixBhCoARIsAIC745Ck2OTksov4JZKGPGTjPfA4lPvBzz-7
            JxmmXT8NMcyeJREaX2AOt5kaAn3yEALw_wcB&trk=6a4c3e9d-cdc9-4e25-8dd9-2bd8d15afbca&sc_channel=ps&ef_id=Cj0
            KCQjwlZixBhCoARIsAIC745Ck2OTksov4JZKGPGTjPfA4lPvBzz-7JxmmXT8NMcyeJREaX2AOt5kaAn3yEALw_wcB:G:s&s_kwcid
            =AL!4422!3!651751059777!e!!g!!amazon%20web%20services!19852662197!145019195737&all-free-tier.sort-by=
            item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsf.Free%20Tier%20Types=*all&awsf.Free%20
            Tier%20Categories=*all" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", textDecoration: "none", color: "inherit" }}>
              <img src={AWS} alt="AWS logo" style={{ width: 350, height: 150}} />
              <div>
                <Typography variant="body1"
                            sx={{marginLeft: '20px'}}
                >
                  Amazon Web Services (AWS) acted as our server provider for the duration of the creation of this website.
                  This allows us to extend beyond utilizing local, and actually have a tangible web service.
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
              Threado
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              "&:hover": {
                backgroundColor: "#eee", // Darken on hover
              },
            }}
          >
            <a href="https://www.threado.com/" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", textDecoration: "none", color: "inherit" }}>
              <img src={Threado} alt="Threado logo" style={{ width: 350, height: 100}} />
              <div>
                <Typography variant="body1"
                            sx={{
                              marginLeft: '20px',
                              wordBreak: 'break-word',
                            }}
                >
                  Threado is a 3rd party tool/service that allows for straightforward and intuitive implementation of an AI
                  chatbot to any website. On top of these, these bots can be custom trained in order to generate proper responses
                  in regards to the context in which it is implemented. Our AI helper, titled Wong Bot, is able to assist in the
                  navigation and usage of the website.
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

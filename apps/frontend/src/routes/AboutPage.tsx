import {AboutCardLeft} from "../components/about/AboutCardLeft.tsx";
import {AboutCardRight} from "../components/about/AboutCardRight.tsx";
import {Box, Stack, Typography} from "@mui/material";

// Images
import ProfWong from '../images/aboutImages/Wong.jpg';
import Connor from "../images/aboutImages/Connor.jpg";
import Arayah from "../images/aboutImages/Arayah.png";
import Dylan from "../images/aboutImages/Dylan.png";
import Elene from "../images/aboutImages/Elene.png";
import Jacob from "../images/aboutImages/Jacob.jpg";
import Kyle from "../images/aboutImages/Kyle.jpg";
import Matt from "../images/aboutImages/Matt.png";
import Rick from "../images/aboutImages/Rick.png";
import Robert from "../images/aboutImages/Robert.png";
import Sebastian from "../images/aboutImages/Sebastian.jpg";
import Spencer from "../images/aboutImages/Spencer.jpg";
import Yitao from "../images/aboutImages/Yitao.jpg";

export default function AboutPage() {
  return (
    <Box
      sx={{
        mx: 'auto',
        justifyContent: 'center',
        paddingTop: 20,
      }}
    >
      <Stack>
        <Typography
          variant={"h3"}
          component="div"
          sx={{
            textAlign: "center",
            paddingBottom: 5,
          }}
        >
          About Us
        </Typography>
        <AboutCardLeft
          role={"Professor"}
          name={"Professor Wilson Wong"}
          bio={"Professor Wong is an associate teaching professor for the Computer Science department at WPI. " +
            "Prior to entering academia, he worked as Chief Technologist, Director of Information Systems, and " +
            "Director of Technical Operations at various corporations in the information systems and software field."}
          email={"wwong2@wpi.edu"}
          imagePath={ProfWong}
        />
        <AboutCardRight
          role={"Team Coach"}
          name={"Connor Olsen"}
          bio={"Connor is the current team coach for Team F. He is a sophomore double majoring in Math and " +
            "Computer Science at WPI. Connor helps answer Team F’s questions throughout the development process and " +
            "also conducts regular office hours to address questions of students currently taking CS 3733."}
          email={"caolsen@wpi.edu"}
          imagePath={Connor}
        />
        <AboutCardLeft
          role={"Lead Software Engineer"}
          name={"Elene Kajaia"}
          bio={""}
          email={"ekajaia@wpi.edu"}
          imagePath={Elene}
        />
        <AboutCardRight
          role={"Assistant Lead"}
          name={"Kyle Schmottlach"}
          bio={""}
          email={"kjschmottlach@wpi.edu"}
          imagePath={Kyle}
        />
        <AboutCardLeft
          role={"Assistant Lead"}
          name={"Dylan Vo"}
          bio={""}
          email={"dvo@wpi.edu"}
          imagePath={Dylan}
        />
        <AboutCardRight
          role={"Project Manager"}
          name={"Matt Walsh"}
          bio={""}
          email={"mjwalsh1@wpi.edu"}
          imagePath={Matt}
        />
        <AboutCardLeft
          role={"Scrum Master"}
          name={"Robert Mellen"}
          bio={""}
          email={"ramellen@wpi.edu"}
          imagePath={Robert}
        />
        <AboutCardRight
          role={"Product Owner"}
          name={"Jingxu (Rick) Wang"}
          bio={""}
          email={"jwang23@wpi.edu"}
          imagePath={Rick}
        />
        <AboutCardLeft
          role={"Documentation Analyst"}
          name={"Arayah Remillard"}
          bio={""}
          email={"ajremillard@wpi.edu"}
          imagePath={Arayah}
        />
        <AboutCardRight
          role={"Full Time Software Engineer"}
          name={"Sebastian Gurgol"}
          bio={""}
          email={"sagurgol@wpi.edu"}
          imagePath={Sebastian}
        />
        <AboutCardLeft
          role={"Full Time Software Engineer"}
          name={"Yitao Hong"}
          bio={""}
          email={"yhong4@wpi.edu"}
          imagePath={Yitao}
        />
        <AboutCardRight
          role={"Full Time Software Engineer"}
          name={"Jacob Murphy"}
          bio={"Jacob is a sophomore majoring in Computer Science at WPI. Outside of class, he enjoys power lifting" +
            "and going to the gym. "}
          email={"jjmurphy1@wpi.edu"}
          imagePath={Jacob}
        />
        <AboutCardLeft
          role={"Full Time Software Engineer"}
          name={"Spencer Trautz"}
          bio={""}
          email={"sctrautz@wpi.edu"}
          imagePath={Spencer}
        />
      </Stack>
    </Box>

  );
}

import {AboutCardLeft} from "../components/about/AboutCardLeft.tsx";
import {AboutCardRight} from "../components/about/AboutCardRight.tsx";
import {Box, Stack, Typography} from "@mui/material";

// Images
import ProfWong from '../images/aboutImages/WilsonWong.jpg';
import Connor from "../images/aboutImages/Connor.jpeg";

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
        <br/>
        <AboutCardRight
          role={"Team Coach"}
          name={"Connor Olsen"}
          bio={"Connor Olsen is the current team coach for Team F. He is a sophomore double majoring in Math and " +
            "Computer Science at WPI. Connor helps answer Team F’s questions throughout the development process and " +
            "also conducts regular office hours to address questions of students currently taking CS 3733."}
          email={"caolsen@wpi.edu"}
          imagePath={Connor}
        />
      </Stack>
    </Box>

  );
}

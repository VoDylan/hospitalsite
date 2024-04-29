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
import ScrollTopButton from "../components/ScrollTopButton.tsx";

export default function AboutPage() {
  return (
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
          About Us
        </Typography>
      </Box>
      <Stack>
        <Typography paddingTop={5} textAlign={"center"} variant={"h1"} color={"black"} fontSize={30}>
          WPI Computer Science Department, CS3733-D24 Software Engineering
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
          bio={"Connor is the current team coach for Team F. He is a sophomore double majoring in Computer Science " +
            "and Math at WPI. Connor helps answer Team F’s questions throughout the development process. Outside of " +
            "class, he enjoys skiing."}
          email={"caolsen@wpi.edu"}
          imagePath={Connor}
        />
        <AboutCardLeft
          role={"Lead Software Engineer"}
          name={"Elene Kajaia"}
          bio={"Elene is a sophomore double majoring in Computer Science and Robotics at WPI. She has been programming " +
            "since high school in Java and learned SQL, C, C++, and Python in college. She also has work experience working as " +
            "a Robotics Process Automation developer. In her free time, she enjoys exploring and cooking."}
          email={"ekajaia@wpi.edu"}
          imagePath={Elene}
        />
        <AboutCardRight
          role={"Assistant Lead"}
          name={"Kyle Schmottlach"}
          bio={"Kyle is a sophomore majoring in Computer Science at WPI. He has been programming since 6th grade and " +
            "proficient in languages including Java, C++, Python, and SQL. He was also the lead programmer for his high school " +
            "FIRST robotics team. Outside of school, he enjoys playing the trumpet in a multitude of bands."}
          email={"kjschmottlach@wpi.edu"}
          imagePath={Kyle}
        />
        <AboutCardLeft
          role={"Assistant Lead"}
          name={"Dylan Vo"}
          bio={"Dylan is a sophomore majoring in Computer Science at WPI. He has been programming since high school and " +
            "is proficient in Java, C, C++, Python, and SQL. He also has internship experience working on quality control " +
            "for software. Outside of school, he enjoys snowboarding, reading, and playing the violin."}
          email={"dvo@wpi.edu"}
          imagePath={Dylan}
        />
        <AboutCardRight
          role={"Project Manager"}
          name={"Matt Walsh"}
          bio={"Matt is a sophomore majoring in Computer Science at WPI. He has been programming in Java since 8th grade " +
            "and also is proficient in C and C++. He also has experience with managing teams. Outside of school, he " +
            "enjoys playing sports and weightlifting."}
          email={"mjwalsh1@wpi.edu"}
          imagePath={Matt}
        />
        <AboutCardLeft
          role={"Scrum Master"}
          name={"Robert Mellen"}
          bio={"Robert is a sophomore majoring in Robotics Engineering at WPI. He has been programming since junior year " +
            "of high school and is proficient in Java, C, and C++. He also has internship experience working as an " +
            "automation engineer. Outside of school, he enjoys outdoor activities such as running, hiking, and camping."}
          email={"ramellen@wpi.edu"}
          imagePath={Robert}
        />
        <AboutCardRight
          role={"Product Owner"}
          name={"Jingxu (Rick) Wang"}
          bio={"Rick is a junior double majoring in Robotics Engineering and Mechanical Engineering at WPI. He started " +
            "programming in college and is proficient in Java, C++, and python. He also has internship experience with " +
            "CAD and DFM. Outside of school, he enjoys playing percussion and traveling."}
          email={"jwang23@wpi.edu"}
          imagePath={Rick}
        />
        <AboutCardLeft
          role={"Documentation Analyst"}
          name={"Arayah Remillard"}
          bio={"Arayah is a junior majoring in Computer Science at WPI. She started programming in college and is " +
            "proficient with Java, C, and C++. She also has internship experience with documentation and is a tutor " +
            "for the Writing Center. Outside of school, she enjoys playing and watching basketball."}
          email={"ajremillard@wpi.edu"}
          imagePath={Arayah}
        />
        <AboutCardRight
          role={"Full Time Software Engineer"}
          name={"Sebastian Gurgol"}
          bio={"Sebastian is a junior majoring in Computer Science at WPI. He started programming in high school and " +
            "is proficient in Java, C, and C++. He has experience working with back end components including experience " +
            "with SQL. Outside of school, he enjoys transcribing music by ear to make sheet music."}
          email={"sagurgol@wpi.edu"}
          imagePath={Sebastian}
        />
        <AboutCardLeft
          role={"Full Time Software Engineer"}
          name={"Yitao Hong"}
          bio={"Yitao is a junior majoring in Computer Science and minoring in Data Science at WPI. He started programming " +
            "in college and is proficient in Java, C, and C++. He has experience with UI/UX design and has experience " +
            "using SQL to manage databases. Outside of school, he enjoys fitness and snowboarding."}
          email={"yhong4@wpi.edu"}
          imagePath={Yitao}
        />
        <AboutCardRight
          role={"Full Time Software Engineer"}
          name={"Jacob Murphy"}
          bio={"Jacob is a sophomore majoring in Computer Science at WPI. He has programmed since high school and is " +
            "proficient in Java, C, and SQL. He also has had software engineering experience working " +
            "with a remote team. Outside of class, he enjoys power lifting and going to the gym."}
          email={"jjmurphy1@wpi.edu"}
          imagePath={Jacob}
        />
        <AboutCardLeft
          role={"Full Time Software Engineer"}
          name={"Spencer Trautz"}
          bio={"Spencer is a sophomore majoring in Computer Science at WPI. He has programmed since high school and is " +
            "proficient in Java, C, C++, and Python. He also has experience working as an End User Support Technician. " +
            "Outside of class, he enjoys going on drives and is passionate about cars."}
          email={"sctrautz@wpi.edu"}
          imagePath={Spencer}
        />
        <br/>
        <Typography paddingTop={5} textAlign={"center"} variant={"h1"} color={"black"} fontSize={30}>
          Additional Thank You to Brigham & Women's Hospital and their representative Andrew Shinn.
        </Typography>
        <Typography paddingTop={5} textAlign={"center"} variant={"h1"} color={"black"} fontSize={20}>
          The Brigham & Women's Hospital maps and data used in this application are copyrighted and provided for the
          sole use of educational purposes.
        </Typography>
      </Stack>
      <ScrollTopButton />
    </Box>

  );
}

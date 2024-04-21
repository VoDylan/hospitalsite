import {AboutCardLeft} from "../components/about/AboutCardLeft.tsx";
import {Box, Stack} from "@mui/material";
import test from '../images/aboutImages/WilsonWong.jpg';

export default function AboutPage() {
  return (
    <Stack
      alignItems={"center"}
    >
      <Box
        sx={{
          paddingTop: 20,
        }}
      >
        <AboutCardLeft
          role={"Tester"}
          name={"Johnny"}
          bio={"Just here to test"}
          email={"test@wpi.edu"}
          imagePath={test}/>
      </Box>
    </Stack>

  );
}

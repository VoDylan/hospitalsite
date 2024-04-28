import {Box, Typography} from "@mui/material";

function HeroText() {
  return (
      <Box
        sx={{
          color: "#186BD9",
          opacity: "0.7",
          marginTop: "-5%",
          marginBottom: "7%"
        }}
        display={"flex"}
        justifyContent={"center"}
      >
        <Typography variant="subtitle1" fontSize={"85%"} color='red' fontWeight='bold'>
          This website is a term project exercise for WPI CS 3733 Software Engineering (Prof. Wong) and is not to be confused with the actual Brigham & Women’s Hospital website
        </Typography>
      </Box>
  );
}

export default HeroText;

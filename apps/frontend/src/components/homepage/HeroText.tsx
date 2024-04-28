import {Box, Button, IconButton, Stack, Typography} from "@mui/material";
import RateReviewSharpIcon from "@mui/icons-material/RateReviewSharp";
import InfoIcon from "@mui/icons-material/Info";

function HeroText() {
  return (
    <>
      <Stack
        direction={"row"}
        display={"flex"}
        justifyContent={"center"}
        marginTop={'-4%'}
        marginBottom={'-2%'}
      >

        <a
          href="/Credits"
        >
          <IconButton
            sx={{ color: "#186BD9" }}
            size="large"
            aria-label="Credits"
          >
            <RateReviewSharpIcon />
          </IconButton>
          <Button variant={"text"}>
            Credits
          </Button>
        </a>

        <a
          href="/About"
        >
          <IconButton
            sx={{ color: "#186BD9" }}
            size="large"
            aria-label="About Team F"
          >
            <InfoIcon />
          </IconButton>
          <Button variant={"text"}>About Us!</Button>
        </a>
      </Stack>
      <Box
        sx={{
          color: "#186BD9",
          opacity: "0.7",
          marginTop: "2%",
          marginBottom: "5%"}}
        display={"flex"}
        justifyContent={"center"}>
        <Typography variant = "subtitle1"
                    fontSize={"87%"}
                    color = 'red'
                    fontWeight = 'bold'>
          This website is a term project exercise for WPI CS 3733 Software Engineering (Prof. Wong) and is not to be confused with the actual Brigham & Women’s Hospital website
        </Typography>
      </Box>
      </>

  );
}

export default HeroText;

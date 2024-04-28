import {Button, IconButton, Stack} from "@mui/material";
import RateReviewSharpIcon from "@mui/icons-material/RateReviewSharp";
import InfoIcon from "@mui/icons-material/Info";

function HeroButtons() {
  return (
    <>
      <Stack
        direction={"row"}
        display={"flex"}
        justifyContent={"center"}
        marginTop={'2%'}
        marginBottom={'0.5%'}
      >
        <a
          href="/Credits"
        >
          <IconButton
            sx={{color: "#186BD9"}}
            size="large"
            aria-label="Credits"
          >
            <RateReviewSharpIcon/>
          </IconButton>
          <Button variant={"text"}>
            Credits
          </Button>
        </a>

        <a
          href="/About"
        >
          <IconButton
            sx={{color: "#186BD9"}}
            size="large"
            aria-label="About Team F"
          >
            <InfoIcon/>
          </IconButton>
          <Button variant={"text"}>About Us!</Button>
        </a>
      </Stack>
    </>
  );
}

export default HeroButtons;


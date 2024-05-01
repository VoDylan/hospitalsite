import {Box, Button, Stack, Typography} from "@mui/material";
import Background from "../images/Background.jpg";

export default function PageNotFound() {
  return (
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        minHeight={"100vh"}
        sx={{
          backgroundImage: `url(${Background})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Stack
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography
            variant="h1"
            color={"white"}
            sx={{
              mb: 5,
            }}
          >
            404 Page Not Found
          </Typography>
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{
              width: "50%"
            }}
          >
            <Button
              disableRipple
              variant={"contained"}
              href={"/"}
            >
              Return Home
            </Button>
          </Box>

        </Stack>
      </Box>


  );
}

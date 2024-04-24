import {Box, Drawer, Stack, Typography} from "@mui/material";
import useWindowSize from "../../../hooks/useWindowSize.tsx";
interface MapEditorSideBar2Props {
  title: string;
}

export default function MapEditorSideBar2(props: MapEditorSideBar2Props) {
  const [windowWidth, windowHeight] = useWindowSize();
  return (
    <Drawer
      variant={"permanent"}
      sx={{
        width: "18%",
        height: "100%",
        flexShrink: 0,
      }}
      PaperProps={{
        sx: {
          position: "relative",
          width: "100%",
          height: "100%"
        },
        elevation: 3,
      }}

    >
      <Box
        height={"100%"}
        margin={"15px"}
      >
        <Stack>
          <Typography
            color={"#003A96"}
            align={"center"}
            fontStyle={"Open Sans"}
            fontSize={30}
            sx={{ marginBottom: "10%", marginTop: "10%" }}
          >
            {props.title}
          </Typography>
        </Stack>
      </Box>
    </Drawer>
  );
}

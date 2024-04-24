import {Box, Button, Stack} from "@mui/material";
import Slide from "@mui/material/Slide";
import {useState} from "react";
import FilterList from "./FilterList.tsx";

interface FilterSelectorProps {

}

export default function FilterSlider(props: FilterSelectorProps) {
  const [filterMenuShown, setFilterMenuShown] = useState<boolean>(false);
  return (
    <Stack
      direction={"column"}
      spacing={2}
      marginLeft={"10%"}
    >
      {!filterMenuShown ?
        <Button
          variant={"contained"}
          sx={{
            width: "80%",
            zIndex: 2,
          }}
          onClick={() => setFilterMenuShown(true)}
        >
          Edit Filters
        </Button>
        :
        <></>
      }
      <Box
        position={"absolute"}
        width={"100%"}
        height={"100%"}
        top={0}
        left={0}
        overflow={"hidden"}
        sx={{
          marginTop: "0 !important"
        }}
      >
        <Slide
          in={filterMenuShown}
          direction="up"
          style={{
            zIndex: 100,
            backgroundColor: "#F5F7FA",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            minWidth: "100%",
            height: "100%",
            maxHeight: "100%",
          }}
          mountOnEnter
          unmountOnExit
        >
          <div>
            <FilterList hideFilterMenu={() => setFilterMenuShown(false)} />
          </div>
        </Slide>
      </Box>
    </Stack>
  );
}

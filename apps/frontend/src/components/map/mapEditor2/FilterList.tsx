import React from "react";
import {Box, Button, Typography} from "@mui/material";

interface FilterListProps {
  hideFilterMenu: () => void;
}

export default function FilterList(props: FilterListProps) {
  return (
    <Box
      marginTop={"20px"}
      marginBottom={"20px"}
      marginLeft={"15px"}
      marginRight={"15px"}
    >
      <Button onClick={() => props.hideFilterMenu()}>
        Back
      </Button>
      <Box
        margin={"15px"}
      >
        <Typography>;ljkjkdsljkahsddf</Typography>
      </Box>
    </Box>
  );
}

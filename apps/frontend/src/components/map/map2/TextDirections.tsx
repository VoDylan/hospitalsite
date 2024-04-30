import {Box, Button} from "@mui/material";
import React, {useEffect, useState} from "react";
import {TypeCoordinates} from "common/src/TypeCoordinates.ts";
import {Floor} from "common/src/map/Floor.ts";
import TextDirectionsSlide from "./TextDirectionsSlide.tsx";
import Spacer from "../../general/Spacer.tsx";

interface TextDirectionsProps {
  textDirectionsEnabled: boolean;
  pathNodesData: TypeCoordinates[];
  setFloor: (newFloor: Floor) => void;
}

export default function TextDirections(props: TextDirectionsProps) {
  const [textDirectionsShown, setTextDirectionsShown] = useState<boolean>(false);
  const [pathNodesData, setPathNodesData] = useState<TypeCoordinates[]>(props.pathNodesData);

  useEffect(() => {
    setPathNodesData(props.pathNodesData);
  }, [props.pathNodesData]);

  return (
    <Box>
      {props.textDirectionsEnabled && (
        <>
          <Spacer spaceLength={25}/>
          <Button
            variant={"text"}
            onClick={() => setTextDirectionsShown(!textDirectionsShown)}
            sx={{
              width: "100%",
              marginRight: "auto",
              marginLeft: "auto",
              marginBottom: textDirectionsShown ? "25px" : "none",
            }}
          >
            Text Directions
          </Button>
        </>
        )}
        {/*Text direction box*/}
        {textDirectionsShown && (
          <Box
            sx={{
              width: "100%",
              backgroundColor: "white",
            }}
          >
            <TextDirectionsSlide
              handleHideTextDirections={() => setTextDirectionsShown(false)}
              pathNodesData={pathNodesData}
              setFloor={props.setFloor}
            />
          </Box>
        )}
    </Box>
  );
};

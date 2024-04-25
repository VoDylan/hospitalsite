import { Stack } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Filter from "./Filter.tsx";
import React, {useEffect, useRef, useState} from "react";
import {NodeTypes} from "common/src/map/MapNodeType.ts";

interface FilterWithIconProps {
  iconColor: string;
  filterName: string;
  filterType: NodeTypes;
  initialIconState: boolean;
  handleIconState: (filterType: NodeTypes, newState: boolean) => void;
}

export default function FilterWithIcon(props: FilterWithIconProps) {
  const [iconState, setIconState] = useState<boolean>(props.initialIconState);
  const filterType = useRef<NodeTypes>(props.filterType);
  const handleIconState = useRef<(filterType: NodeTypes, newState: boolean) => void>(props.handleIconState);

  const handleIconChange = () => {
    const newIconState: boolean = !iconState;
    setIconState(newIconState);
  };

  useEffect(() => {
    handleIconState.current(filterType.current, iconState);
  }, [iconState]);

  return (
    <Stack
      direction="row"
      spacing={8}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Filter
        iconColor={props.iconColor}
        filterName={props.filterName}
        filterType={props.filterType}
      />
      {iconState ? (
        <CheckBoxIcon
          onClick={() => {handleIconChange();}}
          fontSize="medium"
          sx={{color: "rgba(0, 0, 255, 0.5)"}}
        />
      ) : (
        <AddBoxIcon
          onClick={() => {handleIconChange();}}
          fontSize="medium"
          sx={{color: "rgba(0, 0, 0, 0.2)"}}
        />
      )}
    </Stack>
  );
}

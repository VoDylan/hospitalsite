import {Stack, SxProps, Theme} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Filter from "./Filter.tsx";
import React, {useEffect, useRef, useState} from "react";
import {IFilterState, IRenderInfo} from "../../../hooks/useFilters.tsx";
import {FilterType} from "../../../common/types/FilterType.ts";

interface FilterWithIconProps {
  filterInfo: IFilterState,
  handleIconState: (filterType: FilterType, newState: boolean) => void;
  sx?: SxProps<Theme>;
}

export default function FilterWithIcon(props: FilterWithIconProps) {
  const [iconState, setIconState] = useState<boolean>(props.filterInfo.active);
  const renderInfo = useRef<IRenderInfo | undefined>(props.filterInfo.renderInfo);
  const handleIconState = useRef<(filterType: FilterType, newState: boolean) => void>(props.handleIconState);

  const handleIconChange = () => {
    const newIconState: boolean = !iconState;
    setIconState(newIconState);
  };

  useEffect(() => {
    if(renderInfo.current) handleIconState.current(renderInfo.current.filterType, iconState);
  }, [iconState]);

  return (
    (renderInfo.current ?
      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={props.sx}
      >
        <Filter filterInfo={props.filterInfo} />
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
      </Stack> :
      <></>
    )
  );
}

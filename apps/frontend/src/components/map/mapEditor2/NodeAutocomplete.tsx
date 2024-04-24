import React, {SyntheticEvent, useEffect, useState} from "react";
import {Stack, TextField} from "@mui/material";
import Autocomplete, {AutocompleteRenderInputParams} from "@mui/material/Autocomplete";
import {AutocompleteNodeType} from "../../../common/types/AutocompleteNodeType.ts";
import MapNode from "common/src/map/MapNode.ts";

interface NodeAutocompleteProps {
  label: string;
  Icon: React.JSX.Element;
  onChange: (event: SyntheticEvent, value: AutocompleteNodeType | null) => void;
  nodeData: MapNode[];
  value: MapNode | null;
  style?: React.CSSProperties;
}

export default function NodeAutocomplete(props: NodeAutocompleteProps) {
  const [autoCompleteNodeData, setAutoCompleteNodeData] = useState<AutocompleteNodeType[]>([]);
  const [selectedAutocompleteData, setSelectedAutocompleteData] = useState<AutocompleteNodeType | null>(null);

  useEffect(() => {
    const parsedData: AutocompleteNodeType[] = [];

    for(const node of props.nodeData) {
      parsedData.push({
        label: node.longName,
        node: node.nodeID,
      });
    }

    setAutoCompleteNodeData(parsedData);
  }, [props.nodeData]);

  useEffect(() => {
    if(props.value) {
      setSelectedAutocompleteData({
        label: props.value.longName,
        node: props.value.nodeID,
      });
    } else {
      setSelectedAutocompleteData(null);
    }
  }, [props.value]);
  
  return (
    <Stack
      direction={"row"}
      spacing={1}
      style={{
        ...props.style,
        alignItems: "center",
      }}
    >
      {props.Icon}
      <Autocomplete
        value={selectedAutocompleteData}
        onChange={props.onChange}
        disablePortal
        id="startNodeAutocomplete"
        options={autoCompleteNodeData
          .sort((val1: AutocompleteNodeType, val2: AutocompleteNodeType) => val1.label.localeCompare(val2.label))
        }
        groupBy={(option) => option.label.charAt(0).toUpperCase()}
        sx={{ width: "75%" }}
        renderInput={(params: AutocompleteRenderInputParams) => <TextField {...params} label={props.label}/>}
        isOptionEqualToValue={(option: AutocompleteNodeType, value: AutocompleteNodeType) => {
          return option.label === value.label && option.node === value.node;
        }}
      />
    </Stack>
  );
}

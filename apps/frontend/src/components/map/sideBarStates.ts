import React from "react";
import { useState } from "react";

export function useAutocompleteNodeData() {
  const [autocompleteNodeData, setAutocompleteNodeData] = useState<
    { label: string; node: string }[]
  >([]);

  return { autocompleteNodeData, setAutocompleteNodeData };
}

export function useStartNodeData() {
  const [startNodeData, setStartNodeData] = useState<string>("");
  return { startNodeData, setStartNodeData };
}

export function useEndNodeData() {
  const [endNodeData, setEndNodeData] = useState<string>("");
  return { endNodeData, setEndNodeData };
}

export function useHandleStartNodeChange(
  setStartNode: (value: string) => void,
) {
  const { autocompleteNodeData } = useAutocompleteNodeData(); // Import the hook to access autocompleteNodeData state

  const handleStartNodeChange = (value: string | null) => {
    if (value) {
      // Find the corresponding node for the selected label
      const selectedNode = autocompleteNodeData.find(
        (node) => node.label === value,
      );
      if (selectedNode) {
        setStartNode(selectedNode.node);
      }
    } else {
      setStartNode(""); // Handle null value if necessary
    }
  };

  return { handleStartNodeChange };
}

export function useHandleEndNodeChange(setEndNode: (value: string) => void) {
  const { autocompleteNodeData } = useAutocompleteNodeData(); // Import the hook to access autocompleteNodeData state

  const handleEndNodeChange = (value: string | null) => {
    if (value) {
      // Find the corresponding node for the selected label
      const selectedNode = autocompleteNodeData.find(
        (node) => node.label === value,
      );
      if (selectedNode) {
        setEndNode(selectedNode.node);
      }
    } else {
      setEndNode(""); // Handle null value if necessary
    }
  };

  return { handleEndNodeChange };
}

export function useOpenData() {
  const [openData, setOpenData] = React.useState(false);
  return { openData, setOpenData };
}

export function useHandleClick() {
  const { openData, setOpenData } = useOpenData(); // Import and access openData state

  const handleClick = () => {
    setOpenData(!openData); // Toggle the value of openData
  };

  return { handleClick };
}

export function useCheckedBFS() {
  const [checkedBFSData, setCheckedBFSData] = React.useState(true);
  return { checkedBFSData, setCheckedBFSData };
}

export function useCheckedAS() {
  const [checkedASData, setCheckedASData] = React.useState(true);
  return { checkedASData, setCheckedASData };
}

export function useAlgorithm() {
  const [algorithmData, setAlgorithmData] = React.useState("BFS");
  return { algorithmData, setAlgorithmData };
}

export function useChecked() {
  const [checkedData, setCheckedData] = React.useState(false);
  return { checkedData, setCheckedData };
}

export function useHandleButtonClick() {
  const { checkedData, setCheckedData } = useChecked();

  const handleButtonClick = () => {
    setCheckedData((prev) => !prev);
    console.log(checkedData);
  };

  return { handleButtonClick }; // Return the function
}

import React, {useState} from "react";

export const useLegend = (): [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>
] => {
  const [isOpen, setIsOpen] = useState(true);

  return [isOpen, setIsOpen];
};

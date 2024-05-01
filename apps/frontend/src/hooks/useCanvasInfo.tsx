import React, {useState} from "react";

export const useCanvasInfo = (): [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
  number,
  React.Dispatch<React.SetStateAction<number>>,
  number,
  React.Dispatch<React.SetStateAction<number>>,
] => {
  const [backgroundRendered, setBackgroundRendered] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  return [
    backgroundRendered,
    setBackgroundRendered,
    width,
    setWidth,
    height,
    setHeight,
  ];
};

import {Floor} from "common/src/map/Floor.ts";
import React, {useEffect, useState} from "react";
import F1SVG from "./F1SVG.tsx";
import F2SVG from "./F2SVG.tsx";
import F3SVG from "./F3SVG.tsx";
import L1SVG from "./L1SVG.tsx";
import L2SVG from "./L2SVG.tsx";

interface BackgroundSVGProps {
  floor: Floor;
  width: number | string;
  height: number | string;
}

export default function BackgroundSVG(props: BackgroundSVGProps) {
  const [f1SVG, setF1SVG] = useState<React.JSX.Element>(F1SVG({
    width: props.width,
    height: props.height,
  }));
  
  const [f2SVG, setF2SVG] = useState<React.JSX.Element>(F2SVG({
    width: props.width,
    height: props.height,
  }));
  
  const [f3SVG, setF3SVG] = useState<React.JSX.Element>(F3SVG({
    width: props.width,
    height: props.height,
  }));
  
  const [l1SVG, setL1SVG] = useState<React.JSX.Element>(L1SVG({
    width: props.width,
    height: props.height,
  }));
  
  const [l2SVG, setL2SVG] = useState<React.JSX.Element>(L2SVG({
    width: props.width,
    height: props.height,
  }));

  const [currBackground, setCurrBackground] = useState<React.JSX.Element>(l1SVG);

  useEffect(() => {
    setF1SVG(F1SVG({
      width: props.width,
      height: props.height,
    }));

    setF2SVG(F2SVG({
      width: props.width,
      height: props.height,
    }));

    setF3SVG(F3SVG({
      width: props.width,
      height: props.height,
    }));

    setL1SVG(L1SVG({
      width: props.width,
      height: props.height,
    }));

    setL2SVG(L2SVG({
      width: props.width,
      height: props.height,
    }));
  }, [props.height, props.width]);

  useEffect(() => {
    switch(props.floor) {
      case Floor.L2:
        setCurrBackground(l2SVG);
        break;
      case Floor.L1:
        setCurrBackground(l1SVG);
        break;
      case Floor.F1:
        setCurrBackground(f1SVG);
        break;
      case Floor.F2:
        setCurrBackground(f2SVG);
        break;
      case Floor.F3:
        setCurrBackground(f3SVG);
        break;
      default:
        console.error("BackgroundSVG: Unknown floor type encountered");
        break;
    }
  }, [f1SVG, f2SVG, f3SVG, l1SVG, l2SVG, props.floor]);

  return currBackground;
}

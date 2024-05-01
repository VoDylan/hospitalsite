import L1FloorIconNextSrc from "../images/mapIcons/L1FloorMarkerNextIcon.png";
import L1FloorIconPrevSrc from "../images/mapIcons/L1FloorMarkerPrevIcon.png";
import L2FloorIconNextSrc from "../images/mapIcons/L2FloorMarkerNextIcon.png";
import L2FloorIconPrevSrc from "../images/mapIcons/L2FloorMarkerPrevIcon.png";
import F1FloorIconNextSrc from "../images/mapIcons/F1FloorMarkerNextIcon.png";
import F1FloorIconPrevSrc from "../images/mapIcons/F1FloorMarkerPrevIcon.png";
import F2FloorIconNextSrc from "../images/mapIcons/F2FloorMarkerNextIcon.png";
import F2FloorIconPrevSrc from "../images/mapIcons/F2FloorMarkerPrevIcon.png";
import F3FloorIconNextSrc from "../images/mapIcons/F3FloorMarkerNextIcon.png";
import F3FloorIconPrevSrc from "../images/mapIcons/F3FloorMarkerPrevIcon.png";
import {Floor} from "common/src/map/Floor.ts";

export const useFloorIcons = (): [
  Map<Floor, string>,
  Map<Floor, string>
] => {
  const floorToIconNextImageMap: Map<Floor, string> = new Map<Floor, string>([
    [Floor.L1, L1FloorIconNextSrc],
    [Floor.L2, L2FloorIconNextSrc],
    [Floor.F1, F1FloorIconNextSrc],
    [Floor.F2, F2FloorIconNextSrc],
    [Floor.F3, F3FloorIconNextSrc],
  ]);

  const floorToIconPrevImageMap: Map<Floor, string> = new Map<Floor, string>([
    [Floor.L1, L1FloorIconPrevSrc],
    [Floor.L2, L2FloorIconPrevSrc],
    [Floor.F1, F1FloorIconPrevSrc],
    [Floor.F2, F2FloorIconPrevSrc],
    [Floor.F3, F3FloorIconPrevSrc],
  ]);

  return [
    floorToIconNextImageMap,
    floorToIconPrevImageMap,
  ];
};

import {Coordinates} from "./Coordinates.ts";

export type TypeCoordinates = {
  nodeID: string,
  nodeType: string,
  floor: string,
  longName: string,
  coordinates: Coordinates,
  direction: string,
  distance: number
};

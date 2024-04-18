export enum Floor {
  L1 = "L1",
  L2 = "L2",
  F1 = "1",
  F2 = "2",
  F3 = "3",
}

export function floorStrToObj(floorStr: string): Floor | null {
  switch (floorStr) {
    case "L1":
      return Floor.L1;
    case "L2":
      return Floor.L2;
    case "1":
      return Floor.F1;
    case "2":
      return Floor.F2;
    case "3":
      return Floor.F3;
    default:
      return null;
  }
}

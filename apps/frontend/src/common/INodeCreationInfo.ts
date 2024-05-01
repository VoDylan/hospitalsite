export interface INodeCreationInfo {
  creatingNode: boolean;
  mouseXCoord: number;
  mouseYCoord: number;
  canvasXCoord: number;
  canvasYCoord: number;
}

export const EmptyNodeCreationInfo: INodeCreationInfo = {
  creatingNode: false,
  mouseXCoord: 0,
  mouseYCoord: 0,
  canvasXCoord: 0,
  canvasYCoord: 0,
};

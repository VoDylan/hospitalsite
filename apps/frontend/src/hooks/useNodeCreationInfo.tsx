import React, {useState} from "react";
import {EmptyNodeCreationInfo, INodeCreationInfo} from "../common/INodeCreationInfo.ts";

export const useNodeCreationInfo = (): [
  INodeCreationInfo,
  React.Dispatch<React.SetStateAction<INodeCreationInfo>>
] => {
  const [nodeCreationInfo, setNodeCreationInfo] = useState<INodeCreationInfo>(EmptyNodeCreationInfo);

  return [nodeCreationInfo, setNodeCreationInfo];
};

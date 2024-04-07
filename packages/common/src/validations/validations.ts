import Joi from "joi";

export const validateNodeData = (nodeData: never) => {
  const nodeSchema: Joi.ObjectSchema = Joi.object({
    nodeID: Joi.string().required(),
    xcoord: Joi.number().required(),
    ycoord: Joi.number().required(),
    floor: Joi.string().required(),
    building: Joi.string().required(),
    nodeType: Joi.string().required(),
    longName: Joi.string().required(),
    shortName: Joi.string().required(),
  });

  return nodeSchema.validate(nodeData);
};

export const validateEdgeData = (edgeData: never) => {
  const edgeSchema: Joi.ObjectSchema = Joi.object({
    startNodeID: Joi.string().required(),
    endNodeID: Joi.string().required(),
  });

  return edgeSchema.validate(edgeData);
};

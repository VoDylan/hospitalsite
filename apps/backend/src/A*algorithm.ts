import { NodeAStar } from "common/src/NodeAStar.ts";
import GraphManager from "common/src/GraphManager.ts";

export class AAlgorithm {
  nodes: NodeAStar[];

  public constructor() {
    this.nodes = [];
  }

  public loadData() {
    const graphManager = GraphManager.getInstance();
    const mapNodes = graphManager.nodes;
    const mapEdges = graphManager.edges;

    console.log(mapEdges);
    console.log(mapNodes);
  }
}

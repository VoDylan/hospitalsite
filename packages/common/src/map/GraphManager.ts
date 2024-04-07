import MapNode from "./MapNode.ts";
import MapEdge from "./MapEdge.ts";

class GraphManager {
  private static instance: GraphManager;

  private _nodes: MapNode[];
  private _edges: MapEdge[];

  public static getInstance(): GraphManager {
    if (!GraphManager.instance) {
      GraphManager.instance = new GraphManager();
      return GraphManager.instance;
    } else {
      return GraphManager.instance;
    }
  }

  private constructor() {
    this._nodes = [];
    this._edges = [];
  }

  /**
   * Helper function to get a node object reference based on a nodeID
   * Does not query the database, rather it obtains the object from the list of nodes
   * @param nodeID - The NodeID to search for
   */
  public getNodeByID(nodeID: string): MapNode | null {
    for (let i = 0; i < this.nodes.length; i++) {
      if (this.nodes[i].nodeID == nodeID) return this.nodes[i];
    }

    return null;
  }

  public get nodes(): MapNode[] {
    return this._nodes;
  }

  public set nodes(newNodes: MapNode[]) {
    this._nodes = newNodes;
  }

  public get edges(): MapEdge[] {
    return this._edges;
  }

  public set edges(newEdges: MapEdge[]) {
    this._edges = newEdges;
  }
}

export default GraphManager;

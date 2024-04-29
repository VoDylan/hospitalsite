import MapNode from "common/src/map/MapNode.ts";
import MapEdge from "common/src/map/MapEdge.ts";
import {MapNodeType} from "common/src/map/MapNodeType.ts";

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

  public getEdgeByID(edgeID: string): MapEdge | null {
    for (let i = 0; i < this.edges.length; i++) {
      if (this.edges[i].edgeID == edgeID) return this.edges[i];
    }

    return null;
  }

  public deleteLocalEdgeByID(edgeID: string): void {
    const edgeIndex = this.edges.findIndex((edge: MapEdge) => {
      return edge.edgeID == edgeID;
    });

    if(edgeIndex >= 0) this.edges.splice(edgeIndex, 1);
  }

  public createLocalEdge(node1: MapNode, node2: MapNode) {
    const edgeID1: string = `${node1.nodeID}_${node2.nodeID}`;
    const edgeID2: string = `${node2.nodeID}_${node1.nodeID}`;

    const node1Index = this.nodes.findIndex((node: MapNode) => {
      return node.nodeID == node1.nodeID;
    });
    const node2Index = this.nodes.findIndex((node: MapNode) => {
      return node.nodeID == node2.nodeID;
    });

    if(node1Index <= 0) this.nodes.push(node1);
    if(node2Index <= 0) this.nodes.push(node2);

    const edgeIndex = this.edges.findIndex((edge: MapEdge) => {
      return edge.edgeID == edgeID1 || edge.edgeID == edgeID2;
    });

    if(edgeIndex < 0) this.edges.push(new MapEdge({
      edgeID: edgeID1,
      startNodeID: node1.nodeID,
      endNodeID: node2.nodeID,
    }, node1, node2));
  }

  public updateLocalNode(nodeInfo: MapNodeType) {
    console.log("Updating local node");
    const nodeIndex: number = this.nodes.findIndex((node: MapNode) => {
      return node.nodeID == nodeInfo.nodeID;
    });

    if(nodeIndex >= 0) this.nodes[nodeIndex].nodeInfo = nodeInfo;
  }

  public deleteLocalNodeByID(nodeID: string): void {
    const nodeIndex = this.nodes.findIndex((node: MapNode) => {
      return node.nodeID == nodeID;
    });

    if(nodeIndex < 0) return;

    this.nodes.splice(nodeIndex, 1);

    const connectedEdgeIndices: number[] = [];

    this.edges.forEach((edge, index) => {
      if(edge.startNodeID == nodeID || edge.endNodeID == nodeID) connectedEdgeIndices.push(index);
    });

    connectedEdgeIndices.forEach((index) => {
      this.edges.splice(index, 1);
    });
  }

  public createLocalNode(newNodeInfo: MapNodeType) {
    const nodeIndex = this.nodes.findIndex((node: MapNode) => {
      return node.nodeID == newNodeInfo.nodeID;
    });

    if(nodeIndex >= 0) {
      this.updateLocalNode(newNodeInfo);
    } else {
      this.nodes.push(new MapNode(newNodeInfo));
    }
  }

  public resetData() {
    this.nodes = [];
    this.edges = [];
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

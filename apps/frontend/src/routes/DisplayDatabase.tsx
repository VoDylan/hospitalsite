import * as React from "react";
import { Button, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
//import background from "frontend/public/Background.jpg";
import axios, { AxiosResponse } from "axios";
import {
  DataGrid,
  GridColDef,
  //GridRowsProp,
  GridToolbar,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";

type NodeParams = {
  id: number;
  nodeID: string;
  xcoord: number;
  ycoord: number;
  floor: string;
  building: string;
  nodeType: string;
  longName: string;
  shortName: string;
};

type EdgeParams = {
  id: number;
  startNodeID: string;
  endNodeID: string;
};

const VisuallyHiddenInput = styled("input")({
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function handleImport() {
  console.log();
}

function DisplayDatabase() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState<AxiosResponse>();
  //const [rows] = useState<GridRowsProp>([]);
  const [nodeCols] = useState<GridColDef[]>([
    { field: "nodeID", headerName: "NodeID", width: 100 },
    { field: "xcoord", headerName: "XCoord", width: 100 },
    { field: "ycoord", headerName: "YCoord", width: 100 },
    { field: "floor", headerName: "Floor", width: 100 },
    { field: "building", headerName: "Building", width: 100 },
    { field: "nodeType", headerName: "NodeType", width: 100 },
    { field: "longName", headerName: "LongName", width: 100 },
    { field: "shortName", headerName: "ShortName", width: 100 },
  ]);
  const [edgeCols] = useState<GridColDef[]>([
    { field: "startNodeID", headerName: "StartNodeID", width: 150 },
    { field: "endNodeID", headerName: "EndNodeID", width: 150 },
  ]);

  // const [isFinished] = useState(false);
  const [rowNodeData, setNodeRowData] = useState<NodeParams[]>([]);
  const [rowEdgeData, setEdgeRowData] = useState<EdgeParams[]>([]);

  const getNodeData = async () => {
    const { data } = await axios.get("/api/database/nodes");
    console.log("Got data");
    setData(data);
    console.log(data);

    const rowNodeData = [];
    for (let i = 0; i < data.length; i++) {
      const tableFormattedNode = {
        id: i,
        nodeID: data[i].nodeID,
        xcoord: data[i].xcoord,
        ycoord: data[i].ycoord,
        floor: data[i].floor,
        building: data[i].building,
        nodeType: data[i].nodeType,
        longName: data[i].longName,
        shortName: data[i].shortName,
      };
      rowNodeData.push(tableFormattedNode);
    }
    setNodeRowData(rowNodeData);
  };

  const getEdgeData = async () => {
    const { data } = await axios.get("/api/database/edges");
    console.log("Got data");
    setData(data);
    console.log(data);

    const rowEdgeData = [];
    for (let i = 0; i < data.length; i++) {
      const tableFormattedEdge = {
        id: i,
        startNodeID: data[i].startNodeID,
        endNodeID: data[i].endNodeID,
      };
      rowEdgeData.push(tableFormattedEdge);
    }
    setEdgeRowData(rowEdgeData);
  };

  useEffect(() => {
    getNodeData();
    getEdgeData();
  }, []);

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        minWidth: "100wh",
        /*background: `url(${background})`, // Set the background image
          backgroundSize: "cover",
          backgroundPosition: "center",*/
      }}
    >
      <Box
        display="flex"
        mt={2}
        alignItems="center"
        flexDirection="column"
        sx={{
          backgroundColor: "white",
          opacity: "90%",
        }}
      >
        <DataGrid
          slots={{ toolbar: GridToolbar }}
          sx={{
            padding: "40px",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            //alignItems: "center",
          }}
          columns={nodeCols}
          rows={rowNodeData}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
        <Button
          component="label"
          role={undefined}
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          className="importButton"
          variant="contained"
          onClick={handleImport}
          sx={{
            backgroundColor: "primary.main", // Change background color
            color: "white", // Change text color
            borderRadius: "8px", // Change border radius
            marginRight: "-1px", // Adjust spacing
          }}
        >
          Import CSV File
          <VisuallyHiddenInput type="file" />
        </Button>
        <DataGrid
          slots={{ toolbar: GridToolbar }}
          sx={{
            padding: "40px",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            //alignItems: "center",
          }}
          columns={edgeCols}
          rows={rowEdgeData}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
        <Button
          component="label"
          role={undefined}
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          className="importButton"
          variant="contained"
          onClick={handleImport}
          sx={{
            backgroundColor: "primary.main", // Change background color
            color: "white", // Change text color
            borderRadius: "8px", // Change border radius
            marginRight: "-1px", // Adjust spacing
          }}
        >
          Import CSV File
          <VisuallyHiddenInput type="file" />
        </Button>
      </Box>
    </div>
  );
}

export default DisplayDatabase;

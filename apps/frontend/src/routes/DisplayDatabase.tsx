import * as React from "react";
import { Button, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
//import background from "frontend/public/Background.jpg";
import axios, { AxiosResponse } from "axios";
import TopBanner2 from "../components/TopBanner2.tsx";

import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { MapNodeType } from "common/src/MapNodeType.ts";
import { MapEdgeType } from "common/src/MapEdgeType.ts";

type NodeParams = { id: number } & MapNodeType;

type ServiceParams = {
  id: number;
  userID: number;
  nodeID: string;
  serviceType: string;
};

type EdgeParams = { id: number } & MapEdgeType;

/*app.post('/csv', upload.none(), function (req, res, next) {
  // req.body contains the text fields
});*/

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

function parseCSVFromString(data: string) {
  return data.split("\n").map((row: string): string[] => {
    return row.trim().split(",");
  });
}

function DisplayDatabase() {
  const [nodeColumns] = useState<GridColDef[]>([
    { field: "nodeID", headerName: "NodeID", width: 150 },
    { field: "xcoord", headerName: "XCoord", width: 120 },
    { field: "ycoord", headerName: "YCoord", width: 120 },
    { field: "floor", headerName: "Floor", width: 100 },
    { field: "building", headerName: "Building", width: 120 },
    { field: "nodeType", headerName: "NodeType", width: 100 },
    { field: "longName", headerName: "LongName", width: 300 },
    { field: "shortName", headerName: "ShortName", width: 150 },
  ]);

  const [edgeColumns] = useState<GridColDef[]>([
    { field: "startNodeID", headerName: "StartNodeID", width: 150 },
    { field: "endNodeID", headerName: "EndNodeID", width: 150 },
  ]);

  const [serviceColumns] = useState<GridColDef[]>([
    { field: "userID", headerName: "User ID", width: 200 },
    { field: "nodeID", headerName: "Node ID", width: 200 },
    { field: "serviceType", headerName: "Service Type", width: 200 },
  ]);

  // const [isFinished] = useState(false);
  const [nodeRowData, setNodeRowData] = useState<NodeParams[]>([]);
  const [edgeRowData, setEdgeRowData] = useState<EdgeParams[]>([]);
  const [serviceRowData, setServiceRowData] = useState<ServiceParams[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentFile, setCurrentFile] = useState<File>();

  const getNodeData = async () => {
    const { data } = await axios.get("/api/database/nodes");
    console.log("Got data");
    setNodeRowData(data);
    console.log(data);

    const rowNodeData = [];
    for (let i = 0; i < data.length; i++) {
      const tableFormattedNode: NodeParams = {
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
    setEdgeRowData(data);
    console.log(data);

    const rowData = [];
    for (let i = 0; i < data.length; i++) {
      const tableFormattedEdge: EdgeParams = {
        id: i,
        startNodeID: data[i].startNodeID,
        endNodeID: data[i].endNodeID,
      };
      rowData.push(tableFormattedEdge);
    }
    setEdgeRowData(rowData);
  };

  const getServiceData = async () => {
    const { data } = await axios.get("/api/database/servicerequest");
    console.log("Gathered Service Requests");
    console.log(data);

    const rowData = [];
    for (let i = 0; i < data.length; i++) {
      const tableFormattedServReq: ServiceParams = {
        id: i,
        userID: data[i].userID,
        nodeID: data[i].nodeID,
        serviceType: data[i].serviceType,
      };
      rowData.push(tableFormattedServReq);
    }
    setServiceRowData(rowData);
  };

  useEffect(() => {
    getNodeData();
    getEdgeData();
    getServiceData();
  }, []);

  function handleNodeImport(file: File) {
    const fileReader: FileReader = new FileReader();

    let fileText: string | ArrayBuffer = "";

    const jsonData: MapNodeType[] = [];

    fileReader.onload = (evt: ProgressEvent<FileReader>) => {
      if (evt.target!.result == null) {
        console.log("No data found in file");
      } else {
        fileText = evt.target!.result;
        console.log(fileText);
        const parsedData: string[][] = parseCSVFromString(fileText as string);

        for (let i: number = 1; i < parsedData.length; i++) {
          jsonData.push({
            nodeID: parsedData[i][0],
            xcoord: parseInt(parsedData[i][1]),
            ycoord: parseInt(parsedData[i][2]),
            floor: parsedData[i][3],
            building: parsedData[i][4],
            nodeType: parsedData[i][5],
            longName: parsedData[i][6],
            shortName: parsedData[i][7],
          });
        }

        axios
          .post("/api/database/uploadnodes", jsonData)
          .then((response: AxiosResponse) => {
            console.log(response);
          });
      }
    };

    fileReader.readAsText(file);
  }

  function handleEdgeImport(file: File) {
    const fileReader: FileReader = new FileReader();

    let fileText: string | ArrayBuffer = "";

    const jsonData: MapEdgeType[] = [];

    fileReader.onload = (evt: ProgressEvent<FileReader>) => {
      if (evt.target!.result == null) {
        console.log("No data found in file");
      } else {
        fileText = evt.target!.result;
        console.log(fileText);
        const parsedData: string[][] = parseCSVFromString(fileText as string);

        for (let i: number = 1; i < parsedData.length; i++) {
          jsonData.push({
            startNodeID: parsedData[i][0],
            endNodeID: parsedData[i][1],
          });
        }

        axios
          .post("/api/database/uploadedges", jsonData)
          .then((response: AxiosResponse) => {
            console.log(response);
          });
      }
    };

    fileReader.readAsText(file);
  }

  function handleNodeFileUpload(event: { target: { files: FileList | null } }) {
    const file: FileList | null = event.target.files;
    console.log(`Uploaded file: ${file![0]}`);
    if (file == null) {
      console.log("No file uploaded");
    } else {
      handleNodeImport(file![0]);
    }
    console.log("Handling node import data");
  }

  function handleEdgeFileUpload(event: { target: { files: FileList | null } }) {
    const file: FileList | null = event.target.files;
    console.log(`Uploaded file: ${file![0]}`);
    if (file == null) {
      console.log("No file uploaded");
    } else {
      handleEdgeImport(file![0]);
    }
    console.log("Handling node import data");
  }

  return (
    <>
      <TopBanner2 />
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          minWidth: "100wh",
          marginTop: "10%",
          marginBottom: "10%",
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
              width: "80vw",
              //alignItems: "center",
            }}
            columns={nodeColumns}
            rows={nodeRowData}
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
            // onClick={handleNodeImport}
            sx={{
              backgroundColor: "primary.main", // Change background color
              color: "white", // Change text color
              borderRadius: "8px", // Change border radius
              marginRight: "-1px", // Adjust spacing
            }}
          >
            Import CSV File
            <VisuallyHiddenInput type="file" onChange={handleNodeFileUpload} />
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
            columns={edgeColumns}
            rows={edgeRowData}
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
            // onClick={handleImport}
            sx={{
              backgroundColor: "primary.main", // Change background color
              color: "white", // Change text color
              borderRadius: "8px", // Change border radius
              marginRight: "-1px", // Adjust spacing
            }}
          >
            Import CSV File
            <VisuallyHiddenInput type="file" onChange={handleEdgeFileUpload} />
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
            columns={serviceColumns}
            rows={serviceRowData}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        </Box>
      </div>
    </>
  );
}

export default DisplayDatabase;

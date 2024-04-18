import * as React from "react";
import { Button, Box, Typography, Tabs, Tab } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
//import background from "frontend/public/Background.jpg";
import axios, { AxiosResponse } from "axios";
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridRowModel,
  GridRowModesModel,
  GridRowModes,
  GridRowId,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { MapNodeType } from "common/src/map/MapNodeType.ts";
import { MapEdgeType } from "common/src/map/MapEdgeType.ts";
import MapNode from "common/src/map/MapNode.ts";
import MapEdge from "common/src/map/MapEdge.ts";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import "./TableSlide.css";

type NodeParams = { id: number } & MapNodeType;

type ServiceParams = {
  id: number;
  userID: number;
  nodeID: string;
  serviceType: string;
  services: string;
  status: string;
};

type EdgeParams = { id: number } & MapEdgeType;

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

function ServiceDetailsTable({
  service,
  isVisible,
}: {
  service: ServiceParams;
  isVisible: boolean;
}) {
  return (
    <Box
      mt={2}
      className={`slide-in ${isVisible ? "slide-in--visible" : "slide-in--hidden"}`}
      sx={{ zIndex: -9999 }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{ textDecoration: "underline" }}
      >
        Service Details
      </Typography>
      <Box>
        {service.services && (
          <div>
            {Object.entries(JSON.parse(service.services)).map(
              ([key, value]) => (
                <Typography key={key}>
                  {key}: {String(value)}
                </Typography>
              ),
            )}
          </div>
        )}
      </Box>
    </Box>
  );
}

function DisplayDatabase() {
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {},
  );
  const [isServiceDetailsVisible, setServiceDetailsVisible] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isDetailsTableInitialized, setDetailsTableInitialized] =
    useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(
    null,
  );
  const [selectedServiceDetails, setSelectedServiceDetails] =
    useState<ServiceParams | null>(null);
  const [hasSlideAnimationTriggered, setHasSlideAnimationTriggered] =
    useState(false);

  // Function to handle the click event of the details button
  const handleDetailsClick = (service: ServiceParams) => {
    if (selectedServiceId === service.id) {
      setServiceDetailsVisible(!isServiceDetailsVisible); // Toggle visibility
    } else {
      setSelectedServiceId(service.id);
      setSelectedServiceDetails(service);
      setHasSlideAnimationTriggered(true); // Trigger slide animation on the first click
      setTimeout(
        () => {
          setServiceDetailsVisible(true); // Show details for the selected service after the animation
        },
        hasSlideAnimationTriggered ? 0 : 50,
      ); // Delay the visibility change if animation has triggered
    }
  };

  // Update visibility when initialization state changes
  useEffect(() => {
    if (isDetailsTableInitialized) {
      setServiceDetailsVisible(true);
    }
  }, [isDetailsTableInitialized]);

  const handleEditClick = (id: GridRowId) => () => {
    console.log(rowModesModel);
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };
  const handleSaveClick = (id: GridRowId) => () => {
    console.log(rowModesModel);
    setRowModesModel((prevRowModesModel) => ({
      ...prevRowModesModel,
      [id]: { mode: GridRowModes.View },
    }));
  };

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
    { field: "edgeID", headerName: "EdgeID", width: 200 },
    { field: "startNodeID", headerName: "StartNodeID", width: 150 },
    { field: "endNodeID", headerName: "EndNodeID", width: 150 },
  ]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [expandedRowId, setExpandedRowId] = useState<number | null>(null);

  const serviceColumns: GridColDef[] = [
    { field: "userID", headerName: "User ID", width: 100 },
    { field: "nodeID", headerName: "Node ID", width: 125 },
    { field: "serviceType", headerName: "Service Type", width: 125 },
    {
      field: "details",
      headerName: "Details",
      width: 125,
      renderCell: (params) => (
        <Button
          variant="outlined"
          onClick={() => handleDetailsClick(params.row)}
        >
          Details
        </Button>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Unassigned", "Assigned", "InProgress", "Closed"],
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ row }) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          className="textPrimary"
          onClick={handleEditClick(row.id)}
          color="inherit"
        />,
        <GridActionsCellItem
          icon={<SaveIcon />}
          label="Save"
          sx={{
            color: "primary.main",
          }}
          onClick={handleSaveClick(row.id)}
        />,
      ],
    },
  ];

  // const [isFinished] = useState(false);
  const [nodeRowData, setNodeRowData] = useState<NodeParams[]>([]);
  const [edgeRowData, setEdgeRowData] = useState<EdgeParams[]>([]);
  const [serviceRowData, setServiceRowData] = useState<ServiceParams[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentFile, setCurrentFile] = useState<File>();

  const getNodeData = async () => {
    const { data } = await axios.get("/api/database/nodes");
    console.log("Got data");
    console.log(data);

    const rowNodeData: NodeParams[] = [];
    for (let i: number = 0; i < data.length; i++) {
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
    console.log(data);

    const rowData: EdgeParams[] = [];
    for (let i = 0; i < data.length; i++) {
      const tableFormattedEdge: EdgeParams = {
        id: i,
        edgeID: data[i].edgeID,
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
        id: data[i].id,
        userID: data[i].userID,
        nodeID: data[i].nodeID,
        serviceType: data[i].serviceType,
        services: data[i].services,
        status: data[i].status,
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

        console.log(parsedData);

        for (let i: number = 0; i < parsedData[0].length; i++) {
          if (parsedData[0][i] != MapNode.csvHeader.split(", ")[i]) {
            console.error(
              "Imported node data does not include the correct header fields",
            );
            return;
          }
        }

        console.log("Imported node data is in the correct format");

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

        for (let i: number = 0; i < parsedData[0].length; i++) {
          if (parsedData[0][i] != MapEdge.csvHeader.split(", ")[i]) {
            console.error(
              `Imported edge data does not include the correct header fields`,
            );
            return;
          }
        }

        console.log("Imported edge data is in the correct format");

        for (let i: number = 1; i < parsedData.length; i++) {
          jsonData.push({
            edgeID: parsedData[i][0],
            startNodeID: parsedData[i][1],
            endNodeID: parsedData[i][2],
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

  const processRowUpdate = React.useCallback(
    async (newRow: GridRowModel, id: number) => {
      console.log(`ID: ${id}`);
      const data = {
        id: newRow["id"],
        userID: newRow["userID"],
        nodeID: newRow["nodeID"],
        serviceType: newRow["serviceType"],
        services: newRow["services"],
        status: newRow["status"],
      };

      // Make the HTTP request to save in the backend
      await axios.put(`/api/database/updatesr/${id}`, data);
      return newRow;
    },
    [],
  );

  const handleProcessRowUpdateError = React.useCallback((error: Error) => {
    console.log(error);
    alert("status didn't save");
  }, []);

  //tabs
  /*function CenteredTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

    return (
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Node Data" />
          <Tab label="Edge Data" />
          <Tab label="Service Data" />
        </Tabs>
      </Box>
    );
  }*/

  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const handleTabChange = (e, tabIndex: React.SetStateAction<number>) => {
    console.log(tabIndex);
    setCurrentTabIndex(tabIndex);
  };

  return (
    <>
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          minWidth: "100wh",
          marginTop: "150px",
          marginBottom: "150px",
        }}
      >
        <React.Fragment>
          <Tabs
            value={currentTabIndex}
            onChange={handleTabChange}
            orientation={"vertical"}
            sx={{
              //marginTop: "150px"
            }}
          >
            <Tab label='Node Data' />
            <Tab label='Edge Data' />
            <Tab label='Service Data' />
          </Tabs>
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
          {currentTabIndex === 0 && (
            <Box >
              <Typography variant='h5'>Node Data Table</Typography>
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
              marginTop: "15px",
              marginBottom: "30px",
            }}
          >
            Import Nodes (CSV File)
            <VisuallyHiddenInput type="file" onChange={handleNodeFileUpload} />
          </Button>
            </Box>
          )}

          {currentTabIndex === 1 && (
            <Box>
              <Typography variant='h5'>Edge Data Table</Typography>
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
              marginTop: "15px",
              marginBottom: "30px",
            }}
          >
            Import Edges (CSV File)
            <VisuallyHiddenInput type="file" onChange={handleEdgeFileUpload} />
          </Button>
            </Box>
          )}

          {currentTabIndex === 2 && (
            /*<Box>*/

          <Box display="flex" sx={{ zIndex: 9999 }}>
            {/* Container for the service request table and service details table */}
            <Box flex="1" sx={{ zIndex: 9999 }}>
              <Typography variant='h5'>Service Data Table</Typography>
              <DataGrid
                slots={{ toolbar: GridToolbar }}
                sx={{
                  padding: "40px",
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  zIndex: 9999,
                  background: "white",
                }}
                columns={serviceColumns}
                rows={serviceRowData}
                editMode={"row"}
                rowModesModel={rowModesModel}
                pageSizeOptions={[5, 10]}
                processRowUpdate={(newRow: GridRowModel) =>
                  processRowUpdate(newRow, parseInt(newRow["id"]))
                }
                onProcessRowUpdateError={handleProcessRowUpdateError}
              />
            <Box width="400px" ml={2}>
              {selectedServiceDetails && (
                <ServiceDetailsTable
                  service={selectedServiceDetails}
                  isVisible={isServiceDetailsVisible}
                />
              )}
            </Box>
           </Box>
          </Box>
          /*</Box>*/
          )}
        </Box>
       </React.Fragment>
      </div>
    </>
  );
}
//            onRowModesModelChange={handleRowModesModelChange}
//             onRowEditStop={handleRowEditStop}

export default DisplayDatabase;

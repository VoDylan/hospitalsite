import * as React from "react";
import {Button, Box, Typography, Accordion, AccordionSummary, AccordionDetails, Stack, Tabs} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
import Tab from "@mui/material/Tab";
import { PieChart, BarChart } from "@mui/x-charts";
import {employeeCsvHeader, EmployeeFieldsType} from "common/src/employee/EmployeeFieldsType.ts";

type NodeParams = { id: number } & MapNodeType;

type ServiceParams = {
  id: number;
  employeeID: number;
  employeeName: string;
  nodeID: string;
  serviceType: string;
  services: string;
  status: string;
};

type EdgeParams = { id: number } & MapEdgeType;

type EmployeeParams = {
  id: number;
  firstName: string;
  lastName: string;
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

  const [employeeColumns] = useState<GridColDef[]>([
    { field: "id", headerName: "Employee ID", width: 100 },
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
  ]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [expandedRowId, setExpandedRowId] = useState<number | null>(null);

  const serviceColumns: GridColDef[] = [
    //{ field: "userID", headerName: "User ID", width: 100 },
    { field: "employeeID", headerName: "Employee ID", width: 100 },
    { field: "employeeName", headerName: "Employee Name", width: 125 },
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
  const [employeeRowData, setEmployeeRowData] = useState<EmployeeParams[]>([]);
  const [employeeNameMapping, setEmployeeNameMapping] = useState<{ [key: string]: string }>({});


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
      console.log(data[i].employee);
      const employeeFirstName = data[i].employee ? data[i].employee.firstName || 'Unknown' : 'Unknown';
      const employeeLastName = data[i].employee ? data[i].employee.lastName || 'Unknown' : 'Unknown';
      const employeeFullName = `${employeeFirstName} ${employeeLastName}`;
      const tableFormattedServReq: ServiceParams = {
        id: data[i].id,
        employeeID: data[i].employeeID,
        employeeName: employeeFullName,
        nodeID: data[i].nodeID,
        serviceType: data[i].serviceType,
        services: data[i].services,
        status: data[i].status,
      };
      rowData.push(tableFormattedServReq);
    }
    setServiceRowData(rowData);
  };

  const getEmployeeData = async () => {
    const { data } = await axios.get("/api/database/employees");
    console.log("Gathered Employees");
    console.log(data);

    const nameMapping: { [key: string]: string } = {}; // Create the name mapping object
    const rowData = [];
    for (let i = 0; i < data.length; i++) {
      const { employeeID: id, firstName, lastName } = data[i]; // Destructure correctly
      const tableFormattedEmployee: EmployeeParams = {
        id: data[i].employeeID,
        firstName: data[i].firstName,
        lastName: data[i].lastName
      };
      rowData.push(tableFormattedEmployee);
      nameMapping[id] = `${firstName} ${lastName}`;
    }
    setEmployeeRowData(rowData);
    setEmployeeNameMapping(nameMapping);
  };

  useEffect(() => {
    getNodeData();
    getEdgeData();
    getServiceData();
    getEmployeeData();
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
          })
          .catch((e) => {
            console.error("Error posting employee data:",e);
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

  function handleEmployeeImport(file: File) {
    const fileReader: FileReader = new FileReader();

    let fileText: string | ArrayBuffer = "";

    const jsonData: EmployeeFieldsType[] = [];

    fileReader.onload = (evt: ProgressEvent<FileReader>) => {
      if (evt.target!.result == null) {
        console.log("No data found in file");
      } else {
        fileText = evt.target!.result;
        console.log(fileText);

        const parsedData: string[][] = parseCSVFromString(fileText as string);

        console.log("Parsed data:");
        console.log(parsedData);

        for (let i: number = 0; i < parsedData[0].length; i++) {
          if (parsedData[0][i] != employeeCsvHeader.split(", ")[i]) {
            console.error(
              "Imported employee data does not include the correct header fields",
            );
            return;
          }
        }

        console.log("Imported employee data is in the correct format");

        for (let i: number = 1; i < parsedData.length; i++) {
          if( parsedData[i].length != 3 ) {
            continue;
          }
          jsonData.push({
            employeeID: parseInt(parsedData[i][0]),
            firstName: parsedData[i][1],
            lastName: parsedData[i][2],
          });
          console.log("Placed " + parsedData[i][2]);
        }

        console.log("JSON data:");
        console.log(jsonData);

        axios
          .post("/api/database/uploademployees", jsonData)
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

  function handleEmployeeFileUpload(event: { target: { files: FileList | null } }) {
    const file: FileList | null = event.target.files;
    console.log(`Uploaded file: ${file![0]}`);
    if (file == null) {
      console.log("No file uploaded");
    } else {
      handleEmployeeImport(file![0]);
    }
    console.log("Handling node import data");
  }

  const processRowUpdate = React.useCallback(
    async (newRow: GridRowModel, id: number) => {
      console.log(`ID: ${id}`);
      const data = {
        id: newRow["id"],
        employeeID: newRow["employeeID"],
        //userID: newRow["userID"],
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

  //Const for countServiceType
  const [chartType, setChartType] = useState<'bar' | 'pie'>('bar');
  const [serviceTypeLabels, setServiceTypeLabels] = useState<string[]>([]);
  const [serviceTypeCountsData, setServiceTypeCountsData] = useState<number[]>([]);

  //Function to count service types for graph display
  const countSpecificServiceTypes = (serviceRowData: ServiceParams[]) => {
    const serviceTypeCounts: { [key: string]: number } = {
      "medicine-delivery": 0,
      "gift-delivery": 0,
      "sanitation-request": 0,
      "device-delivery": 0,
      "security-request": 0,
      "flower-delivery": 0,
      "room-scheduling": 0,
      "calendar-appointment": 0,
    };

    serviceRowData.forEach((service) => {
      const { serviceType } = service;
      serviceTypeCounts[serviceType]++;
    });

    return serviceTypeCounts;
  };

  useEffect(() => {
    const countServiceTypes = () => {
      const serviceTypeCounts = countSpecificServiceTypes(serviceRowData);
      const labels = Object.keys(serviceTypeCounts);
      const counts = Object.values(serviceTypeCounts);
      setServiceTypeLabels(labels);
      setServiceTypeCountsData(counts);
    };

    countServiceTypes();
  }, [serviceRowData]);

  //const for count status types
  const [statusLabels, setStatusLabels] = useState<string[]>([]);
  const [statusCountsData, setStatusCountsData] = useState<number[]>([]);

  //Function that counts each instance of status type
  const countSpecificStatusTypes = (serviceRowData: ServiceParams[]) => {
    const statusCounts: { [key: string]: number } = {
      "Unassigned": 0,
      "Assigned": 0,
      "InProgress": 0,
      "Closed": 0,
    };

    serviceRowData.forEach((service) => {
      const { status } = service;
      statusCounts[status]++;
    });

    return statusCounts;
  };

  useEffect(() => {
    const countStatusTypes = () => {
      const statusCounts = countSpecificStatusTypes(serviceRowData);
      const labels = Object.keys(statusCounts);
      const counts = Object.values(statusCounts);
      setStatusLabels(labels);
      setStatusCountsData(counts);
    };

    countStatusTypes();
  }, [serviceRowData]);

  //Const for countEmployeeID
  const [employeeIDLabels, setEmployeeIDLabels] = useState<string[]>([]);
  const [employeeIDCountsData, setEmployeeIDCountsData] = useState<number[]>([]);

  //Function to count employee IDs for graph display
  // Use the effect to count employee IDs and update state
  useEffect(() => {

    const countEmployeeIDs = (serviceRowData: ServiceParams[]) => {
      const employeeIDCounts: { [key: string]: number } = {};
      const employeeIDLabels: string[] = [];

      serviceRowData.forEach((service) => {
        const { employeeID } = service;
        if (employeeIDCounts[employeeID]) {
          employeeIDCounts[employeeID]++;
        } else {
          employeeIDCounts[employeeID] = 1;
          // Get the employee name from the mapping
          const employeeName = employeeNameMapping[employeeID]; // Assuming employeeNameMapping is available
          // Add employee name as label
          employeeIDLabels.push(employeeName);
        }
      });

      // Set the state for labels here
      setEmployeeIDLabels(employeeIDLabels);

      return employeeIDCounts;
    };

    const countEmployeeIDsFunction = () => {
      const employeeIDCounts = countEmployeeIDs(serviceRowData);
      const counts = Object.values(employeeIDCounts);
      setEmployeeIDCountsData(counts);
    };

    countEmployeeIDsFunction();
  }, [employeeNameMapping, serviceRowData]);

  // Toggle between bar chart and pie chart
  const toggleChartType = () => {
    setChartType((prevChartType) => (prevChartType === 'bar' ? 'pie' : 'bar'));
  };

  //service tabs
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const handleServiceTabChange = (e, tabIndex: React.SetStateAction<number>) => {
    //console.log(tabIndex);
    setCurrentServiceIndex(tabIndex);
  };

  //employee tabs
  const [currentEmployeeIndex, setCurrentEmployeeIndex] = useState(0);
  const handleEmployeeTabChange = (e, tabIndex: React.SetStateAction<number>) => {
    //console.log(tabIndex);
    setCurrentEmployeeIndex(tabIndex);
  };

  //map tabs
  const [currentMapIndex, setCurrentMapIndex] = useState(0);
  const handleMapTabChange = (e, tabIndex: React.SetStateAction<number>) => {
    //console.log(tabIndex);
    setCurrentMapIndex(tabIndex);
  };

  //node tabs
  /*const [currentNodeIndex, setCurrentNodeIndex] = useState(0);
  const handleNodeTabChange = (e, tabIndex: React.SetStateAction<number>) => {
    console.log(tabIndex);
    setCurrentNodeIndex(tabIndex);
  };*/

  //edge tabs
  /*const [currentEdgeIndex, setCurrentEdgeIndex] = useState(0);
  const handleEdgeTabChange = (e, tabIndex: React.SetStateAction<number>) => {
    console.log(tabIndex);
    setCurrentEdgeIndex(tabIndex);
  };*/

  return (
    <Stack
      direction={"column"}
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minWidth: "100wh",
        marginTop: "150px",
        marginBottom: "10vh",
        width: "100%",
      }}
    >
      <Accordion
        defaultExpanded
        elevation={3}
        sx={{
          width: "90%",
          backgroundColor: "white"
      }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: "black"}}/>}>
          <Typography color={"black"}>
            SERVICES DATA
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <React.Fragment>
            <Tabs
              value={currentServiceIndex}
              onChange={handleServiceTabChange}
              orientation={"horizontal"}
            >
              <Tab label='TABLE' />
              <Tab label='STATUS' />
              <Tab label='SERVICES' />
            </Tabs>
            <Box //this box is for the service details sliding box
              display={"flex"}
              alignItems="center"
              //justifyContent="center"
              //flexDirection="column"
            >
            <Box
              display={"flex"}
              flex="1"
              ml={3}
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
            >
              {/* Container for the service request table and service details table */}
              {currentServiceIndex === 0 && (
                <Box
                  display="flex"
                  mt={2}
                  alignItems="center"
                  flexDirection="column"
                  sx={{width: '100%'}}
                >
                  {/*<Typography variant='h5'>Service Data Table</Typography>*/}
                  <DataGrid
                    slots={{ toolbar: GridToolbar }}
                    sx={{
                      padding: "40px",
                      position: "relative",
                      display: "flex",
                      justifyContent: "center",
                      zIndex: 1,
                      background: "white",
                      width: "100%"
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
                </Box>
              )}
            </Box>
              {currentServiceIndex === 0 && (
             <Box width="400px" ml={2}>
                {selectedServiceDetails && (
                  <ServiceDetailsTable
                    service={selectedServiceDetails}
                    isVisible={isServiceDetailsVisible}
                  />
                )}
             </Box>
              )}
            </Box>
            <Box
              display={"flex"}
              flex="1"
              ml={3}
              mt={2}
              alignItems="center"
              flexDirection="column"
            >
              {/* Container for the service request status graph */}
              {currentServiceIndex === 1 && (
                <>
                  <Button onClick={toggleChartType}>Toggle Chart Type</Button>
                <Box
                  flex="1"
                  display={"flex"}
                  justifyContent="center"
                >
                  {chartType === 'bar' && (
                    <BarChart
                      xAxis={[
                        {
                          scaleType: 'band',
                          data: statusLabels,
                        },
                      ]}
                      series={[
                        {
                          data: statusCountsData,
                        },
                      ]}
                      width={1000}
                      height={300}
                      colors={['#186BD9']}
                    />
                  )}
                  {chartType === 'pie' && (
                    <PieChart
                      series={[
                        {
                          data: statusLabels.map((label, index) => ({
                            id: index,
                            value: statusCountsData[index],
                            label,
                          })),
                        },
                      ]}
                      width={600}
                      height={250}
                      colors={[
                        '#0088FE', // Blue
                        '#00C49F', // Green
                        '#FFBB28', // Yellow
                        '#FF5733', // Reddish Orange
                        '#AF19FF', // Purple
                        '#FF6666', // Red
                        '#33CCCC', // Light Blue
                        '#FF9933', // Orange
                      ]}


                      // Custom color palette
                    />
                  )}
                </Box>
                </>
              )}
            </Box>

            <Box
              display={"flex"}
              flex="1"
              ml={3}
              mt={2}
              alignItems="center"
              flexDirection="column"
            >
              {/* Container for the service request analytics graph */}
            {currentServiceIndex === 2 && (
              <>
                <Box mt={-2.0}>
              <Button onClick={toggleChartType}>Toggle Chart Type</Button>
                </Box>
              <Box
                flex="1"
                display="flex"
                justifyContent="center"
              >
                {chartType === 'bar' && (
                  <BarChart
                    xAxis={[
                      {
                        scaleType: 'band',
                        data: serviceTypeLabels,
                      },
                    ]}
                    series={[
                      {
                        data: serviceTypeCountsData,
                      },
                    ]}
                    width={1250}
                    height={300}
                    colors={['#186BD9']}/>
                )}

                {chartType === 'pie' && (
                  <PieChart
                    series={[
                      {
                        data: serviceTypeLabels.map((label, index) => ({
                          id: index,
                          value: serviceTypeCountsData[index],
                          label,
                        })),
                      },
                    ]}
                    width={775}
                    height={250}
                    colors={[
                      '#0088FE', // Blue
                      '#00C49F', // Green
                      '#FFBB28', // Yellow
                      '#FF5733', // Reddish Orange
                      '#AF19FF', // Purple
                      '#FF6666', // Red
                      '#33CCCC', // Light Blue
                      '#FF9933', // Orange
                    ]}
                  />
                )}
              </Box>
              </>
            )}
            </Box>
          </React.Fragment>
        </AccordionDetails>
      </Accordion>

      <Accordion
        defaultExpanded
        elevation={3}
        sx={{
          width: "90%",
          backgroundColor: "white"
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: "black"}}/>}>
          <Typography color={"black"}>
            EMPLOYEE DATA
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <React.Fragment>
            <Tabs
              value={currentEmployeeIndex}
              onChange={handleEmployeeTabChange}
              orientation={"horizontal"}
            >
              <Tab label='TABLE' />
              <Tab label='EMPLOYEE' />
              {/*<Tab label='ANALYTICS' />*/}
            </Tabs>
          <Box
            display={"flex"}
            flex="1"
            ml={3}
            mt={2}
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
            {/* Container for the employee graph */}
            {currentEmployeeIndex === 1 && (
              <>
                <Button onClick={toggleChartType}>Toggle Chart Type</Button>
              <Box
                flex="1"
                display={"flex"}
                justifyContent="center"
              >
            {chartType === 'bar' && (
              <BarChart
                xAxis={[
                  {
                    scaleType: 'band',
                    data: employeeIDLabels,
                  },
                ]}
                series={[
                  {
                    data: employeeIDCountsData,
                  },
                ]}
                width={1250}
                height={300}
                colors={['#186BD9']}
              />
            )}

            {chartType === 'pie' && (
              <PieChart
                series={[
                  {
                    data: employeeIDLabels.map((label, index) => ({
                      id: index,
                      value: employeeIDCountsData[index],
                      label,
                    })),
                  },
                ]}
                width={700}
                height={250}
                colors={[
                  '#0088FE', // Blue
                  '#00C49F', // Green
                  '#FFBB28', // Yellow
                  '#FF5733', // Reddish Orange
                  '#AF19FF', // Purple
                  '#FF6666', // Red
                  '#33CCCC', // Light Blue
                  '#FF9933', // Orange
                ]}

              />
            )}
              </Box>
              </>
            )}
          </Box>

            <Box
              display={"flex"}
              flex="1"
              ml={3}
              mt={2}
              alignItems="center"
              flexDirection="column"
            >
              {/* Container for the employee table */}
              {currentEmployeeIndex === 0 && (
                <Box
                  display="flex"
                  mt={2}
                  alignItems="center"
                  flexDirection="column"
                  sx={{width: '50%'}}
                >
                  <DataGrid
                    slots={{ toolbar: GridToolbar }}
                    sx={{
                      padding: "40px",
                      position: "relative",
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                      backgroundColor: "white"
                    }}
                    columns={employeeColumns}
                    rows={employeeRowData}
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
                    Import Employees (CSV File)
                    <VisuallyHiddenInput type="file" onChange={handleEmployeeFileUpload} />
                  </Button>
                </Box>
              )}
            </Box>
          </React.Fragment>
        </AccordionDetails>
      </Accordion>

      <Accordion
        defaultExpanded
        elevation={3}
        sx={{
          width: "90%",
          backgroundColor: "white"
        }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color: "black"}}/>}>
          <Typography color={"black"}>
            MAP DATA
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <React.Fragment>
            <Tabs
              value={currentMapIndex}
              onChange={handleMapTabChange}
              orientation={"horizontal"}
            >
              <Tab label='NODES' />
              <Tab label='EDGES' />
              {/*<Tab label='GRAPH' />*/}
            </Tabs>
            <Box
              display={"flex"}
              flex="1"
              ml={3}
              mt={2}
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
            >
              {/* Container for the Node data */}
              {currentMapIndex === 0 && (
                <Box
                  display="flex"
                  mt={2}
                  alignItems="center"
                  flexDirection="column"
                  sx={{width: '100%'}}
                >
                  <DataGrid
                    slots={{ toolbar: GridToolbar }}
                    sx={{
                      padding: "40px",
                      position: "relative",
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                      backgroundColor: "white"
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
            </Box>
            <Box
              display={"flex"}
              flex="1"
              ml={3}
              mt={2}
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
            >
              {/* Container for the Edge data */}
              {currentMapIndex === 1 && (
                <Box
                  display="flex"
                  mt={2}
                  alignItems="center"
                  flexDirection="column"
                  sx={{width: '100%'}}
                >
                  <DataGrid
                    slots={{ toolbar: GridToolbar }}
                    sx={{
                      padding: "40px",
                      position: "relative",
                      display: "flex",
                      justifyContent: "center",
                      backgroundColor: "white",
                      width: "50%"
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
            </Box>
          </React.Fragment>
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
}

//            onRowModesModelChange={handleRowModesModelChange}
//             onRowEditStop={handleRowEditStop}

export default DisplayDatabase;

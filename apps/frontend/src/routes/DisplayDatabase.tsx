import * as React from "react";
import { Button, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
//import background from "frontend/public/Background.jpg";
import axios from "axios";

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

type ServiceParams = {
  id: number;
  userID: number;
  nodeID: string;
  serviceType: string;
};

type EdgeParams = {
  id: number;
  startNodeID: string;
  endNodeID: string;
};

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

function DisplayDatabase() {
  const [nodeColumns] = useState<GridColDef[]>([
    { field: "nodeID", headerName: "NodeID", width: 100 },
    { field: "xcoord", headerName: "XCoord", width: 100 },
    { field: "ycoord", headerName: "YCoord", width: 100 },
    { field: "floor", headerName: "Floor", width: 100 },
    { field: "building", headerName: "Building", width: 100 },
    { field: "nodeType", headerName: "NodeType", width: 100 },
    { field: "longName", headerName: "LongName", width: 100 },
    { field: "shortName", headerName: "ShortName", width: 100 },
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

  const getNodeData = async () => {
    const { data } = await axios.get("/api/database/nodes");
    console.log("Got data");
    setNodeRowData(data);
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
    setEdgeRowData(data);
    console.log(data);

    const rowData = [];
    for (let i = 0; i < data.length; i++) {
      const tableFormattedEdge = {
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

  function handleImport() {
    console.log();
  }

  //csv file import to node table
  /* function handleNodeImport() {
    //console.log();

    const app = express();
    const port = 3000;

    //  new Pool instance to connect to the postgres database
    const poolNodes = new Pool({
      user: "postgres",
      host: "",
      database: "",
      password: "postgres",
      port: 5432,
    });

    //define route to receive the array of json objects
    // VisuallyHiddenInput file?
    app.post("file", async (req: Request, res: Response) => {
      const client = await poolNodes.connect();

      try {
        const data = req.body; // json array sent in the request body

        // begin transaction
        await client.query("BEGIN");

        // inserting json object into the database
        for (const obj of data) {
          await client.query(
            "INSERT INTO table_name (column1, column2) VALUES ($1, $2)",
            [obj.property1, obj.property2],
          );
        }

        await client.query("COMMIT");

        res
          .status(200)
          .send("Data successfully inserted into Postgres database");
      } catch (error) {
        // Rollback the transaction in case of an error
        await client.query("ROLLBACK");
        console.error("Error inserting data into Postgres:", error);
        res.status(500).send("Error inserting data into Postgres database");
      } finally {
        // release client back to the pool
        client.release();
      }
    });

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }*/

  /*const fileReader = new FileReader();
  const [file, setFile] = useState();
  const [array, setArray] = useState([]);

  const handleImport = (e) => {
    setFile(e.target.files[0]);
  };

  const csvFileToArray = string => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const array = csvRows.map(i => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });

    setArray(array);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
      };

      fileReader.readAsText(file);
    }
  };*/

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        minWidth: "100wh",
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
  );
}

export default DisplayDatabase;

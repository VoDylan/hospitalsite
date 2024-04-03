import * as React from "react";
import { Button, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
//import background from "frontend/public/Background.jpg";
import axios from "axios";
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridToolbar,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";

type nodeParams = {
  nodeID: string;
  xcoord: number;
  ycoord: number;
  floor: string;
  building: string;
  nodeType: string;
  longName: string;
  shortName: string;
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

const handleImport = () => console.log();

//to retrieve data as array from database
const getData = async (fullURL: string) => {
  try {
    const response = await axios.get(fullURL);
    if (response != null) {
      return response.data;
    } else {
      console.log("No data found.");
      return null;
    }
  } catch (error) {
    console.error("Error retrieving data:", error);
    return null;
  }
};

let rows: GridRowsProp = [];
const rowData: nodeParams[] = [];

const columns: GridColDef[] = [
  { field: "nodeID", headerName: "NodeID", width: 100 },
  { field: "xcoord", headerName: "XCoord", width: 100 },
  { field: "ycoord", headerName: "YCoord", width: 100 },
  { field: "floor", headerName: "Floor", width: 100 },
  { field: "building", headerName: "Building", width: 100 },
  { field: "nodeType", headerName: "NodeType", width: 100 },
  { field: "longName", headerName: "LongName", width: 100 },
  { field: "shortName", headerName: "ShortName", width: 100 },
];

function DisplayDatabase() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function obtainData() {
      setData(await getData("/api/database/nodes"));
    }
    obtainData().then(() => {
      for (let i = 0; i < data.length; i++) {
        rowData.push({
          nodeID: data[i]["nodeID"],
          xcoord: data[i]["xcoord"],
          ycoord: data[i]["ycoord"],
          floor: data[i]["floor"],
          building: data[i]["building"],
          nodeType: data[i]["nodeType"],
          longName: data[i]["longName"],
          shortName: data[i]["shortName"],
        });
        console.log("Works!");
      }
      rows = rowData;
    });
  });

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
          columns={columns}
          rows={rows}
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

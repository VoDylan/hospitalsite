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

// type NodeParams = {
//   nodeID: string;
//   xcoord: number;
//   ycoord: number;
//   floor: string;
//   building: string;
//   nodeType: string;
//   longName: string;
//   shortName: string;
// };

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
  const [data, setData] = useState(null);
  //const [rows] = useState<GridRowsProp>([]);
  const [columns] = useState<GridColDef[]>([
    { field: "nodeID", headerName: "NodeID", width: 100 },
    { field: "xcoord", headerName: "XCoord", width: 100 },
    { field: "ycoord", headerName: "YCoord", width: 100 },
    { field: "floor", headerName: "Floor", width: 100 },
    { field: "building", headerName: "Building", width: 100 },
    { field: "nodeType", headerName: "NodeType", width: 100 },
    { field: "longName", headerName: "LongName", width: 100 },
    { field: "shortName", headerName: "ShortName", width: 100 },
  ]);
  // const [isFinished] = useState(false);
  //const [rowData, setRowData] = useState<nodeParams[]>([]);

  const getData = async () => {
    const { data } = await axios.get("/api/database/nodes");
    console.log("Got data");
    console.log(data);
    setData(data);
  };

  useEffect(() => {
    getData();
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
          columns={columns}
          rows={[
            {
              id: 1,
              nodeID: "tasdf",
              xcoord: 234,
              ycoord: 21345,
              floor: "asd",
              building: "asdgff",
              nodeType: "adfa",
              longName: "asdgfasdf",
              shortName: "asdfafsd",
            },
          ]}
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

import * as React from "react";
import { Button, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
//import background from "frontend/public/Background.jpg";
//import axios from 'axios';
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridToolbar,
} from "@mui/x-data-grid";

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

const rows: GridRowsProp = [{ id: 1, col1: "Hello", col2: "World" }];

const columns: GridColDef[] = [
  { field: "col1", headerName: "Node Data", width: 150 },
  { field: "col2", headerName: "Edge Data", width: 150 },
];

function DisplayDatabase() {
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

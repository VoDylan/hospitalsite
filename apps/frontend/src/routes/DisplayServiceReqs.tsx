import * as React from "react";
import { Box } from "@mui/material";
import TopBanner from "../components/TopBanner.tsx";

//import { styled } from "@mui/material/styles";
//import CloudUploadIcon from "@mui/icons-material/CloudUpload";
//import background from "frontend/public/Background.jpg";
//import axios from 'axios';

import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridToolbar,
} from "@mui/x-data-grid";

const rows: GridRowsProp = [];
const columns: GridColDef[] = [];

function DisplayServiceReqs() {
  return (
    <>
      <TopBanner />
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
        </Box>
      </div>
    </>
  );
}

export default DisplayServiceReqs;

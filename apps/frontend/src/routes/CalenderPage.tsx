import * as React from 'react';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { Grid, Stack, Typography} from "@mui/material";
import TopBanner from "../components/banner/TopBanner.tsx";
import calenderbackground from "../images/calenderbackground.jpg";
import dayjs, {Dayjs} from "dayjs";
//import TextField from "@mui/material/TextField";
//import { PickersDay, PickersDayProps} from "@mui/x-date-pickers";
//import { createTheme } from '@mui/material/styles';

export default function CalenderPage() {

  const currentDate: Dayjs = dayjs();

    return (
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          width: "100vw",
          height: "auto",
          display: "flex",
          alignItems: "center", // Center vertically
          justifyContent: "center", // Center horizontally
          //backgroundColor: "white",
          minHeight: "100vh",
          maxWidth: "100%",
          overflowX: "hidden",
          backgroundImage: `url(${calenderbackground})`,
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <TopBanner/>
        <Grid
          container
          justifyContent="center"
          boxShadow={4}
          sx={{
            backgroundColor: "white",
            width: "80vw", //Adjust this to change the width
            height: "auto",
            mt: "18vh",
            mb: "5vh",
          }}
        >
          <Grid
            item
            xs={12}
            sx={{
              backgroundColor: "#186BD9",
            }}
          >
            <Typography color={"white"} align={"center"} fontSize={40}>
              Calender Availability
            </Typography>
          </Grid>
          <Grid
            item xs={12}
            sm={6}
          >
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
            >
              <StaticDatePicker
                orientation="landscape"
                minDate={currentDate}
                sx={{
                  '.MuiPickersToolbar-root': {
                    color: '#186BD9',
                    borderRadius: '2px',
                    borderWidth: '1px',
                    borderColor: '#186BD9',
                    border: '1px solid',
                    backgroundColor: 'white',
                    width: '200px'
                  },
                  /*'.MuiStaticDatePicker-calendar': {
                    width: '400px', // Adjust the width of the calendar part
                  },
                  '.MuiInputBase-root': {
                    width: '200px', // Adjust the width of the "Select date" part
                  },
                  '.MuiStaticDatePicker-picker': {
                    margin: '0 20px', // Adjust horizontal spacing between the two elements
                  },*/
                }}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </Stack>
    );
  }
//}

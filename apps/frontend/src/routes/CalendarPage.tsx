import * as React from 'react';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import {Badge, Grid, SelectChangeEvent, Stack, Typography, TextField} from "@mui/material";
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay/PickersDay';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import calendar from "../images/servicePageImages/calendar.jpg";
import dayjs, {Dayjs} from "dayjs";
import {DayCalendarSkeleton} from "@mui/x-date-pickers";
import {ChangeEvent, useEffect, useState} from "react";
import {CalendarPageFormSubmission} from "../common/formSubmission/CalendarPageFormSubmission.ts";
import ServiceNavTabs from "../components/serviceNav/tabNav/ServiceNavTabs.tsx";
import {CenterAlignedTextbox} from "../components/textbox/CenterAlignedTextbox.tsx";
import EmployeeDropDown from "../components/dropdown/EmployeeDropDown.tsx";
import {CalendarAvailabiltiySubmitButton} from "../components/buttons/AppointmentSubmitButton.tsx";
import axios from "axios";
import {DropDown} from "../components/dropdown/DropDown.tsx";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    "& .MuiTextField-root": {
      minWidth: "150px", // Adjust width as needed
      maxWidth: "220px",
      minHeight: "75px",
    },
  },
});

export default function CalendarPage() {
  const classes = useStyles();

  const [form, setResponses] = useState<CalendarPageFormSubmission>({
    name: "",
    employee: -1,
    date: "",
    reasonForVisit: "",
    roomNumber: ""
  });

  // Define an interface for the node data
  interface NodeData {
    nodeID: string;
    longName: string;
  }

  // Storing the node numbers in a use state so that we only make a get request once
  const [nodes, updateNodes] = useState<NodeData[]>([]);

  // GET request to retrieve node numbers wrapped in a useEffect function
  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get<NodeData[]>("/api/database/nodes")
      .then((response) => {
        const nodeIDs = response.data.map((node) => node.nodeID);
        const longNames = response.data.map((node) => node.longName);

        const updatedNodes: NodeData[] = [];

        for (let i = 0; i < nodeIDs.length; i++) {
          updatedNodes.push({
            nodeID: nodeIDs[i],
            longName: longNames[i],
          });
        }

        updateNodes(updatedNodes);
      })
      .catch((error) => console.error(error));
  }, []);

  function handleNameInput(e: ChangeEvent<HTMLInputElement>) {
    setResponses({ ...form, name: e.target.value });
  }

  function handleReasonInput(e: ChangeEvent<HTMLInputElement>) {
    setResponses({ ...form, reasonForVisit: e.target.value });
  }

  function handleEmployeeInput(event: SelectChangeEvent) {
    setResponses({ ...form, employee: event.target.value as unknown as number});
    return event.target.value;
  }

  function handleRoomNumberInput(event: SelectChangeEvent) {
    setResponses({ ...form, roomNumber: event.target.value });
    return event.target.value;
  }

  function handleDateInput(date: Dayjs | null) {
    setSelectedDate(date);
    if (date) {
      const dateString = date.format('YYYY-MM-DD'); // Convert Dayjs to string in 'YYYY-MM-DD' format
      setResponses({ ...form, date: dateString });
      return dateString;
    }
  }

  function clear() {
    setResponses({
      name: "",
      employee: -1,
      date: "",
      reasonForVisit: "",
      roomNumber: "",
    });
  }

  const currentDate: Dayjs = dayjs();

  //this function can be replaced with database employee date availability, but just random days for now
  function getDate(min: number, max: number) {
    return Math.round(Math.random() * (max - min) + min);
  }

  function fetch(date: Dayjs, { signal }: { signal: AbortSignal }) {
    return new Promise<{ daysToHighlight: number[] }>((resolve, reject) => {
      const timeout = setTimeout(() => {
        const daysInMonth = date.daysInMonth();
        const daysToHighlight = [1, 2, 3, 4, 5].map(() => getDate(1, daysInMonth));
        //const dateInfo = "Doctor is available!";

      resolve({ daysToHighlight });
    }, 500);

      signal.onabort = () => {
        clearTimeout(timeout);
        reject(new DOMException('aborted', 'AbortError'));
      };
    });
  }

  function ServerDay(props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }) {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

    const isSelected =
      !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;

    return (
        <Badge
          key={props.day.toString()}
          overlap="circular"
          badgeContent={isSelected ? <EventAvailableIcon/> : undefined}
        >
          <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day}/>
        </Badge>
    );
  }

  const requestAbortController = React.useRef<AbortController | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15]);

  const fetchHighlightedDays = (date: Dayjs) => {
    const controller = new AbortController();
    fetch(date, {
      signal: controller.signal,
    })
      .then(({ daysToHighlight }) => {
        setHighlightedDays(daysToHighlight);
        setIsLoading(false);
      })
      .catch((error) => {
        // ignore the error if it's caused by `controller.abort`
        if (error.name !== 'AbortError') {
          throw error;
        }
      });

    requestAbortController.current = controller;
  };

 /* React.useEffect(() => {
    fetchHighlightedDays(currentDate);
    // abort request on unmount
    return () => requestAbortController.current?.abort();
  }, );*/

  const handleMonthChange = (date: Dayjs) => {
    if (requestAbortController.current) {
      // abort useless requests bc user can swap between months quickly
      requestAbortController.current.abort();
    }
    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());

  /*const updateDate = (date: Dayjs | null) => {
    setSelectedDate(date);
  };*/

  const handleOk = (selectedDate: Dayjs | null) => {

    if (selectedDate) {
      if (highlightedDays.some((day) => day === selectedDate.date())) {
        //console.log('This day has open availability!');
        return 'Selected Date has open availability!';
      } else {
        //console.log('This day does not have open availability!');
        return 'Selected Date does not have open availability!';
      }
    }
  };

    return (
      <Stack
        direction={"column"}
        sx={{
          //width: "150vw",
          height: "auto",
          display: "flex",
          alignItems: "center", // Center vertically
          justifyContent: "center", // Center horizontally
          minHeight: "100vh",
          maxWidth: "100%",
          overflowX: "hidden",
          backgroundImage: `url(${calendar})`,
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            backgroundColor: "transparent",
            mt: "25vh",
          }}
        >
          <ServiceNavTabs />
        </Grid>
        <Grid
          xs={12}
          container
          justifyContent="center"
          boxShadow={5}
          borderRadius={5}
          sx={{
            backgroundColor: "white",
            width: "75%", //Adjust this to change the width of the form
            height: "auto",
            mt: "2vh",
          }}
        >
          <Grid
            item
            xs={12}
            sx={{
              //backgroundColor: "#186BD9",
              backgroundColor: "white",
            }}
            borderRadius={5}
          >
            <Typography color={"black"} align={"center"} fontSize={40}>
              Appointment Scheduling
            </Typography>
          </Grid>
          <Grid
            item xs={12}
            sm={6}
            mt={2}
          >
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
            >
              <StaticDatePicker
                orientation="landscape"
                minDate={currentDate}
                //value={currentDate}
                onAccept={handleOk}
                onChange={handleDateInput}
                loading={isLoading}
                onMonthChange={handleMonthChange}
                renderLoading={() => <DayCalendarSkeleton/>}
                sx={{
                  '.MuiPickersToolbar-root': {
                    color: '#186BD9',
                    //borderRadius: '2px',
                    //borderWidth: '1px',
                    borderColor: '#186BD9',
                    border: '1px solid',
                    backgroundColor: 'white',
                    //width: '200px'
                  },
                  '.MuiPickersDay-dayWithMargin': {
                    //color: '#186BD9',
                  }
                }}
                slots={{
                  day: ServerDay,
                }}
                slotProps={{
                  day: {
                    highlightedDays,
                  } as never, //any...?
                }}
              />
            </LocalizationProvider>
           <h3>{handleOk(selectedDate)}</h3>
          </Grid>
          <Grid
            xs={6}
            container
            direction={"row"}
            justifyContent={"center"}
            sx={{
              backgroundColor: "transparent",
              width: "40vw", //Adjust this to change the width of the form
              height: "auto",
              //mt: "25vh",
              mb: "5vh",
            }}
          >
            <Grid
              item
              xs={12}
            >
              <Typography
                color={"black"}
                align={"center"}
                fontStyle={"Open Sans"}
                fontSize={24}
                mt={1}
              >
                Appointment Service Form
              </Typography>
            </Grid>
            <Grid container sx={{ backgroundColor: "white" }}>
              <Grid item xs={6} mt={2} sx={{align: "center"}}>
                <Typography align={"center"}>Name:</Typography>
                <CenterAlignedTextbox
                  label={"Name"}
                  value={form.name}
                  onChange={handleNameInput}
                  type={"text"}
                />
              </Grid>
              <Grid item xs={6} mt={2} sx={{align: "center"}}>
                <Typography align={"center"}>Employee:</Typography>
                <EmployeeDropDown returnedEmployeeID={form.employee} handleChange={handleEmployeeInput} />
              </Grid>
              <Grid item xs={6}>
                <Typography align={"center"}>Reason For Visiting:</Typography>
                <CenterAlignedTextbox
                  label={"Message"}
                  value={form.reasonForVisit}
                  onChange={handleReasonInput}
                />
              </Grid>
              <Grid item xs={6} sx={{align: "center"}}>
                <Typography align={"center"}>Room:</Typography>
                <DropDown
                  items={nodes.map((node) => ({
                    value: node.nodeID,
                    label: node.longName,
                  }))}
                  label={"Room Number"}
                  returnData={form.roomNumber}
                  handleChange={handleRoomNumberInput}
                />
              </Grid>
              <Grid item xs={6} sx={{align: "center"}}>
                <Typography align={"center"}>Select Open Date From Calendar:</Typography>
                <div className={classes.root}>
                <TextField
                  // sx={{
                  //   mx: "35px" //is there a better way to line this up tp CenterAllginedTextbox elements???
                  // }}
                  id="date"
                  label="Selected Date"
                  value={selectedDate ? selectedDate.format('MM-DD-YYYY') : ''}
                  //value={highlightedDays.length > 0 ? highlightedDays.map(day => day.toString()).join(', ') : ''}
                  onChange={(e) => handleDateInput(dayjs(e.target.value))}
                />
                </div>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  my: 2,
                  justifyContent: "center",
                }}
              >
                <CalendarAvailabiltiySubmitButton
                  text={"SUBMIT"}
                  input={form}
                  clear={clear}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Typography mt={5}>Arayah Remillard</Typography>
      </Stack>
    );
  }
//}

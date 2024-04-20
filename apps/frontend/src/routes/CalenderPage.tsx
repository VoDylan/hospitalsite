import * as React from 'react';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import {Badge, Grid, SelectChangeEvent, Stack, TextField, Typography} from "@mui/material";
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay/PickersDay';
import TopBanner from "../components/banner/TopBanner.tsx";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import calenderbackground from "../images/calenderbackground.jpg";
import dayjs, {Dayjs} from "dayjs";
import {DayCalendarSkeleton} from "@mui/x-date-pickers";
import {ChangeEvent, useState} from "react";
import {CalendarAvailabilityFormSubmission} from "../common/formSubmission/CalendarAvailabilityFormSubmission.ts";
import ServiceNavTabs from "../components/serviceNav/tabNav/ServiceNavTabs.tsx";
import {CenterAlignedTextbox} from "../components/textbox/CenterAlignedTextbox.tsx";
//import {CenterAlignedTextboxDate} from "../components/textbox/CenterAlignedTextboxDate.tsx";
import EmployeeDropDown from "../components/dropdown/EmployeeDropDown.tsx";
import {CalendarAvailabiltiySubmitButton} from "../components/buttons/AppointmentSubmitButton.tsx";

export default function CalenderPage() {

  const [form, setResponses] = useState<CalendarAvailabilityFormSubmission>({
    name: "",
    employee: -1,
    date: "",
    reasonForVisit: ""
  });

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

  /*function handleDateInput(date: Date) {
    const dateString = date.toISOString().split('T')[0]; // convert Date to string in 'YYYY-MM-DD' format
    setResponses({ ...form, date: dateString });
    return dateString;
  }*/

  function handleDateInput(date: Dayjs | null) {
    if (date) {
      const dateString = date.format('YYYY-MM-DD'); // Convert Dayjs to string in 'YYYY-MM-DD' format
      setResponses({ ...form, date: dateString });
      //return dateString;
      return dateString;
    }
  }

  function clear() {
    setResponses({
      name: "",
      employee: -1,
      date: "",
      reasonForVisit: "",
    });
  }

  const currentDate: Dayjs = dayjs();

  //this function can be replaced with database connection, just random days for now
  function getRandomNumber(min: number, max: number) {
    return Math.round(Math.random() * (max - min) + min);
  }

  function fetch(date: Dayjs, { signal }: { signal: AbortSignal }) {
    return new Promise<{ daysToHighlight: number[] }>((resolve, reject) => {
      const timeout = setTimeout(() => {
        const daysInMonth = date.daysInMonth();
        const daysToHighlight = [1, 2, 3, 4].map(() => getRandomNumber(1, daysInMonth));
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

  const updateDate = (date: Dayjs | null) => {
    setSelectedDate(date);
  };

  const handleOk = (selectedDate: Dayjs | null) => {
    //handleDateInput(selectedDate);

    if (selectedDate) {
      //handleDateInput(selectedDate);
      if (highlightedDays.some((day) => day === selectedDate.date())) {
        //console.log('This day has open availability!');
        return 'This day has open availability!';
      } else {
        //console.log('This day does not have open availability!');
        return 'This day has no open availability!';
      }
    }
  };

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
            width: "70vw", //Adjust this to change the width
            height: "auto",
            mt: "18vh",
            mb: "5vh",
          }}
        >
          <Grid
            item
            xs={12}
            paddingBottom={2}
            sx={{
              backgroundColor: "transparent",
            }}
          >
            <ServiceNavTabs />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              backgroundColor: "#186BD9",
            }}
          >
            <Typography color={"white"} align={"center"} fontSize={40}>
              Appointment Availability
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
                //value={currentDate}
                onAccept={handleOk}
                onChange={updateDate}
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
                loading={isLoading}
                onMonthChange={handleMonthChange}
                renderLoading={() => <DayCalendarSkeleton/>}
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
           <p>{handleOk(selectedDate)}</p>
          </Grid>
        </Grid>
        <Grid
          container
          direction={"row"}
          justifyContent={"center"}
          // boxShadow={4}
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
            paddingBottom={2}
            sx={{
              backgroundColor: "transparent",
            }}
          >
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              backgroundColor: "#186BD9",
            }}
          >
            <Typography
              color={"white"}
              align={"center"}
              fontStyle={"Open Sans"}
              fontSize={40}
            >
              Appointment Service Form
            </Typography>
          </Grid>
          <Grid container sx={{ backgroundColor: "white" }} boxShadow={4}>
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
            <Grid item xs={6} sx={{align: "center"}}>
              <Typography align={"center"}>Reason for visiting:</Typography>
              <CenterAlignedTextbox
                label={"Message"}
                value={form.reasonForVisit}
                onChange={handleReasonInput}
              />
            </Grid>
            <Grid item xs={6} sx={{align: "center"}}>
              <Typography align={"center"}>Select Appointment Date:</Typography>
              {/*<CenterAlignedTextboxDate
                label={"Date"}
                value={form.date}
                //onChange={handleDateInput}
                type={"text"}
              />*/}
              <TextField
                id="date"
                label="Selected Date"
                value={selectedDate ? selectedDate.format('YYYY-MM-DD') : ''}
                onChange={(e) => updateDate(dayjs(e.target.value))}
              />
            </Grid>
            <Grid
              item
              xs={12}
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
      </Stack>
    );
  }
//}

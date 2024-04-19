import * as React from 'react';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import {Badge, Grid, Stack, Typography} from "@mui/material";
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay/PickersDay';
import TopBanner from "../components/banner/TopBanner.tsx";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import calenderbackground from "../images/calenderbackground.jpg";
import dayjs, {Dayjs} from "dayjs";
import {DayCalendarSkeleton} from "@mui/x-date-pickers";
import {useState} from "react";

export default function CalenderPage() {

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
    console.log(date);
  };

  const handleOk = (selectedDate) => {
    if (highlightedDays.some((day) => day === selectedDate.date())) {
      //console.log('This day has open availability!');
      return 'This day has open availability!';
    } else {
      //console.log('This day has no open availability.');
      return 'This day does has no open availability!';
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
                //value={currentDate}
                onAccept={handleOk}
                //handleCancel={handleCancel}
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
      </Stack>
    );
  }
//}

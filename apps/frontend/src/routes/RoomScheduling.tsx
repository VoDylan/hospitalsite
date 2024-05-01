import { Grid, Typography, SelectChangeEvent, Stack } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import RadioButtonsGroup from "../components/buttons/RadioButtonsGroup.tsx";
import { DropDown } from "../components/dropdown/DropDown.tsx";
import { RoomSchedulingFormSubmission } from "../common/formSubmission/RoomSchedulingFormSubmission.ts";
import RoomBackground from "../images/servicePageImages/RoomScheduling.jpg";
import { RoomSubmitButton } from "../components/buttons/RoomSubmitButton.tsx";
import { CenterAlignedTextbox } from "../components/textbox/CenterAlignedTextbox.tsx";
import ServiceNavTabs from "../components/serviceNav/tabNav/ServiceNavTabs.tsx";
import EmployeeDropDown from "../components/dropdown/EmployeeDropDown.tsx";
import Checkup from "../images/servicePageImages/FormIcons/Checkup.jpg";
import Conference from "../images/servicePageImages/FormIcons/Conference.jpg";
import MRI from "../images/servicePageImages/FormIcons/MRI.jpg";
import Waiting from "../images/servicePageImages/FormIcons/Waiting.jpg";
import Surge from "../images/servicePageImages/FormIcons/Surge.jpg";
import {PurchaseCard} from "../components/homepage/PurchaseCard.tsx";
import NodeDropDown from "../components/dropdown/NodeDropDown.tsx";

function RoomScheduling() {
  const [form, setFormResponses] = useState<RoomSchedulingFormSubmission>({
    name: "",
    employeeID: -1,
    location: "",
    priority: "",
    service: "",
    frequency: "",
  });

  function handleNameInput(e: ChangeEvent<HTMLInputElement>) {
    setFormResponses({ ...form, name: e.target.value });
  }

  function handleLocationInput(e: SelectChangeEvent) {
    setFormResponses({ ...form, location: e.target.value });
    return e.target.value;
  }

  function handlePriorityInput(e: ChangeEvent<HTMLInputElement>) {
    setFormResponses({ ...form, priority: e.target.value });
  }

  function handleServiceInput(e: SelectChangeEvent) {
    setFormResponses({ ...form, service: e.target.value });
    return e.target.value;
  }

  function handleFrequencyInput(e: SelectChangeEvent) {
    setFormResponses({ ...form, frequency: e.target.value });
    return e.target.value;
  }

  function handleEmployeeIDInput(event: SelectChangeEvent) {
    setFormResponses({ ...form, employeeID: event.target.value as unknown as number});
    return event.target.value;
  }

  function clear() {
    setFormResponses({
      name: "",
      employeeID: -1,
      location: "",
      priority: "",
      service: "",
      frequency: "",});
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        backgroundImage: `url(${RoomBackground})`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        maxWidth: "100%",
        overflowX: "hidden",
      }}
    >
      <Grid
        container
        direction={"row"}
        justifyContent={"center"}
        sx={{
          backgroundColor: "transparent",
          width: "85%", //Adjust this to change the width of the form
          height: "auto",
          mt: "25vh",
          mb: "5vh",
        }}
      >
        <Typography>Jacob Murphy, Spencer Trautz</Typography>
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
        <Grid container sx={{ background: "white", opacity: 0.95}} boxShadow={5} borderRadius={5}>
        <Grid
          item
          xs={12}
          sx={{
          }}
        >
          <Typography color={"black"} align={"center"} fontSize={40}>
            Room Scheduling Form
          </Typography>
        </Grid>
          <Grid item xs={2.4} mt={2} sx={{align: "center"}}>
            <PurchaseCard imagePath={MRI} title={"MRI Room"} description={""} />
          </Grid>
          <Grid item xs={2.4} mt={2} sx={{align: "center"}}>
            <PurchaseCard imagePath={Surge} title={"Surgery Room"} description={""} />
          </Grid>
          <Grid item xs={2.4} mt={2} sx={{align: "center"}}>
            <PurchaseCard imagePath={Conference} title={"Conference Room"} description={""} />
          </Grid>
          <Grid item xs={2.4} mt={2} sx={{align: "center"}}>
            <PurchaseCard imagePath={Checkup} title={"Checkup Room"} description={""} />
          </Grid>
          <Grid item xs={2.4} mt={2} sx={{align: "center"}}>
            <PurchaseCard imagePath={Waiting} title={"Waiting Room"} description={""} />
          </Grid>

          <Grid item xs={4} mt={2} sx={{align: "center"}}>
            <Typography color={"black"} align={"center"}>
              Name:
            </Typography>
            <CenterAlignedTextbox
              label={"Name"}
              value={form.name}
              onChange={handleNameInput}
            />
          </Grid>
          <Grid item xs={4} mt={2} sx={{align: "center"}}>
            <Typography color={"black"} align={"center"}>
              Room Needed:
            </Typography>
            <DropDown
              items={[
                "MRI",
                "Surgery",
                "Conference",
                "Checkup",
                "Waiting Room",
              ]}
              handleChange={handleServiceInput}
              label={"Room"}
              returnData={form.service}
            />
          </Grid>
          <Grid item xs={4} mt={2} sx={{align: "center"}}>
            <Typography color={"black"} align={"center"}>
              Location:
            </Typography>
            <NodeDropDown handleChange={handleLocationInput} label={"Location"} returnedNodeID={form.location} filterRoomsOnly={true} />
          </Grid>
          <Grid item xs={4} mt={2} sx={{align: "center"}}>
            <Typography align={"center"}>Employee:</Typography>
            <EmployeeDropDown returnedEmployeeID={form.employeeID !== -1 ? form.employeeID : ""} handleChange={handleEmployeeIDInput} />
          </Grid>
          <Grid item xs={4} mt={2} sx={{align: "center"}}>
            <Typography color={"black"} align={"center"}>
              Frequency Needed:
            </Typography>
            <DropDown
              items={["Once", "Daily", "Weekly", "Bi-Weekly", "Monthly"]}
              handleChange={handleFrequencyInput}
              label={"Frequency"}
              returnData={form.frequency}
            />
          </Grid>
          <Grid item xs={4} mt={2} sx={{align: "center"}}>
            <Typography color={"black"} align={"center"}>
              Priority of Scheduling:
            </Typography>
            <RadioButtonsGroup
              label={"Priority"}
              options={["Low", "Medium", "High", "Emergency"]}
              returnData={form.priority}
              handleChange={handlePriorityInput}
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
            <RoomSubmitButton input={form} text={"SUBMIT"} clear={clear} />
          </Grid>
        </Grid>
      </Grid>

    </Stack>
  );
}

export default RoomScheduling;

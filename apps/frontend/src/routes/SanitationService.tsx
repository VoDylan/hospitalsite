import { Grid, Typography, SelectChangeEvent, Stack } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import RadioButtonsGroup from "../components/buttons/RadioButtonsGroup.tsx";
import { DropDown } from "../components/dropdown/DropDown.tsx";
import { SanitationRequestFormSubmission } from "../common/formSubmission/SanitationRequestFormSubmission.ts";
import sanitationBackground from "../images/sanitationBackground.webp";
import { SanitationSubmitButton } from "../components/buttons/SanitationSubmitButton.tsx";
import { CenterAlignedTextbox } from "../components/textbox/CenterAlignedTextbox.tsx";
import ServiceNavTabs from "../components/serviceNav/tabNav/ServiceNavTabs.tsx";
import EmployeeDropDown from "../components/dropdown/EmployeeDropDown.tsx";
import RoutineClean from "../images/servicePageImages/FormIcons/RoutineClean.jpg";
import Biohazard from "../images/servicePageImages/FormIcons/Biohazard.png";
import DeepCleaning from "../images/servicePageImages/FormIcons/DeepCleaning.jpg";
import Disinfection from "../images/servicePageImages/FormIcons/Disinfection.jpg";
import DrySanitation from "../images/servicePageImages/FormIcons/DrySanitation.jpg";
import WasteMan from "../images/servicePageImages/FormIcons/WasteMan.jpg";
import {PurchaseCard} from "../components/homepage/PurchaseCard.tsx";
import NodeDropDown from "../components/dropdown/NodeDropDown.tsx";



function SanitationService() {
  const [form, setFormResponses] = useState<SanitationRequestFormSubmission>({
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
      frequency: "",
    });
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
        backgroundImage: `url(${sanitationBackground})`,
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
          width: "75%", //Adjust this to change the width of the form
          height: "auto",
          mt: "25vh",
          mb: "5vh",
        }}
      >
        <Typography
        color={'black'}>
          Jacob Murphy, Spencer Trautz
        </Typography>
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
            Sanitation Service Form
          </Typography>
        </Grid>

          <Grid item xs={4} mt={2} sx={{align: "center"}}>
            <PurchaseCard imagePath={RoutineClean} title={"Routine Cleaning"} description={""} />
          </Grid>
          <Grid item xs={4} mt={2} sx={{align: "center"}}>
            <PurchaseCard imagePath={DeepCleaning} title={"Deep Cleaning"} description={""} />
          </Grid>
          <Grid item xs={4} mt={2} sx={{align: "center"}}>
            <PurchaseCard imagePath={WasteMan} title={"Waste Management"} description={""} />
          </Grid>
          <Grid item xs={4} mt={2} sx={{align: "center"}}>
            <PurchaseCard imagePath={Disinfection} title={"Disinfection"} description={""} />
          </Grid>
          <Grid item xs={4} mt={2} sx={{align: "center"}}>
            <PurchaseCard imagePath={DrySanitation} title={"Dry Sanitation"} description={""} />
          </Grid>
          <Grid item xs={4} mt={2} sx={{align: "center"}}>
            <PurchaseCard imagePath={Biohazard} title={"Biohazard Removal"} description={""} />
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
              Service Needed:
            </Typography>
            <DropDown
              items={[
                "Routine Cleaning",
                "Deep Cleaning",
                "Waste Management",
                "Disinfection",
                "Dry Sanitation",
                "Biohazard Cleanup",
              ]}
              handleChange={handleServiceInput}
              label={"Service"}
              returnData={form.service}
            />
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
              Location:
            </Typography>
            <NodeDropDown handleChange={handleLocationInput} label={"Location"} returnedNodeID={form.location} />
          </Grid>
          <Grid item xs={4} mt={2} sx={{align: "center"}}>
            <Typography align={"center"}>Employee:</Typography>
            <EmployeeDropDown returnedEmployeeID={form.employeeID !== -1 ? form.employeeID : ""} handleChange={handleEmployeeIDInput} />
          </Grid>
          <Grid item xs={4} mt={2} sx={{align: "center"}}>
            <Typography color={"black"} align={"center"}>
              Priority of Sanitation:
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
            <SanitationSubmitButton
              input={form}
              text={"SUBMIT"}
              clear={clear}
            />
          </Grid>
        </Grid>
      </Grid>

    </Stack>
  );
}

export default SanitationService;

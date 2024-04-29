import { Grid, Typography, SelectChangeEvent, Stack } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import RadioButtonsGroup from "../components/buttons/RadioButtonsGroup.tsx";
import { DropDown } from "../components/dropdown/DropDown.tsx";
import { MedicineDeliveryFormSubmission } from "../common/formSubmission/MedicineDeliveryFormSubmission.ts";
import MedicineBackground from "../images/MedicineDelivery.jpeg";
import { MedicineSubmitButton } from "../components/buttons/MedicineSubmitButton.tsx";
import axios from "axios";
import { CenterAlignedTextbox } from "../components/textbox/CenterAlignedTextbox.tsx";
import ServiceNavTabs from "../components/serviceNav/tabNav/ServiceNavTabs.tsx";
import EmployeeDropDown from "../components/dropdown/EmployeeDropDown.tsx";
import Acet from "../images/servicePageImages/FormIcons/Acet.jpg";
import Fexo from "../images/servicePageImages/FormIcons/Fexo.jpeg";
import Ibup from "../images/servicePageImages/FormIcons/Ibup.jpeg";
import Omeprazole from "../images/servicePageImages/FormIcons/Omeprazole.jpeg";
import Diphen from "../images/servicePageImages/FormIcons/Diphen.jpeg";
import {PurchaseCard} from "../components/homepage/PurchaseCard.tsx";
import {CenterAlignedNumTextbox} from "../components/textbox/CenterAlignedNumTextbox.tsx";

function MedicineDelivery() {
  const [form, setFormResponses] = useState<MedicineDeliveryFormSubmission>({
    name: "",
    employeeID: -1,
    location: "",
    priority: "",
    Acetaminophen: "",
    Ibuprofen: "",
    Omeprazole: "",
    Fexofenadine: "",
    Diphenhydramine: "",
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

  function handleAceInput(e: ChangeEvent<HTMLInputElement>) {
    setFormResponses({ ...form, Acetaminophen: e.target.value });
  }

  function handleIbuInput(e: ChangeEvent<HTMLInputElement>) {
    setFormResponses({ ...form, Ibuprofen: e.target.value });
  }

  function handleOmeInput(e: ChangeEvent<HTMLInputElement>) {
    setFormResponses({ ...form, Omeprazole: e.target.value });
  }

  function handleFexInput(e: ChangeEvent<HTMLInputElement>) {
    setFormResponses({ ...form, Fexofenadine: e.target.value });
  }

  function handleDipInput(e: ChangeEvent<HTMLInputElement>) {
    setFormResponses({ ...form, Diphenhydramine: e.target.value });
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
      Acetaminophen: "",
      Ibuprofen: "",
      Omeprazole: "",
      Fexofenadine: "",
      Diphenhydramine: "",
      frequency: "",
    });
  }

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
        backgroundImage: `url(${MedicineBackground})`,
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
            Medicine Delivery Form
          </Typography>
        </Grid>
          <Grid
            item
            xs={12}
            mt={3}
          >
            <Typography
              align={"center"}
              fontStyle={"Open Sans"}
              fontSize={24}
            >
              Enter Amount of Each Type:
            </Typography>
          </Grid>

          <Grid item xs={3} mt={2} sx={{align: "center"}}>
            <PurchaseCard imagePath={Acet} title={"Acetaminophen"} description={"(Tylenol)"} />
          </Grid>
          <Grid item xs={3} mt={2} sx={{align: "center"}}>
            <PurchaseCard imagePath={Ibup} title={"Ibuprofen"} description={"(Advil)"} />
          </Grid>
          <Grid item xs={3} mt={2} sx={{align: "center"}}>
            <PurchaseCard imagePath={Omeprazole} title={"Omeprazole"} description={"(Prilosec)"} />
          </Grid>
          <Grid item xs={3} mt={2} sx={{align: "center"}}>
            <PurchaseCard imagePath={Fexo} title={"Fexofenadine"} description={"(Allegra)"} />
          </Grid>
          <Grid item xs={3} mt={2} sx={{align: "center"}}>
            <CenterAlignedNumTextbox
              label={"Tylenol Amount"}
              value={form.Acetaminophen}
              onChange={handleAceInput}
              type={"number"} />
          </Grid>
          <Grid item xs={3} mt={2} sx={{align: "center"}}>
            <CenterAlignedNumTextbox
              label={"Ibuprofen Amount"}
              value={form.Ibuprofen}
              onChange={handleIbuInput}
              type={"number"} />
          </Grid>
          <Grid item xs={3} mt={2} sx={{align: "center"}}>
            <CenterAlignedNumTextbox
              label={"Prilosec Amount"}
              value={form.Omeprazole}
              onChange={handleOmeInput}
              type={"number"} />
          </Grid>
          <Grid item xs={3} mt={2} sx={{align: "center"}}>
            <CenterAlignedNumTextbox
              label={"Allegra Amount"}
              value={form.Fexofenadine}
              onChange={handleFexInput}
              type={"number"} />
          </Grid>
          <Grid item xs={12} mt={2} sx={{align: "center"}}>
            <PurchaseCard imagePath={Diphen} title={"Diphenhydramine"} description={"(Benadryl)"} />
          </Grid>
          <Grid item xs={12} mt={2} sx={{align: "center"}}>
            <CenterAlignedNumTextbox
              label={"Benadryl Amount"}
              value={form.Diphenhydramine}
              onChange={handleDipInput}
              type={"number"} />
          </Grid>

          <Grid item xs={3} mt={2} sx={{align: "center"}}>
            <Typography color={"black"} align={"center"}>
              Name:
            </Typography>
            <CenterAlignedTextbox
              label={"Name"}
              value={form.name}
              onChange={handleNameInput}
            />
          </Grid>
          <Grid item xs={3} mt={2} sx={{align: "center"}}>
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
          <Grid item xs={3} mt={2} sx={{align: "center"}}>
            <Typography color={"black"} align={"center"}>
              Location:
            </Typography>
            <DropDown
              label={"Location"}
              returnData={form.location}
              handleChange={handleLocationInput}
              items={nodes.map((node) => ({
                value: node.nodeID,
                label: node.longName,
              }))}
            />
          </Grid>
          <Grid item xs={3} mt={2} sx={{align: "center"}}>
            <Typography align={"center"}>Employee:</Typography>
            <EmployeeDropDown returnedEmployeeID={form.employeeID !== -1 ? form.employeeID : ""} handleChange={handleEmployeeIDInput} />
          </Grid>
          <Grid item xs={12} mt={3} mb={3} sx={{align: "center"}}>
            <Typography color={"black"} align={"center"}>
              Priority of Medicine:
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
            <MedicineSubmitButton input={form} text={"SUBMIT"} clear={clear} />
          </Grid>
        </Grid>
      </Grid>

    </Stack>
  );
}

export default MedicineDelivery;

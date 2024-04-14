import {
  Grid,
  Typography,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import RadioButtonsGroup from "../components/buttons/RadioButtonsGroup.tsx";
import { DropDown } from "../components/DropDown.tsx";
import { RoomSchedulingFormSubmission } from "../common/formSubmission/RoomSchedulingFormSubmission.ts";
import RoomBackground from "../images/RoomScheduling.jpg";
import { RoomSubmitButton } from "../components/buttons/RoomSubmitButton.tsx";
import axios from "axios";
import TopBanner2 from "../components/banner/TopBanner2.tsx";
import {CenterAlignedTextbox} from "../components/textbox/CenterAlignedTextbox.tsx";

function RoomScheduling() {
  const [form, setFormResponses] = useState<RoomSchedulingFormSubmission>({
    name: "",
    location: "",
    priority: "",
    service: "",
    frequency: "",
    status: "",
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

  function handleStatusInput(e: ChangeEvent<HTMLInputElement>) {
    setFormResponses({ ...form, status: e.target.value });
  }

  function handleFrequencyInput(e: SelectChangeEvent) {
    setFormResponses({ ...form, frequency: e.target.value });
    return e.target.value;
  }

  function clear() {
    setFormResponses({
      name: "",
      location: "",
      priority: "",
      service: "",
      frequency: "",
      status: "",
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
            longName: longNames[i]
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
        backgroundImage: `url(${RoomBackground})`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        maxWidth: "100%",
        overflowX: "hidden",
      }}
    >
      <TopBanner2 />
      <Grid
        container
        direction={"row"}
        justifyContent={"center"}
        boxShadow={4}
        sx={{
          backgroundColor: "white",
          width: "40vw", //Adjust this to change the width of the form
          height: "auto",
          mt: "25vh",
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
            Room Scheduling Form
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography color={"black"} align={"center"}>Name:</Typography>
          <CenterAlignedTextbox
            label={"Name"}
            value={form.name}
            onChange={handleNameInput}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography color={"black"} align={"center"}>Location:</Typography>
          <DropDown
            label={"Location"}
            returnData={form.location}
            handleChange={handleLocationInput}
            items={nodes.map((node) => ({ value: node.nodeID, label: node.longName }))}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography color={"black"} align={"center"}>Room Needed:</Typography>
            Room Needed:</Typography>
          <DropDown
            items={["MRI", "Surgery", "Conference", "Checkup", "Waiting Room"]}
            handleChange={handleServiceInput}
            label={"Room"}
            returnData={form.service}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography color={"black"} align={"center"}>Frequency Needed:</Typography>
          <DropDown
            items={["Once", "Daily", "Weekly", "Bi-Weekly", "Monthly"]}
            handleChange={handleFrequencyInput}
            label={"Frequency"}
            returnData={form.frequency}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography color={"black"} align={"center"}>Priority of Scheduling:</Typography>
          <RadioButtonsGroup
            label={"Priority"}
            options={["Low", "Medium", "High", "Emergency"]}
            returnData={form.priority}
            handleChange={handlePriorityInput}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography color={"black"} align={"center"}>Status of the Request:</Typography>
          <RadioButtonsGroup
            label={"Status"}
            options={["Unassigned", "Assigned", "InProgress", "Closed"]}
            returnData={form.status}
            handleChange={handleStatusInput}
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
          <RoomSubmitButton
            input={form}
            text={"SUBMIT"}
            clear={clear}
          />
        </Grid>
      </Grid>
      <Typography>Jacob Murphy, Spencer Trautz</Typography>
    </Stack>
  );
}

export default RoomScheduling;

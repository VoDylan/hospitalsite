import {
  Grid,
  Typography,
  SelectChangeEvent,
  Stack,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { LeftAlignedTextbox } from "../components/textbox/LeftAlignedTextbox.tsx";
import RadioButtonsGroup from "../components/buttons/RadioButtonsGroup.tsx";
import { DropDown } from "../components/DropDown.tsx";
import { SanitationRequestFormSubmission } from "../common/formSubmission/SanitationRequestFormSubmission.ts";
import sanitationBackground from "../images/sanitationBackground.webp";
import { SanitationSubmitButton } from "../components/buttons/SanitationSubmitButton.tsx";
import axios from "axios";
import TopBanner2 from "../components/banner/TopBanner2.tsx";

function SanitationService() {
  const [form, setFormResponses] = useState<SanitationRequestFormSubmission>({
    name: "",
    location: "",
    priority: "",
    service: "",
    frequency: "",
    status: "",
  });

  const [submittedData, setSubmittedData] = useState<
    SanitationRequestFormSubmission[]
  >([]);

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

  function updateSubmissionList() {
    setSubmittedData([...submittedData, form]);
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
        backgroundImage: `url(${sanitationBackground})`,
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
        rowSpacing={1}
        columnSpacing={5}
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
            Sanitation Service Form
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography color={"black"}>Name:</Typography>
          <LeftAlignedTextbox
            label={"Name"}
            value={form.name}
            onChange={handleNameInput}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography color={"black"}>Location:</Typography>
          <DropDown
            label={"Location"}
            returnData={form.location}
            handleChange={handleLocationInput}
            items={nodes.map((node) => ({ value: node.nodeID, label: node.longName }))}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography color={"black"}>Service Needed:</Typography>
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
        <Grid item xs={6}>
          <Typography color={"black"}>Frequency Needed:</Typography>
          <DropDown
            items={["Once", "Daily", "Weekly", "Bi-Weekly", "Monthly"]}
            handleChange={handleFrequencyInput}
            label={"Frequency"}
            returnData={form.frequency}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography color={"black"}>Priority of Sanitation:</Typography>
          <RadioButtonsGroup
            label={"Priority"}
            options={["Low", "Medium", "High", "Emergency"]}
            returnData={form.priority}
            handleChange={handlePriorityInput}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography color={"black"}>Status of the Request:</Typography>
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
            pr: 6,
          }}
        >
          <SanitationSubmitButton
            input={form}
            text={"SUBMIT"}
            clear={clear}
            updateSubmissionList={updateSubmissionList}
          />
        </Grid>
      </Grid>
      <TableContainer
        component={Paper}
        sx={{
          minWidth: "40vw",
          backgroundColor: "white",
          width: "60vw", //Adjust this to change the width of the table
          height: "auto",
          mb: "5vh",
        }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Location</TableCell>
              <TableCell align="right">Priority</TableCell>
              <TableCell align="right">Service</TableCell>
              <TableCell align="right">Frequency</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {submittedData.map((item: SanitationRequestFormSubmission) => (
              <TableRow
                key={item.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align={"right"}>
                  {item.name}
                </TableCell>
                <TableCell align={"right"}>{item.location}</TableCell>
                <TableCell align={"right"}>{item.priority}</TableCell>
                <TableCell align={"right"}>{item.service}</TableCell>
                <TableCell align={"right"}>{item.frequency}</TableCell>
                <TableCell align={"right"}>{item.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography>Jacob Murphy, Spencer Trautz</Typography>
    </Stack>
  );
}

export default SanitationService;

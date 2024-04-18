import {
  Grid,
  Typography,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import RadioButtonsGroup from "../components/buttons/RadioButtonsGroup.tsx";
import { DropDown } from "../components/DropDown.tsx";
import { SecurityRequestFormSubmission } from "../common/formSubmission/SecurityRequestFormSubmission.ts";
import securitybackground from "../images/security_background.jpg";
import TopBanner from "../components/banner/TopBanner.tsx";
import { SecuritySubmitButton } from "../components/buttons/SecuritySubmitButton.tsx";
import axios from "axios";
import {CenterAlignedTextbox} from "../components/textbox/CenterAlignedTextbox.tsx";
import ServiceNavTabs from "../components/serviceNav/tabNav/ServiceNavTabs.tsx";

function SecurityService() {
  const [form, setFormResponses] = useState<SecurityRequestFormSubmission>({
    name: "",
    location: "",
    priority: "",
    securityPersonnel: "",
    securityCategory: "",
    securityDetail: "",
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

  function handleSecurityPersonnelInput(e: SelectChangeEvent) {
    setFormResponses({ ...form, securityPersonnel: e.target.value });
    return e.target.value;
  }

  function handleStatusInput(e: ChangeEvent<HTMLInputElement>) {
    setFormResponses({ ...form, status: e.target.value });
  }

  function handleSecurityCategoryInput(e: SelectChangeEvent) {
    setFormResponses({ ...form, securityCategory: e.target.value });
    return e.target.value;
  }

  function handleSecurityDetailInput(e: SelectChangeEvent) {
    setFormResponses({ ...form, securityDetail: e.target.value });
    return e.target.value;
  }

  function clear() {
    setFormResponses({
      name: "",
      location: "",
      priority: "",
      securityDetail: "",
      securityCategory: "",
      securityPersonnel: "",
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
        backgroundImage: `url(${securitybackground})`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        maxWidth: "100%",
        overflowX: "hidden",
      }}
    >
      <TopBanner />
      <Grid
        container
        direction={"row"}
        justifyContent={"center"}
        sx={{
          backgroundColor: "transparent",
          width: "40vw", //Adjust this to change the width of the form
          height: "auto",
          mt: "25vh",
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
          <ServiceNavTabs/>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            backgroundColor: "#186BD9",
          }}
        >
          <Typography color={"white"} align={"center"} fontSize={40}>
            Security Service Form
          </Typography>
        </Grid>
        <Grid container boxShadow={4} sx={{backgroundColor: "white"}}>
          <Grid item xs={6} mt={2}>
            <Typography color={"black"} align={"center"}>Name:</Typography>
            <CenterAlignedTextbox
              label={"Name"}
              value={form.name}
              onChange={handleNameInput}
            />
          </Grid>
          <Grid item xs={6} mt={2}>
            <Typography color={"black"} align={"center"}>Location:</Typography>
            <DropDown
              label={"Location"}
              returnData={form.location}
              handleChange={handleLocationInput}
              items={nodes.map((node) => ({ value: node.nodeID, label: node.longName }))}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography color={"black"} align={"center"}>Security Personnel:</Typography>
            <DropDown
              items={["Local Security", "Local Police", "State Police", "Other"]}
              handleChange={handleSecurityPersonnelInput}
              label={"Personnel"}
              returnData={form.securityPersonnel}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography color={"black"} align={"center"}>Why is Security Needed:</Typography>
            <DropDown
              items={[
                "I feel generally unsafe",
                "I would like to report someone",
                "I would like to report something",
                "I would like someone removed from my room",
                "There is a major emergency",
                "Other",
              ]}
              handleChange={handleSecurityCategoryInput}
              label={"Category"}
              returnData={form.securityCategory}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography color={"black"} align={"center"}>Priority of Security:</Typography>
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

          <Grid item xs={6}>
            <Typography color={"black"} align={"center"}>
              Additional Details (optional):
            </Typography>
            <CenterAlignedTextbox
              label={"Details"}
              value={form.securityDetail}
              onChange={handleSecurityDetailInput}
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
            <SecuritySubmitButton
              input={form}
              text={"SUBMIT"}
              clear={clear}
            />
          </Grid>
        </Grid>
      </Grid>
      <Typography>Dylan Vo, Robert Mellen</Typography>
    </Stack>
  );
}

export default SecurityService;

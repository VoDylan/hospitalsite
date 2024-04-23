import { Grid, SelectChangeEvent, Stack, Typography } from "@mui/material";
import { FlowerDeliveryFormSubmission } from "../common/formSubmission/FlowerDeliveryFormSubmission.ts";
import { ChangeEvent, useEffect, useState } from "react";
import { DropDown } from "../components/dropdown/DropDown.tsx";
import { FlowerDeliverySubmitButton } from "../components/buttons/FlowerDeliverySubmitButton.tsx";
import LadyWithFlowersInHospital from "../images/LadyWithFlowersInHospital.jpg";
import axios from "axios";
import { CenterAlignedTextbox } from "../components/textbox/CenterAlignedTextbox.tsx";
import ServiceNavTabs from "../components/serviceNav/tabNav/ServiceNavTabs.tsx";
import EmployeeDropDown from "../components/dropdown/EmployeeDropDown.tsx";
import {PurchaseCard} from "../components/homepage/PurchaseCard.tsx";
import RedRose from "../images/servicePageImages/FormIcons/RedRose.jpg";
import WhiteRose from "../images/servicePageImages/FormIcons/WhiteRose.jpg";
import Tulip from "../images/servicePageImages/FormIcons/Tulip.jpg";
import RedCarns from "../images/servicePageImages/FormIcons/RedCarns.jpg";

function FlowerDeliveryService() {
  const [form, setResponses] = useState<FlowerDeliveryFormSubmission>({
    name: "",
    employeeID: -1,
    RRose: "",
    WRose: "",
    RCarn: "",
    Tulip: "",
    recipientName: "",
    roomNumber: "",
    message: "",
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

  function handleRecipientNameInput(e: ChangeEvent<HTMLInputElement>) {
    setResponses({ ...form, recipientName: e.target.value });
  }

  function handleMessageInput(e: ChangeEvent<HTMLInputElement>) {
    setResponses({ ...form, message: e.target.value });
  }

  function handleRRoseInput(event: SelectChangeEvent) {
    setResponses({ ...form, RRose: event.target.value });
  }

  function handleWRoseInput(event: SelectChangeEvent) {
    setResponses({ ...form, WRose: event.target.value });
  }

  function handleRCarnInput(event: SelectChangeEvent) {
    setResponses({ ...form, RCarn: event.target.value });
  }

  function handleTulipInput(event: SelectChangeEvent) {
    setResponses({ ...form, Tulip: event.target.value });
  }

  function clear() {
    setResponses({
      name: "",
      employeeID: -1,
      RRose: "",
      WRose: "",
      RCarn: "",
      Tulip: "",
      recipientName: "",
      roomNumber: "",
      message: "",
    });
  }

  // For dropdown

  function handleRoomNumberInput(event: SelectChangeEvent) {
    setResponses({ ...form, roomNumber: event.target.value });
    return event.target.value;
  }

  function handleEmployeeIDInput(event: SelectChangeEvent) {
    setResponses({ ...form, employeeID: event.target.value as unknown as number});
    return event.target.value;
  }

  return (
    <Stack
      direction={"column"}
      sx={{
        width: "100vw",
        height: "auto",
        display: "flex",
        alignItems: "center", // Center vertically
        justifyContent: "center", // Center horizontally
        backgroundImage: `url(${LadyWithFlowersInHospital})`,
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
        // boxShadow={4}
        sx={{
          backgroundColor: "transparent",
          width: "75%", //Adjust this to change the width of the form
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
          <ServiceNavTabs />
        </Grid>
        <Grid container sx={{ background: "white", opacity: 0.95}} boxShadow={5} borderRadius={5}>
          <Grid
            item
            xs={12}
            sx={{
            }}
          >
            <Typography
              color={"black"}
              align={"center"}
              fontStyle={"Open Sans"}
              fontSize={40}
            >
              Flower Delivery Service Form
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
            <PurchaseCard imagePath={RedRose} title={"Red Rose Bouquet"} description={"$5.99"} />
          </Grid>
          <Grid item xs={3} mt={2} sx={{align: "center"}}>
            <PurchaseCard imagePath={WhiteRose} title={"White Rose Bouquet"} description={"$4.99"} />
          </Grid>
          <Grid item xs={3} mt={2} sx={{align: "center"}}>
            <PurchaseCard imagePath={RedCarns} title={"Red Carnation Bouquet"} description={"$3.99"} />
          </Grid>
          <Grid item xs={3} mt={2} sx={{align: "center"}}>
            <PurchaseCard imagePath={Tulip} title={"Tulip Bouquet"} description={"$2.99"} />
          </Grid>

          <Grid item xs={3} mt={2} sx={{align: "center"}}>
            <CenterAlignedTextbox
              label={"Red Rose Amount"}
              value={form.RRose}
              onChange={handleRRoseInput}
              type={"text"} />
          </Grid>
          <Grid item xs={3} mt={2} sx={{align: "center"}}>
            <CenterAlignedTextbox
              label={"White Rose Amount"}
              value={form.WRose}
              onChange={handleWRoseInput}
              type={"text"} />
          </Grid>
          <Grid item xs={3} mt={2} sx={{align: "center"}}>
            <CenterAlignedTextbox
              label={"Red Carnation Amount"}
              value={form.RCarn}
              onChange={handleRCarnInput}
              type={"text"} />
          </Grid>
          <Grid item xs={3} mt={2} sx={{align: "center"}}>
            <CenterAlignedTextbox
              label={"Tulip Amount"}
              value={form.Tulip}
              onChange={handleTulipInput}
              type={"text"} />
          </Grid>

          <Grid item xs={4} mt={5} sx={{align: "center"}}>
            <Typography align={"center"}> Your Name:</Typography>
            <CenterAlignedTextbox
              label={"Name"}
              value={form.name}
              onChange={handleNameInput}
              type={"text"}
            />
          </Grid>
          <Grid item xs={4} mt={5} sx={{align: "center"}}>
            <Typography align={"center"}>Recipient Name:</Typography>
            <CenterAlignedTextbox
              label={"Recipient Name"}
              value={form.recipientName}
              onChange={handleRecipientNameInput}
            />
          </Grid>
          <Grid item xs={4} mt={5} sx={{align: "center"}}>
            <Typography align={"center"}>Add a message (optional):</Typography>
            <CenterAlignedTextbox
              label={"Message"}
              value={form.message}
              onChange={handleMessageInput}
            />
          </Grid>
          <Grid item xs={4} sx={{align: "center"}}>
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
          <Grid item xs={4} sx={{align: "center"}}>
            <Typography align={"center"}>Employee:</Typography>
            <EmployeeDropDown returnedEmployeeID={form.employeeID !== -1 ? form.employeeID : ""} handleChange={handleEmployeeIDInput} />
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
            <FlowerDeliverySubmitButton
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

export default FlowerDeliveryService;

import { Box, Grid, SelectChangeEvent, Stack, Typography } from "@mui/material";
import { FlowerDeliveryFormSubmission } from "../common/formSubmission/FlowerDeliveryFormSubmission.ts";
import { ChangeEvent, useEffect, useState } from "react";
import { DropDown } from "../components/DropDown.tsx";
import { FlowerDeliverySubmitButton } from "../components/buttons/FlowerDeliverySubmitButton.tsx";
import TopBanner2 from "../components/banner/TopBanner2.tsx";
import LadyWithFlowersInHospital from "../images/LadyWithFlowersInHospital.jpg";
import axios from "axios";
import {CenterAlignedTextbox} from "../components/textbox/CenterAlignedTextbox.tsx";
import ServiceNavTabs from "../components/serviceNav/tabNav/ServiceNavTabs.tsx";

function FlowerDeliveryService() {
  const [form, setResponses] = useState<FlowerDeliveryFormSubmission>({
    name: "",
    flowerType: "",
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
            longName: longNames[i]
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

  function clear() {
    setResponses({
      name: "",
      flowerType: "",
      recipientName: "",
      roomNumber: "",
      message: "",
    });
  }

  // For dropdown
  function handleFlowerTypeInput(event: SelectChangeEvent) {
    setResponses({ ...form, flowerType: event.target.value });
    return event.target.value;
  }

  function handleRoomNumberInput(event: SelectChangeEvent) {
    setResponses({ ...form, roomNumber: event.target.value });
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
      <TopBanner2 />
      <Grid
        container
        direction={"row"}
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
          <Typography
            color={"white"}
            align={"center"}
            fontStyle={"Open Sans"}
            fontSize={40}
          >
            Flower Delivery Service Form
          </Typography>
        </Grid>
        <Grid container xs={12} sx={{backgroundColor: "white"}} boxShadow={4}>
          <Grid item xs={6}>
            <Typography align={"center"}>Name:</Typography>
            <CenterAlignedTextbox
              label={"Name"}
              value={form.name}
              onChange={handleNameInput}
              type={"text"}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography align={"center"}>Flower Type:</Typography>
            <DropDown
              items={["Red Carnations", "Red Roses", "White Roses", "Tulips"]}
              handleChange={handleFlowerTypeInput}
              label={"Flower Type"}
              returnData={form.flowerType}
            />
          </Grid>
          <Grid item xs={6}>
            <Box>
              <Typography align={"center"}>Recipient Name:</Typography>
              <CenterAlignedTextbox
                label={"Recipient Name"}
                value={form.recipientName}
                onChange={handleRecipientNameInput}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box>
              <Typography align={"center"}>Room Number:</Typography>
              <DropDown
                items={nodes.map((node) => ({ value: node.nodeID, label: node.longName }))}
                label={"Room Number"}
                returnData={form.roomNumber}
                handleChange={handleRoomNumberInput}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box>
              <Typography align={"center"}>Add a message (optional):</Typography>
              <CenterAlignedTextbox
                label={"Message"}
                value={form.message}
                onChange={handleMessageInput}
              />
            </Box>
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
            <Box>
              <FlowerDeliverySubmitButton
                text={"SUBMIT"}
                input={form}
                clear={clear}
              />
            </Box>
          </Grid>
        </Grid>
        </Grid>
    </Stack>
  );
}

export default FlowerDeliveryService;

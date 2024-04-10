import { Box, Grid, SelectChangeEvent, Stack, Typography } from "@mui/material";
import { FlowerDeliveryFormSubmission } from "../common/FlowerDeliveryFormSubmission.ts";
import { ChangeEvent, useEffect, useState } from "react";
import { DropDown } from "../components/DropDown.tsx";
import { LeftAlignedTextbox } from "../components/LeftAlignedTextbox.tsx";
import { FlowerDeliverySubmitButton } from "../components/FlowerDeliverySubmitButton.tsx";
import TopBanner2 from "../components/TopBanner2.tsx";
import LadyWithFlowersInHospital from "../images/LadyWithFlowersInHospital.jpg";
import axios from "axios";

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
  }

  // Storing the node numbers in a use state so that we only make a get request once
  const [nodeNumbers, setNodeNumbers] = useState<string[]>([]);

  // GET request to retrieve node numbers wrapped in a useEffect function
  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get<NodeData[]>("/api/database/nodes")
      .then((response) =>
        setNodeNumbers(response.data.map((node) => node.nodeID)),
      )
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
        direction={"column"}
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
          <Typography
            color={"white"}
            align={"center"}
            fontStyle={"Open Sans"}
            fontSize={40}
          >
            Flower Delivery Service Form
          </Typography>
        </Grid>
        <Grid container padding={2} direction={"row"}>
        <Grid item xs={6}>
          <Typography>Name:</Typography>
          <LeftAlignedTextbox
            label={"Name"}
            value={form.name}
            onChange={handleNameInput}
            type={"text"}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography>Flower Type:</Typography>
          <DropDown
            items={["Red Carnations", "Red Roses", "White Roses", "Tulips"]}
            handleChange={handleFlowerTypeInput}
            label={"Flower Type"}
            returnData={form.flowerType}
          />
        </Grid>
        <Grid item xs={6}>
          <Box>
            <Typography>Recipient Name:</Typography>
            <LeftAlignedTextbox
              label={"Recipient Name"}
              value={form.recipientName}
              onChange={handleRecipientNameInput}
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box>
            <Typography>Room Number:</Typography>
            <DropDown
              items={nodeNumbers}
              label={"Room Number"}
              returnData={form.roomNumber}
              handleChange={handleRoomNumberInput}
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box>
            <Typography>Add a message (optional):</Typography>
            <LeftAlignedTextbox
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
            pr: 1,
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

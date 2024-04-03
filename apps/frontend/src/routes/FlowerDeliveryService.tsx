import { Box, Grid, SelectChangeEvent, Stack, Typography } from "@mui/material";
import { FlowerDeliveryFormSubmission } from "../common/FlowerDeliveryFormSubmission.ts";
import { ChangeEvent, useEffect, useState } from "react";
import { DropDown } from "../components/DropDown.tsx";
import { LeftAlignedTextbox } from "../components/LeftAlignedTextbox.tsx";
import { SubmitButton } from "../components/SubmitButton.tsx";
import TopBanner from "../components/TopBanner.tsx";
import LadyWithFlowersInHospital from "../../public/LadyWithFlowersInHospital.jpg";
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
      spacing={20}
      direction={"column"}
      sx={{
        background: `url(${LadyWithFlowersInHospital})`,
        backgroundSize: "100%",
        minHeight: "100vh",
      }}
    >
      <TopBanner />
      <Box
        sx={{
          flexGrow: 1,
          justifyContent: "center",
          justifySelf: "center",
          width: "90%",
          alignSelf: "center",
          mx: "5%",
        }}
      >
        <Grid
          container
          direction={"row"}
          // my={20}
          rowSpacing={2}
          columnSpacing={2}
          justifyContent={"space-between"}
          boxShadow={4}
          sx={{
            backgroundColor: "white",
          }}
        >
          <Grid
            item
            xs={12}
            sx={{
              alignItems: "flexStart",
              backgroundColor: "primary.main",
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
            <Typography>What type of flowers will you be ordering?</Typography>
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
            sx={{ display: "flex", my: 2, justifyContent: "center" }}
          >
            <Box>
              <SubmitButton text={"SUBMIT"} input={form} clear={clear} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
}

export default FlowerDeliveryService;

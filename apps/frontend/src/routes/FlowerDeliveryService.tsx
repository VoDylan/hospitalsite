import { Box, Grid, SelectChangeEvent, Stack, Typography } from "@mui/material";
import { FlowerDeliveryFormSubmission } from "../common/FlowerDeliveryFormSubmission.ts";
import { ChangeEvent, useState } from "react";
import { DropDown } from "../components/DropDown.tsx";
import { LeftAlignedTextbox } from "../components/LeftAlignedTextbox.tsx";
import { SubmitButton } from "../components/SubmitButton.tsx";
import TopBanner from "../components/TopBanner.tsx";
import LadyWithFlowersInHospital from "../../public/LadyWithFlowersInHospital.jpg";
function FlowerDeliveryService() {
  const [form, setResponses] = useState<FlowerDeliveryFormSubmission>({
    name: "",
    flowerType: "",
    recipientName: "",
    roomNumber: "",
    message: "",
  });

  function handleNameInput(e: ChangeEvent<HTMLInputElement>) {
    setResponses({ ...form, name: e.target.value });
  }

  function handleRecipientNameInput(e: ChangeEvent<HTMLInputElement>) {
    setResponses({ ...form, recipientName: e.target.value });
  }

  function handleRoomNumberInput(e: ChangeEvent<HTMLInputElement>) {
    setResponses({ ...form, roomNumber: e.target.value });
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
    setResponses({ ...form, flowerType: event.target.value as string });
    return form.flowerType;
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
              bgcolor: "primary.main",
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
              <LeftAlignedTextbox
                label={"Room Number"}
                value={form.roomNumber}
                onChange={handleRoomNumberInput}
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

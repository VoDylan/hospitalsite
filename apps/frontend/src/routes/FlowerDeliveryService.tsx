import { Box, Grid, SelectChangeEvent, Typography } from "@mui/material";
import { FlowerDeliveryFormSubmission } from "../common/FlowerDeliveryFormSubmission.ts";
import { ChangeEvent, useState } from "react";
import { DropDown } from "../components/DropDown.tsx";
import { LeftAlignedTextbox } from "../components/LeftAlignedTextbox.tsx";
import { SubmitButton } from "../components/SubmitButton.tsx";
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
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        my={8}
        px={8}
        spacing={1}
        justifyContent={"center"}
        boxShadow={4}
      >
        <Grid
          item
          xs={12}
          columnSpacing={0}
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
          <LeftAlignedTextbox
            label={"Name:"}
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
            <LeftAlignedTextbox
              label={"Recipient Name:"}
              value={form.recipientName}
              onChange={handleRecipientNameInput}
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box>
            <LeftAlignedTextbox
              label={"Room Number:"}
              value={form.roomNumber}
              onChange={handleRoomNumberInput}
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box>
            <LeftAlignedTextbox
              label={"Add a message (optional)"}
              value={form.message}
              onChange={handleMessageInput}
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box>
            <SubmitButton text={"SUBMIT"} input={form} clear={clear} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default FlowerDeliveryService;

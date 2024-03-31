import { Box, Grid, SelectChangeEvent, Typography } from "@mui/material";

import Textbox from "../components/Textbox.tsx";
import { FlowerDeliveryFormSubmission } from "../common/FlowerDeliveryFormSubmission.ts";
import { ChangeEvent, useState } from "react";
import { DropDown } from "../components/DropDown.tsx";
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

  // function clear(){
  //     setResponses({name: "", flowerType: "", recipientName: "", roomNumber: "", message: ""});
  // }

  // For dropdown
  function handleFlowerTypeInput(event: SelectChangeEvent) {
    setResponses({ ...form, flowerType: event.target.value as string });
    return form.flowerType;
  }

  return (
    <>
      <Grid
        container
        my={8}
        mx={6}
        rowSpacing={8}
        columnSpacing={4}
        alignContent={"center"}
        alignItems={"flexStart"}
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
          <Box>
            <Textbox
              label={"Name:"}
              value={form.name}
              onChange={handleNameInput}
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box>
            <Typography>What type of flowers will you be ordering?</Typography>
            <DropDown
              items={["Red Carnations", "Red Roses", "White Roses", "Tulips"]}
              handleChange={handleFlowerTypeInput}
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box>
            <Textbox
              label={"Recipient Name:"}
              value={form.recipientName}
              onChange={handleRecipientNameInput}
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box>
            <Textbox
              label={"Room Number:"}
              value={form.roomNumber}
              onChange={handleRoomNumberInput}
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box>
            <Textbox
              label={"Add a message (optional)"}
              value={form.message}
              onChange={handleMessageInput}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <Typography align={"center"}>Submit Button Here</Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default FlowerDeliveryService;

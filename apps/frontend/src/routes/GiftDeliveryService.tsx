import { Grid, Typography, SelectChangeEvent, Stack } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import RadioButtonsGroup from "../components/buttons/RadioButtonsGroup.tsx";
import { DropDown } from "../components/dropdown/DropDown.tsx";
import { GiftDeliveryFormSubmission } from "../common/formSubmission/GiftDeliveryFormSubmission.ts";
import giftbackground from "../images/giftbackground.jpg";
import { GiftDeliverySubmitButton } from "../components/buttons/GiftDeliverySubmitButton.tsx";
import React from "react";
import Confetti from "react-confetti";
import axios from "axios";
import { CenterAlignedTextbox } from "../components/textbox/CenterAlignedTextbox.tsx";
import ServiceNavTabs from "../components/serviceNav/tabNav/ServiceNavTabs.tsx";
import EmployeeDropDown from "../components/dropdown/EmployeeDropDown.tsx";

function GiftDeliveryService() {
  const [form, setFormResponses] = useState<GiftDeliveryFormSubmission>({
    name: "",
    employeeID: -1,
    recipientName: "",
    status: "",
    location: "",
    message: "",
    delivery: "",
    giftSize: "",
    giftAddOn: "",
  });

  function handleNameInput(e: ChangeEvent<HTMLInputElement>) {
    setFormResponses({ ...form, name: e.target.value });
  }
  function handlerecipientNameInput(e: ChangeEvent<HTMLInputElement>) {
    setFormResponses({ ...form, recipientName: e.target.value });
  }

  function handleStatusInput(e: ChangeEvent<HTMLInputElement>) {
    setFormResponses({ ...form, status: e.target.value });
  }
  function handleLocationInput(e: SelectChangeEvent) {
    setFormResponses({ ...form, location: e.target.value });
    return e.target.value;
  }
  function handleMessageInput(e: ChangeEvent<HTMLInputElement>) {
    setFormResponses({ ...form, message: e.target.value });
  }
  function handleDeliveryInput(e: ChangeEvent<HTMLInputElement>) {
    setFormResponses({ ...form, delivery: e.target.value });
  }

  function handleGiftSizeInput(e: ChangeEvent<HTMLInputElement>) {
    setFormResponses({ ...form, giftSize: e.target.value });
    return e.target.value;
  }

  function handleGiftAddOnInput(e: ChangeEvent<HTMLInputElement>) {
    setFormResponses({ ...form, giftAddOn: e.target.value });
    return e.target.value;
  }

  function handleEmployeeIDInput(event: SelectChangeEvent) {
    setFormResponses({ ...form, employeeID: event.target.value as unknown as number});
    return event.target.value;
  }

  function clear() {
    setFormResponses({
      name: "",
      employeeID: -1,
      recipientName: "",
      status: "",
      location: "",
      message: "",
      delivery: "",
      giftSize: "",
      giftAddOn: "",
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
            longName: longNames[i],
          });
        }

        updateNodes(updatedNodes);
      })
      .catch((error) => console.error(error));
  }, []);

  const [showConfetti, setShowConfetti] = useState(false);

  function displayConfetti() {
    setShowConfetti(true);
  }

  function hideConfetti() {
    setShowConfetti(false);
  }

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
        backgroundImage: `url(${giftbackground})`,
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
          <ServiceNavTabs />
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            backgroundColor: "#186BD9",
          }}
        >
          <Typography color={"white"} align={"center"} fontSize={40}>
            Gift Delivery Service Form
          </Typography>
        </Grid>
        <Grid container boxShadow={4} sx={{ backgroundColor: "white" }}>
          <Grid item xs={6} mt={2} sx={{align: "center"}}>
            <Typography color={"black"} align={"center"}>
              Name:
            </Typography>
            <CenterAlignedTextbox
              label={"Name"}
              value={form.name}
              onChange={handleNameInput}
            />
          </Grid>
          <Grid item xs={6} mt={2} sx={{align: "center"}}>
            <Typography align={"center"}>Employee:</Typography>
            <EmployeeDropDown returnedEmployeeID={form.employeeID !== -1 ? form.employeeID : ""} handleChange={handleEmployeeIDInput} />
          </Grid>
          <Grid item xs={6} mt={2} sx={{align: "center"}}>
            <Typography color={"black"} align={"center"}>
              Location:
            </Typography>
            <DropDown
              label={"Location"}
              returnData={form.location}
              handleChange={handleLocationInput}
              items={nodes.map((node) => ({
                value: node.nodeID,
                label: node.longName,
              }))}
            />
          </Grid>
          <Grid item xs={6} sx={{align: "center"}}>
            <Typography color={"black"} align={"center"}>
              Recipient Name:
            </Typography>
            <CenterAlignedTextbox
              label={"Recipient Name"}
              value={form.recipientName}
              onChange={handlerecipientNameInput}
            />
          </Grid>
          <Grid item xs={6} sx={{align: "center"}}>
            <Typography color={"black"} align={"center"}>
              Optional Message:
            </Typography>
            <CenterAlignedTextbox
              label={"Optional Message"}
              value={form.message}
              onChange={handleMessageInput}
            />
          </Grid>

          <Grid item xs={6} sx={{align: "center"}}>
            <Typography color={"black"} align={"center"}>
              Delivery:
            </Typography>
            <RadioButtonsGroup
              label={"Delivery"}
              options={[
                "Standard Delivery",
                "Express Delivery",
                "Same Day Delivery",
                "Emergency Delivery",
              ]}
              returnData={form.delivery}
              handleChange={handleDeliveryInput}
            />
          </Grid>

          <Grid item xs={6} sx={{align: "center"}}>
            <Typography color={"black"} align={"center"}>
              Status of the Request:
            </Typography>
            <RadioButtonsGroup
              label={"Status"}
              options={["Unassigned", "Assigned", "InProgress", "Closed"]}
              returnData={form.status}
              handleChange={handleStatusInput}
            />
          </Grid>
          <Grid item xs={6} sx={{align: "center"}}>
            <Typography color={"black"} paddingTop={2} align={"center"}>
              Gift Size:
            </Typography>
            <RadioButtonsGroup
              label={"Gift Size"}
              options={["Small", "Medium", "Large", "Extra Large"]}
              returnData={form.giftSize}
              handleChange={handleGiftSizeInput}
            />
          </Grid>
          <Grid item xs={6} sx={{align: "center"}}>
            <Typography color={"black"} paddingTop={2} align={"center"}>
              Gift Add-on:
            </Typography>
            <RadioButtonsGroup
              label={"Gift Add-on"}
              options={["Greeting Card", "Balloons", "Stuffed Animal", "None"]}
              returnData={form.giftAddOn}
              handleChange={handleGiftAddOnInput}
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
            {showConfetti && (
              <Confetti
                numberOfPieces={100}
                width={innerWidth}
                height={innerHeight}
                //recycle={false}
              />
            )}
            <GiftDeliverySubmitButton
              text={"SUBMIT"}
              input={form}
              clear={clear}
              displayConfetti={displayConfetti}
              hideConfetti={hideConfetti}
            />
          </Grid>
        </Grid>
      </Grid>
      <Typography>Yitao Hong, Arayah Remillard</Typography>
    </Stack>
  );
}

export default GiftDeliveryService;

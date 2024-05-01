import { Grid, Typography, SelectChangeEvent, Stack } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import RadioButtonsGroup from "../components/buttons/RadioButtonsGroup.tsx";
import { GiftDeliveryFormSubmission } from "../common/formSubmission/GiftDeliveryFormSubmission.ts";
import giftbackground from "../images/giftbackground.jpg";
import { GiftDeliverySubmitButton } from "../components/buttons/GiftDeliverySubmitButton.tsx";
import React from "react";
import Confetti from "react-confetti";
import { CenterAlignedTextbox } from "../components/textbox/CenterAlignedTextbox.tsx";
import ServiceNavTabs from "../components/serviceNav/tabNav/ServiceNavTabs.tsx";
import EmployeeDropDown from "../components/dropdown/EmployeeDropDown.tsx";
import {PurchaseCard} from "../components/homepage/PurchaseCard.tsx";
import Balloons from "../images/servicePageImages/FormIcons/Balloons.jpg";
import GetWellCard from "../images/servicePageImages/FormIcons/GetWellCard.jpg";
import TedBear from "../images/servicePageImages/FormIcons/TedBear.jpg";
import NodeDropDown from "../components/dropdown/NodeDropDown.tsx";
import {CenterAlignedNumTextbox} from "../components/textbox/CenterAlignedNumTextbox.tsx";

function GiftDeliveryService() {
  const [form, setFormResponses] = useState<GiftDeliveryFormSubmission>({
    name: "",
    employeeID: -1,
    recipientName: "",
    balloons: "",
    cards: "",
    bears: "",
    location: "",
    message: "",
    delivery: "",
  });

  function handleNameInput(e: ChangeEvent<HTMLInputElement>) {
    setFormResponses({ ...form, name: e.target.value });
  }
  function handlerecipientNameInput(e: ChangeEvent<HTMLInputElement>) {
    setFormResponses({ ...form, recipientName: e.target.value });
  }
  function handleBalloonsInput(e: ChangeEvent<HTMLInputElement>) {
    setFormResponses({ ...form, balloons: e.target.value });
  }
  function handleCardsInput(e: ChangeEvent<HTMLInputElement>) {
    setFormResponses({ ...form, cards: e.target.value });
  }
  function handleBearsInput(e: ChangeEvent<HTMLInputElement>) {
    setFormResponses({ ...form, bears: e.target.value });
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

  function handleEmployeeIDInput(event: SelectChangeEvent) {
    setFormResponses({ ...form, employeeID: event.target.value as unknown as number});
    return event.target.value;
  }

  function clear() {
    setFormResponses({
      name: "",
      employeeID: -1,
      recipientName: "",
      balloons: "",
      cards: "",
      bears: "",
      location: "",
      message: "",
      delivery: "",
    });
  }

  useEffect(() => {
    window.scrollTo(0, 0);
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
          width: "75%", //Adjust this to change the width of the form
          height: "auto",
          mt: "25vh",
          mb: "5vh",
        }}
      >
        <Typography
          align={"center"}
          fontStyle={"Open Sans"}
        >
          Yitao Hong, Arayah Remillard
        </Typography>
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
          <Typography color={"black"} align={"center"} fontSize={40}>
            Gift Delivery Service Form
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
          <Grid item xs={4} mt={2} sx={{align: "center"}}>
            <PurchaseCard imagePath={Balloons} title={"Balloons!"} description={"$3.99"} />
          </Grid>
          <Grid item xs={4} mt={2} sx={{align: "center"}}>
            <PurchaseCard imagePath={GetWellCard} title={"Card"} description={"$1.99"} />
          </Grid>
          <Grid item xs={4} mt={2} sx={{align: "center"}}>
            <PurchaseCard imagePath={TedBear} title={"Teddy Bear"} description={"$5.99"} />
          </Grid>
          <Grid item xs={4} mt={2} sx={{align: "center"}}>
            <CenterAlignedNumTextbox
              label={"Balloon Amount"}
              value={form.balloons}
              onChange={handleBalloonsInput}
              type={"number"} />
          </Grid>
          <Grid item xs={4} mt={2} sx={{align: "center"}}>
            <CenterAlignedNumTextbox
              label={"Card Amount"}
              value={form.cards}
              onChange={handleCardsInput}
              type={"number"} />
          </Grid>
          <Grid item xs={4} mt={2} sx={{align: "center"}}>
            <CenterAlignedNumTextbox
              label={"Bear Amount"}
              value={form.bears}
              onChange={handleBearsInput}
              type={"number"} />
          </Grid>

          <Grid item xs={4} mt={5} sx={{align: "center"}}>
            <Typography color={"black"} align={"center"}>
              Name:
            </Typography>
            <CenterAlignedTextbox
              label={"Name"}
              value={form.name}
              onChange={handleNameInput}
            />
          </Grid>
          <Grid item xs={4} mt={5} sx={{align: "center"}}>
            <Typography color={"black"} align={"center"}>
              Recipient Name:
            </Typography>
            <CenterAlignedTextbox
              label={"Recipient Name"}
              value={form.recipientName}
              onChange={handlerecipientNameInput}
            />
          </Grid>
          <Grid item xs={4} mt={5} sx={{align: "center"}}>
            <Typography color={"black"} align={"center"}>
              Optional Message:
            </Typography>
            <CenterAlignedTextbox
              label={"Optional Message"}
              value={form.message}
              onChange={handleMessageInput}
            />
          </Grid>
          <Grid item xs={4} mt={5} sx={{align: "center"}}>
            <Typography align={"center"}>Employee:</Typography>
            <EmployeeDropDown returnedEmployeeID={form.employeeID !== -1 ? form.employeeID : ""} handleChange={handleEmployeeIDInput} />
          </Grid>
          <Grid item xs={4} mt={5} sx={{align: "center"}}>
            <Typography color={"black"} align={"center"}>
              Location:
            </Typography>
            <NodeDropDown label={"Location"} returnedNodeID={form.location} handleChange={handleLocationInput} filterRoomsOnly={true}/>
          </Grid>

          <Grid item xs={4} mt={5} sx={{align: "center"}}>
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
    </Stack>
  );
}

export default GiftDeliveryService;

import {Grid, SelectChangeEvent, Stack} from "@mui/material";
import { ChangeEvent, useState, useEffect } from "react";
//import { LeftAlignedTextbox } from "../components/LeftAlignedTextbox.tsx";
//import RadioButtonsGroup from "../components/RadioButtonsGroup.tsx";
//import { DropDown } from "../components/DropDown.tsx";
import { GiftDeliveryFormSubmission } from "../common/GiftDeliveryFormSubmission.ts";
import TopBanner from "../components/TopBanner.tsx";
import axios from "axios";

function GiftDeliveryService() {
  const [form, setFormResponses] = useState<GiftDeliveryFormSubmission>({
    name: "",
    recipientName: "",
    roomNumber: "",
    giftSize: "",
    message: "",
    extraFee: "",
  });

  interface NodeData {
    nodeID: string;
  }

  const [nodeNumbers, setNodeNumbers] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get<NodeData[]>("/api/database/nodes")
      .then((response) =>
        setNodeNumbers(response.data.map((node) => node.nodeID)),
      )
      .catch((error) => console.error(error));
  }, []);

  function handleNameInput(e: ChangeEvent<HTMLInputElement>) {
    setFormResponses({ ...form, name: e.target.value });
  }

  function handleRecipientNameInput(e: SelectChangeEvent) {
    setFormResponses({ ...form, recipientName: e.target.value });
  }

  function handleroomNumberInput(e: ChangeEvent<HTMLInputElement>) {
    setFormResponses({ ...form, roomNumber: e.target.value });
  }

  function handlegiftSizeInput(e: ChangeEvent<HTMLInputElement>) {
    setFormResponses({ ...form, giftSize: e.target.value });
  }
  function handlemessageInput(e: ChangeEvent<HTMLInputElement>) {
    setFormResponses({ ...form, message: e.target.value });
  }
  function handleextreFeeInput(e: ChangeEvent<HTMLInputElement>) {
    setFormResponses({ ...form, extraFee: e.target.value });
  }

  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      spacing={20}
      sx={{
        width: "100vw",
        height: "auto",
        display: "flex",
        alignItems: "center", // Center vertically
        justifyContent: "center", // Center horizontally
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
        rowSpacing={1}
        columnSpacing={5}
        justifyContent={"center"}
        boxShadow={4}
        sx={{
          backgroundColor: "white",
          width: "40vw", //Adjust this to change the width of the form
          height: "auto",
        }}
      ></Grid>
    </Stack>
  );
}

export default GiftDeliveryService;

import {
  Grid,
  Typography,
  SelectChangeEvent,
  Stack,
  // MenuItem,
  // FormControl,
  // InputLabel,
  // Select,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import RadioButtonsGroup from "../components/buttons/RadioButtonsGroup.tsx";
import { DropDown } from "../components/DropDown.tsx";
import { DeviceDeliveryFormSubmission } from "../common/formSubmission/DeviceDeliveryFormSubmission.ts";
import medDeviceBackground from "../images/medDeviceBackground.jpg";
import { DeviceSubmitButton } from "../components/buttons/DeviceSubmitButton.tsx";
import axios from "axios";
import { CenterAlignedTextbox } from "../components/textbox/CenterAlignedTextbox.tsx";
import ServiceNavTabs from "../components/serviceNav/tabNav/ServiceNavTabs.tsx";
// import MoreMenuItem from "../components/MoreMenuItem.tsx";

function DeviceDeliveryService() {
  const [form, setFormResponses] = useState<DeviceDeliveryFormSubmission>({
    name: "",
    roomNum: "",
    device: "",
    amount: "",
    priority: "",
    status: "",
  });

  // Arrays for Medical Devices Categories and Devices
  // const medDevices: string[] = [
  //   "Analytical Instruments",
  //   "Cardiology",
  //   "Dental",
  //   "Genetics",
  //   "Imaging",
  //   "Lab Equipment",
  //   "Microscopy",
  //   "Neurology",
  //   "Physiotherapy",
  //   "Refrigeration",
  //   "Spectroscopy",
  //   "Ultrasound",
  // ];

  // const analyticalInstruments: string[] = ["Blood Gas Analysis", "Electrolyte Analysis", "Flowmeter"];
  // const cardiology: string[] = ["Automatic External Defibrillator", "Electrocardiograph", "Pacing System"];
  // const dental: string[] = ["Dental Compressor System", "Elements Obturation Unit", "Intraoral Camera"];
  // const genetics: string[] = ["DNA Sequencing System", "Flow Cytometer", "SPS Sample Preparation System"];
  // const imaging: string[] = ["CT Scanner", "Fluoroscopy System", "MRI Scanner"];
  // const labEquipment: string[] = ["Flame Sterilizer", "Medical Autoclave", "Optical Imaging System"];
  // const microscopy: string[] = ["Atomic Force Microscopy", "Cell Analysis System", "Microbial Detector"];
  // const neurology: string[] = ["Checkpoint Stimulator", "Nerve Monitoring System", "NIBP Simulator"];
  // const physiotherapy: string[] = ["Power Shockwave Therapy", "Pressotherapy Device", "Pump Vacuum Therapy Unit"];
  // const refrigeration: string[] = ["Plasma Refrigerator", "Vaccine Refigerator"];
  // const spectroscopy: string[] = ["CD Spectropolarimeter", "NMR Spectrometer", "Rapid Kinetics Spectrometer"];
  // const ultrasound: string[] = ["Display Doppler", "Ultrasonic Doppler", "Ultrasound Machine"];

  // Nested Menu Functions
  // const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // // const open = Boolean(anchorEl);
  // // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  // //   setAnchorEl(event.currentTarget);
  // // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  // Form Functions
  function handleNameInput(e: ChangeEvent<HTMLInputElement>) {
    setFormResponses({ ...form, name: e.target.value });
  }

  function handleLocationInput(e: SelectChangeEvent) {
    setFormResponses({ ...form, roomNum: e.target.value });
    return e.target.value;
  }

  function handleDeviceInput(e: SelectChangeEvent) {
    setFormResponses({ ...form, device: e.target.value });
    // return e.target.value;
  }

  function handleAmountInput(e: SelectChangeEvent) {
    setFormResponses({ ...form, amount: e.target.value });
    return e.target.value;
  }

  function handlePriorityInput(e: ChangeEvent<HTMLInputElement>) {
    setFormResponses({ ...form, priority: e.target.value });
  }

  function handleStatusInput(e: ChangeEvent<HTMLInputElement>) {
    setFormResponses({ ...form, status: e.target.value });
  }

  function clear() {
    setFormResponses({
      name: "",
      roomNum: "",
      priority: "",
      device: "",
      amount: "",
      status: "",
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
        backgroundImage: `url(${medDeviceBackground})`,
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
            Medical Device Request Form
          </Typography>
        </Grid>
        <Grid container boxShadow={4} sx={{ backgroundColor: "white" }}>
          <Grid item xs={6} mt={2} sx={{ align: "center" }}>
            <Typography color={"black"} align={"center"}>
              Name:
            </Typography>
            <CenterAlignedTextbox
              label={"Name"}
              value={form.name}
              onChange={handleNameInput}
            />
          </Grid>
          <Grid item xs={6} mt={2} sx={{ align: "center" }}>
            <Typography color={"black"} align={"center"}>
              Location:
            </Typography>
            <DropDown
              label={"Location"}
              returnData={form.roomNum}
              handleChange={handleLocationInput}
              items={nodes.map((node) => ({
                value: node.nodeID,
                label: node.longName,
              }))}
            />
          </Grid>
          <Grid item xs={6} sx={{ align: "center" }}>
            <Typography color={"black"} align={"center"}>
              Medical Device Needed:
            </Typography>
            <CenterAlignedTextbox
              label={"Medical Device"}
              value={form.device}
              onChange={handleDeviceInput}
            />
          </Grid>
          <Grid item xs={6} sx={{ align: "center" }}>
            <Typography color={"black"} align={"center"}>
              Amount Needed:
            </Typography>
            <CenterAlignedTextbox
              onChange={handleAmountInput}
              label={"Amount"}
              value={form.amount}
            />
          </Grid>
          <Grid item xs={6} sx={{ align: "center" }}>
            <Typography color={"black"} align={"center"}>
              Priority of Medical Device Delivery:
            </Typography>
            <RadioButtonsGroup
              label={"Priority"}
              options={["Low", "Medium", "High", "Emergency"]}
              returnData={form.priority}
              handleChange={handlePriorityInput}
            />
          </Grid>
          <Grid item xs={6} sx={{ align: "center" }}>
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
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              my: 2,
              justifyContent: "center",
            }}
          >
            <DeviceSubmitButton input={form} text={"SUBMIT"} clear={clear} />
          </Grid>
        </Grid>
      </Grid>
      <Typography color={"white"}>
        Sebastian Gurgol, Jingxu (Rick) Wang
      </Typography>
    </Stack>
  );
}

export default DeviceDeliveryService;

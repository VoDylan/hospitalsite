import { Button, Paper, Stack } from "@mui/material";
import FilterWithIcon from "../filters/FilterWithIcon.tsx";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";

export default function Icon(props: {
  handleButtonClick: () => void;
  checked: boolean;
  confIconState: string;
  deptIconState: string;
  labsIconState: string;
  servIconState: string;
  infoIconState: string;
  restroomsIconState: string;
  elevatorIconState: string;
  stairsIconState: string;
  exitsIconState: string;
  retlIconState: string;
  ll1IconState: string;
  ll2IconState: string;
  firstFloorIconState: string;
  secondFloorIconState: string;
  thirdFloorIconState: string;
  handleConfIconState: () => void;
  handleDeptIconState: () => void;
  handleLabsIconState: () => void;
  handleServIconState: () => void;
  handleInfoIconState: () => void;
  handleRestroomsIconState: () => void;
  handleElevatorIconState: () => void;
  handleStairsIconState: () => void;
  handleExitsIconState: () => void;
  handleRetlIconState: () => void;
  handleLL1IconState: () => void;
  handleLL2IconState: () => void;
  handleFirstFloorIconState: () => void;
  handleSecondFloorIconState: () => void;
  handleThirdFloorIconState: () => void;
  handleSelectAll: () => void;
  handleClearAll: () => void;
}) {
  return (
    <>
      <Stack width={"100%"} height={"100%"}>

        <Paper sx={{ width: "100%", height: "100%" }} elevation={4}>
          <Stack
            spacing={"5%"}
            direction="column"
            sx={{
              backgroundColor: "white",
              display: "flex",
              justifyContent: "start",
              alignItems: "start",
              position: "relative",
              paddingTop: "4%",
              marginLeft: "1%",
              paddingLeft: "8%",
            }}
          >
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={props.handleButtonClick}
              variant="text"
              sx={{
                width: "25%",
                justifySelf: "left",
                marginLeft: "10px",
              }}
            >
              {props.checked ? "back" : "back"}
            </Button>
            <Stack direction="column" spacing={1}>
              <FilterWithIcon
                iconColor="#1CA7EC"
                filterName="Conference"
                filterType={1}
                shape={"conf"}
                iconState={props.confIconState}
                handleIconState={props.handleConfIconState}
              />

              <FilterWithIcon
                iconColor="#72c41c"
                filterName="Department"
                filterType={1}
                shape={"dept"}
                iconState={props.deptIconState}
                handleIconState={props.handleDeptIconState}
              />

              <FilterWithIcon
                iconColor="#e88911"
                filterName="Labs"
                filterType={1}
                shape={"labs"}
                iconState={props.labsIconState}
                handleIconState={props.handleLabsIconState}
              />

              <FilterWithIcon
                iconColor="#e88911"
                filterName="Service"
                filterType={1}
                shape={"service"}
                iconState={props.servIconState}
                handleIconState={props.handleServIconState}
              />

              <FilterWithIcon
                iconColor="#1CA7EC"
                filterName="Info"
                filterType={1}
                shape={"info"}
                iconState={props.infoIconState}
                handleIconState={props.handleInfoIconState}
              />

              <FilterWithIcon
                iconColor="#72c41c"
                filterName="Restrooms"
                filterType={1}
                shape={"bathroom"}
                iconState={props.restroomsIconState}
                handleIconState={props.handleRestroomsIconState}
              />

              <FilterWithIcon
                iconColor="#e88911"
                filterName="Retail"
                filterType={1}
                shape={"retail"}
                iconState={props.retlIconState}
                handleIconState={props.handleRetlIconState}
              />

              <FilterWithIcon
                iconColor="#72c41c"
                filterName="Stairs"
                filterType={1}
                shape={"stairs"}
                iconState={props.stairsIconState}
                handleIconState={props.handleStairsIconState}
              />


              <FilterWithIcon
                iconColor="#1CA7EC"
                filterName="Elevators"
                filterType={1}
                shape={"elevators"}
                iconState={props.elevatorIconState}
                handleIconState={props.handleElevatorIconState}
              />

              <FilterWithIcon
                iconColor="red"
                filterName="Exits"
                filterType={1}
                shape={"exit"}
                iconState={props.exitsIconState}
                handleIconState={props.handleExitsIconState}
              />

              <FilterWithIcon
                iconColor="#012D5A"
                filterName="L1"
                filterType={0}
                shape={"floor"}
                iconState={props.ll1IconState}
                handleIconState={props.handleLL1IconState}
              />

              <FilterWithIcon
                iconColor="#012D5A"
                filterName="L2"
                filterType={0}
                shape={"floor"}
                iconState={props.ll2IconState}
                handleIconState={props.handleLL2IconState}
              />

              <FilterWithIcon
                iconColor="#012D5A"
                filterName="1st Floor"
                filterType={0}
                shape={"floor"}
                iconState={props.firstFloorIconState}
                handleIconState={props.handleFirstFloorIconState}
              />

              <FilterWithIcon
                iconColor="#012D5A"
                filterName="Second Floor"
                filterType={0}
                shape={"floor"}
                iconState={props.secondFloorIconState}
                handleIconState={props.handleSecondFloorIconState}
              />

              <FilterWithIcon
                iconColor="#012D5A"
                filterName="Third Floor"
                filterType={0}
                shape={"floor"}
                iconState={props.thirdFloorIconState}
                handleIconState={props.handleThirdFloorIconState}
              />
            </Stack>

            {/*Buttons*/}
            <Stack
              direction="column"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "90%",
                paddingBottom: "10%",
                paddingTop: "4%"
              }}
              spacing={0.5}
            >
              <Button
                variant={"contained"}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  minWidth: "90%",
                }}
                onClick={props.handleSelectAll}
              >
                Select All
              </Button>

              <Button
                variant={"contained"}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  minWidth: "90%",
                  backgroundColor: "#D9D9D9",
                }}
                onClick={props.handleClearAll}
              >
                Clear All
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Stack>
    </>
  );
}

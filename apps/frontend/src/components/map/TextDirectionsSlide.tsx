import { Button, Paper, Stack, Box } from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';
import React, {useState} from "react";
import { TypeCoordinates } from "common/src/TypeCoordinates.ts";
import { Floor } from "common/src/map/Floor.ts";
import startIcon from "../../images/mapImages/starticon3.png";
import PlaceIcon from '@mui/icons-material/Place';
import TurnRightIcon from '@mui/icons-material/TurnRight';
import TurnLeftIcon from '@mui/icons-material/TurnLeft';
import NorthIcon from '@mui/icons-material/North';
// import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import Elevator from "../../images/realMapIcons/elevator.svg";
import WalkingPerson from "../../images/mapIcons/WalkingPerson.png";


function DirectionButton(props: {
  item: TypeCoordinates,
  onClick: () => void,
  nodesData: TypeCoordinates[]; // Add nodesData property here
  index: number
}) {
  return <Button
    startIcon={props.item.direction.startsWith("Turn right") ? (
      <TurnRightIcon
        sx={{fontSize: "large", color: "white", backgroundColor: "#34BA2C", marginRight: "5px", marginTop: "15%"}}/>
    ) : props.item.direction.startsWith("Turn left") ? (
        <TurnLeftIcon
          sx={{fontSize: "large", color: "white", backgroundColor: "#34BA2C", marginRight: "5px", marginTop: "15%"}}/>
      ) :
      props.item.direction.toLowerCase().startsWith("come off") ? (
          <img src={Elevator} alt="Elevator"
               style={{width: "23px", height: "23px", marginLeft: "-1px", marginRight: "3px"}}/>
        ) :

        props.item.direction.toLowerCase().startsWith("go to") ? (
          <img src={Elevator} alt="Elevator"
               style={{width: "23px", height: "23px", marginLeft: "-1px", marginRight: "3px"}}/>
        ) :(
          <NorthIcon sx={{
            fontSize: "",
            color: "white",
            backgroundColor: "#34BA2C",
            padding: "2%",
            marginRight: "5px",
            marginTop: "15%"
          }}/>
        )}
    onClick={props.onClick}

    variant="outlined"
    sx={{
      fontSize: "15px",
      width: "100%", // Stretch button to full width
      borderRadius: "0%",
      color: "black",
      borderColor: "#FAFAFA",
      textTransform: "none", // Set textTransform to none
      textAlign: "start",
      justifyContent: "left",
      alignItems: "flex-start", // Align items flex-start to keep icon centered with top line
      borderBottom: props.nodesData[props.index + 1]?.floor !== props.item.floor ? "2px solid lightGray" : "0.5px solid rgba(169, 169, 169, 0.3)",
      borderLeft: "0px",
      borderRight: "0px",
    }}
  >
    {props.index}. {props.item.direction}
  </Button>;
}

function StartButton(props: {
  item: TypeCoordinates,
  onClick: () => void,
  nodesData: TypeCoordinates[]; // Add nodesData property here
  index: number}) {
  return <Button
    startIcon={<img src={startIcon} alt="Start" style={{
      width: "61px",
      height: "44px",
      marginRight: "-16px",
      marginLeft: "-22px"
    }}/>} // Smaller startIcon with marginTop adjustment
    onClick={props.onClick}
    variant="outlined"
    sx={{
      fontSize: "15px",
      width: "100%", // Stretch button to full width
      borderRadius: "0%",
      color: "black",
      borderColor: "#FAFAFA",
      textTransform: "none", // Set textTransform to none
      textAlign: "start",
      justifyContent: "left",
      alignItems: "center", // Align items flex-start to keep icon centered with top line
      borderBottom: props.nodesData[props.index + 1]?.floor !== props.item.floor ? "2px solid lightGray" : "0.5px solid rgba(169, 169, 169, 0.3)",
      borderLeft: "0px",
      borderRight: "0px",
    }}
  >
    {props.item.longName}
  </Button>;
}

function DestinationButton(props: {
  item: TypeCoordinates,
  onClick: () => void,
}) {
  return <Button
    startIcon={<PlaceIcon sx={{fontSize: "large", color: "red"}}/>} // PlaceIcon as the startIcon
    onClick={props.onClick}
    variant="outlined"
    sx={{
      fontSize: "15px",
      width: "100%", // Stretch button to full width
      borderRadius: "0%",
      color: "black",
      borderColor: "#FAFAFA",
      textTransform: "none", // Set textTransform to none
      alignItems: "flex-start", // Align items flex-start to keep icon centered with top line
      textAlign: "start",
      justifyContent: "left",
      borderLeft: "0px",
      borderRight: "0px",
      padding: "4%",
      borderBottom: "0px",
    }}
  >
    {props.item.longName}
  </Button>;
}

function FloorButton(props: { item: TypeCoordinates, onClick: () => void }) {

  return (
    <Stack direction={"row"} sx={{
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      padding: "2%",
      alignItems: "center"
    }}>
      <Button
        startIcon={<img src={WalkingPerson} alt="Elevator"
                        style={{width: "35px", height: "35px", marginLeft: "-1px", marginRight: "3px"}}/>}
        sx={{ fontWeight: "bold", textTransform: "none",  }}
        onClick={props.onClick}>
        Floor {props.item.floor}
      </Button>
      <Button variant={"outlined"} onClick={props.onClick}
              sx={{
                height: "50%",
                marginRight: "2%"
              }}>
        View On Map
      </Button>
    </Stack>
  );
}

export default function TextIcon(props: {
  handleButtonClick2: () => void;
  checked2: boolean;
  nodesData: TypeCoordinates[];
  onClickText: (floor: Floor) => void;
}) {

  const [elevators] = useState<HTMLImageElement>(() => {
    const img: HTMLImageElement = new Image();
    img.src = Elevator;
    return img;
  });

  const [walking] = useState<HTMLImageElement>(() => {
    const img: HTMLImageElement = new Image();
    img.src = WalkingPerson;
    return img;
  });

  return (
    <>
      <Paper
        sx={{
          width: "100%",
          backgroundColor: "white",
          display: "flex",
          height: "100%",
          flexDirection: "column",
          marginTop: "1%",
          borderRadius: "0%",
          overflowY: "auto", // Apply overflow only to the Paper component
        }}
        elevation={4}
      >
        <Box sx={{ flexGrow: 1 }}>

          <Stack sx={{ width: "100%", height: "100%" }}>
            <Box
              sx={{
                backgroundColor: "#003A96",
                width: "100%",
              }}
            >
              <Stack direction={"row"} sx={{ padding: "10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                {/*<Stack direction={"row"} spacing={0.4}>*/}
                {/*  <Typography*/}
                {/*    color={"white"}*/}
                {/*    sx={{*/}
                {/*      minWidth: "90px"*/}
                {/*    }}*/}
                {/*  >*/}
                {/*    Est. Travel:*/}
                {/*  </Typography>*/}
                {/*  <DirectionsWalkIcon sx={{ fontSize: "large", color: "white", marginTop: "20px" }} />*/}
                {/*  <Typography*/}
                {/*    color={"#34CB2C"}*/}
                {/*    sx={{*/}
                {/*      minWidth: "90px",*/}
                {/*      fontWidth: "bold",*/}
                {/*    }}*/}
                {/*  >*/}
                {/*    6 min*/}
                {/*  </Typography>*/}
                {/*</Stack>*/}
                <Button
                  endIcon={<RemoveIcon sx={{ fontSize: "large", color: "white" }} />} // Set the font size to large and color to white
                  onClick={props.handleButtonClick2}
                  variant="text"
                  sx={{
                    width: "100%",
                    justifyContent: "end"
                  }}
                />
              </Stack>
            </Box>
            {props.nodesData.map((item, index) => (
              <Stack direction="row" alignItems="center" key={index}>

                {/*Start Button*/}
                {index === 0 && (
                  <Stack direction={"column"} sx={{
                    width: "100%"
                  }}>
                    <FloorButton onClick={() => props.onClickText(item.floor as Floor)} item={item}/>

                    <StartButton onClick={() => props.onClickText(item.floor as Floor)} item={item} index={index} nodesData={props.nodesData}/>
                  </Stack>
                )}

                {/*Path Buttons*/}
                {index !== 0 && index !== props.nodesData.length - 1 && props.nodesData[index - 1]?.floor === item.floor && (
                  <DirectionButton item={item} onClick={() => props.onClickText(item.floor as Floor)}
                                   nodesData={props.nodesData} index={index}/>
                )}
                {(index !== 0 && index !== props.nodesData.length - 1) && (props.nodesData[index - 1]?.floor !== item.floor) && (
                  <Stack direction={"column"} sx={{
                    width: "100%"
                  }}>
                    <FloorButton onClick={() => props.onClickText(item.floor as Floor)} item={item}/>

                    <DirectionButton item={item} onClick={() => props.onClickText(item.floor as Floor)}
                                     nodesData={props.nodesData} index={index}/>

                  </Stack>
                )}


                {/*Destination Buttons*/}
                {index === props.nodesData.length - 1 && props.nodesData[index - 1]?.floor === item.floor &&(
                  <DestinationButton onClick={() => props.onClickText(item.floor as Floor)} item={item}/>
                )}

                {index === props.nodesData.length - 1 && props.nodesData[index - 1]?.floor !== item.floor && (
                  <Stack direction={"column"} sx={{
                    width: "100%"
                  }}>
                    <FloorButton onClick={() => props.onClickText(item.floor as Floor)} item={item}/>

                    <DestinationButton onClick={() => props.onClickText(item.floor as Floor)} item={item}/>

                  </Stack>
                )}
              </Stack>
            ))}
          </Stack>
        </Box>
      </Paper>
    </>
  );
}

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { nodesDistances } from "common/src/nodesDistances.ts";
import TopBanner2 from "../components/banner/TopBanner2.tsx";
import L1MapImage from "../images/mapImages/00_thelowerlevel1.png";
import L2MapImage from "../images/mapImages/00_thelowerlevel2.png";
import FFMapImage from "../images/mapImages/01_thefirstfloor.png";
import SFMapImage from "../images/mapImages/02_thesecondfloor.png";
import TFMapImage from "../images/mapImages/03_thethirdfloor.png";
import Floor from "../components/map/FloorTabs.tsx";
import { sendRequest } from "common/src/sendRequest.ts";
import Draggable from "react-draggable";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { Coordinates } from "common/src/Coordinates.ts";

function MapEditingPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // const [nodeData, setNodesData] = useState<MapNodeType[]>([]);
  const [distancesData, setDistancesData] = useState<nodesDistances[]>([]);
  const [nodesData, setNodesData] = useState<
    { nodeID: string; coordinates: Coordinates }[]
  >([]);

  const floor = useRef<string>("L1");
  const [currImage, setCurrImage] = useState<HTMLImageElement>(() => {
    const image = new Image();
    image.src = L1MapImage;
    return image;
  });

  const [edgeDataLoaded, setEdgeDataLoaded] = useState<boolean>(false);

  async function loadEdgesDistance(request: sendRequest) {
    // const req = { req: "L1" };
    const distancesResponse = await axios.post("/api/sendDistances", request, {
      headers: { "Content-Type": "application/json" },
    });
    if (distancesResponse.status !== 200) {
      throw new Error("Failed to fetch data");
    }
    const distancePath = await distancesResponse.data;
    const distanceData = distancePath.message;

    setDistancesData(distanceData);
    // console.log("Updated distancesData:", distancePath);
  }

  async function loadNodesData(request: sendRequest) {
    const nodesResponse = await axios.post("/api/sendNodes", request, {
      headers: { "Content-Type": "application/json" },
    });
    if (nodesResponse.status !== 200) {
      throw new Error("Failed to fetch data");
    }

    const nodesPath = await nodesResponse.data;
    const nodesData = nodesPath.message;

    setNodesData(nodesData);
    console.log("nodesData", nodesData);
  }

  const handleFloorChange = (newFloor: string) => {
    const newImage = new Image();

    switch (newFloor) {
      case "L1":
        loadNodesData({ req: "L1" });
        loadEdgesDistance({ req: "L1" }).then(() => setEdgeDataLoaded(true));
        newImage.src = L1MapImage;
        floor.current = "L1";
        break;
      case "L2":
        loadNodesData({ req: "L2" });
        loadEdgesDistance({ req: "L2" }).then(() => setEdgeDataLoaded(true));
        newImage.src = L2MapImage;
        floor.current = "L2";
        break;
      case "1":
        loadEdgesDistance({ req: "1" }).then(() => setEdgeDataLoaded(true));
        newImage.src = FFMapImage;
        floor.current = "1";
        break;
      case "2":
        loadEdgesDistance({ req: "2" }).then(() => setEdgeDataLoaded(true));
        newImage.src = SFMapImage;
        floor.current = "2";
        break;
      case "3":
        loadEdgesDistance({ req: "3" }).then(() => setEdgeDataLoaded(true));
        newImage.src = TFMapImage;
        floor.current = "3";
        break;
      default:
        console.error("Returned map floor is not assigned to an image");
        return;
    }
    setCurrImage(newImage);
  };

  useEffect(() => {
    if (distancesData.length < 1) {
      // console.log("Loading Distances");
      loadEdgesDistance({ req: "L1" }).then(() => setEdgeDataLoaded(true));
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const processCanvas = () => {
      if (edgeDataLoaded) {
        canvas.width = currImage.width;
        canvas.height = currImage.height;

        ctx.clearRect(0, 0, currImage.width, currImage.height);
        ctx.drawImage(currImage, 0, 0, canvas.width, canvas.height);

        ctx.lineWidth = 2;
        ctx.strokeStyle = "red";
        ctx.font = "15px Arial";

        for (let i = 0; i < distancesData.length; i++) {
          if (distancesData[i]) {
            ctx.beginPath();
            ctx.moveTo(
              distancesData[i].startCoords.x,
              distancesData[i].startCoords.y,
            );
            ctx.lineTo(
              distancesData[i].endCoords.x,
              distancesData[i].endCoords.y,
            );
            ctx.stroke();
            ctx.closePath();

            ctx.fillText(
              distancesData[i].distance.toString(),
              (distancesData[i].startCoords.x + distancesData[i].endCoords.x) /
                2,
              (distancesData[i].startCoords.y + distancesData[i].endCoords.y) /
                2,
            );
          }
        }
      }
    };

    if (currImage.complete) {
      processCanvas();
    }

    currImage.onload = () => {
      processCanvas();
    };
    console.log(nodesData);

    console.log(distancesData); // Log distancesData here to see the updated value
  }, [currImage, distancesData, currImage.complete, edgeDataLoaded, nodesData]);

  return (
    <div>
      <TopBanner2 />
      <TransformWrapper>
        <TransformComponent>
          <Draggable>
            <canvas
              ref={canvasRef}
              style={{
                width: "100%",
                height: "100%",
                zIndex: 0,
                position: "relative",
              }}
              className={"firstFloorCanvas"}
            />
          </Draggable>
        </TransformComponent>
      </TransformWrapper>
      <Floor callback={handleFloorChange} />
    </div>
  );
}

export default MapEditingPage;

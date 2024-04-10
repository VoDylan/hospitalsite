import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { MapNodeType } from "common/src/map/MapNodeType.ts";
import MapImage from "../images/00_thelowerlevel1.png";
import { nodesDistances } from "common/src/nodesDistances.ts";
import TopBanner2 from "../components/TopBanner2.tsx";

function MapEditingPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nodeData, setNodesData] = useState<MapNodeType[]>([]);
  const [distancesData, setDistancesData] = useState<nodesDistances[]>([]);

  async function loadNodeData() {
    const data: MapNodeType[] = (await axios.get("/api/database/nodes")).data;
    setNodesData(data);
  }

  async function loadEdgesDistance() {
    const distancesResponse = await axios.get("/api/testPath");
    if (distancesResponse.status !== 200) {
      throw new Error("Failed to fetch data");
    }
    const distancePath = await distancesResponse.data;
    const distanceData = distancePath.message;
    console.log("distances", distanceData);
    setDistancesData(distanceData);
  }

  useEffect(() => {
    loadNodeData();
    loadEdgesDistance();
    // console.log(nodeData);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const image = new Image();
    image.src = MapImage;
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;

      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 2;
      ctx.strokeStyle = "red";
      ctx.font = "15px Arial";

      for (let i = 0; i < distancesData.length; i++) {
        ctx.beginPath();
        ctx.moveTo(
          distancesData[i].startCoords.x,
          distancesData[i].startCoords.y,
        );
        ctx.lineTo(distancesData[i].endCoords.x, distancesData[i].endCoords.y);
        ctx.stroke();
        ctx.closePath();

        ctx.fillText(
          distancesData[i].distance.toString(),
          (distancesData[i].startCoords.x + distancesData[i].endCoords.x) / 2,
          (distancesData[i].startCoords.y + distancesData[i].endCoords.y) / 2,
        );
      }

      ctx.fillStyle = "blue";
      ctx.strokeStyle = "blue";
      for (let i = 0; i < nodeData.length; i++) {
        ctx.beginPath();
        ctx.arc(nodeData[i].xcoord, nodeData[i].ycoord, 5, 0, 2 * Math.PI); // draw circle
        ctx.fill();
      }
    };
  });

  return (
    <div>
      <TopBanner2 />
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
    </div>
  );
}

export default MapEditingPage;

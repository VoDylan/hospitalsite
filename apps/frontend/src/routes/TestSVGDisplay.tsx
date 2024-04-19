import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";
// import Draggable from "react-draggable";
import L1SVG from "../components/map/svg/L1SVG.tsx";

export default function TestSVGDisplay() {

  console.log("Rendering SVG Image");
  return (
    <TransformWrapper
      maxScale={100}
    >
      <TransformComponent>
        <L1SVG width={window.innerWidth} height={window.innerHeight} />
      </TransformComponent>
    </TransformWrapper>
  );
}

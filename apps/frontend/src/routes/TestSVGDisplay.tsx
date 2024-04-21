import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";
// import Draggable from "react-draggable";
// import L1SVG from "../components/map/svg/L1SVG.tsx";
// import L2SVG from "../components/map/svg/L2SVG.tsx";
// import F1SVG from "../components/map/svg/F1SVG.tsx";
// import F2SVG from "../components/map/svg/F2SVG.tsx";
import F3SVG from "../components/map/svg/F3SVG.tsx";

export default function TestSVGDisplay() {

  console.log("Rendering SVG Image");
  return (
    <TransformWrapper maxScale={100}>
      <TransformComponent>
        <F3SVG width={window.innerWidth} height={window.innerHeight} />
      </TransformComponent>
    </TransformWrapper>
  );
}

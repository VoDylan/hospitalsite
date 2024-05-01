import React, {useState} from 'react';
import Slider from '@mui/material/Slider';
import Rotate3D from '../components/Rotate3D';
import myImage from '../images/mapImages/MapTestL1.svg'; // Import your image file
import myImageShadow from '../images/mapImages/MapTestL1LightShadow.svg';
import myImageL2 from '../images/mapImages/MapTestL2.svg';
import myImageShadowL2 from '../images/mapImages/MapTestL2Shadow.svg';
import myImageF1 from '../images/mapImages/MapTestF1.svg';
import myImageShadowF1 from '../images/mapImages/MapTestF1Shadow.svg';
import myImageF2 from '../images/mapImages/MapTestF2.svg';
import myImageShadowF2 from '../images/mapImages/MapTestF2Shadow.svg';
import myImageF3 from '../images/mapImages/MapTestF3.svg';
import myImageShadowF3 from '../images/mapImages/MapTestF3Shadow.svg';
import {Box} from "@mui/material";
import useWindowSize from "../hooks/useWindowSize.tsx";
import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";
//import { TransformComponent} from "react-zoom-pan-pinch";

export default function Test() {
    const defaultAngle = 60;
    const defaultTopValue1 = 31.5;
    const defaultTopValue2 = -.75;
    const imageHeight = 500;
    const imageWidth = 1000;
    const [angle, setAngle] = useState(defaultAngle);

    const [windowWidth, windowHeight] = useWindowSize();

    const calculatePixelSize1 = (currentAngle: number) => {
      const minPixelSize = defaultTopValue1;
      const decreaseRate = 1.65; // Rate at which pixel size decreases per degree away from 60
      return minPixelSize - Math.abs(currentAngle - defaultAngle) * decreaseRate;
    };

    const calculatePixelSize2 = (currentAngle: number) => {
      const minPixelSize = defaultTopValue2;
      const decreaseRate = .05; // Rate at which pixel size decreases per degree away from 60
      return minPixelSize - Math.abs(currentAngle - defaultAngle) * decreaseRate;
    };

    const handleChange = (event: Event, newValue: number | number[]) => {
      const newAngle = newValue as number;
      setAngle(newAngle);
    };

  return (
    <Box
      position={"absolute"}
      top={120}
      left={0}
      width={"100%"}
      height={`${windowHeight - 120}px`}
    >
      <Box
        sx={{position: "absolute",
          top: '52%',
          right: 0,
          marginRight: "15px",
          zIndex: '999',
          height: "23%",
          width: "3%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          bgcolor: "#f3f2f2",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)"
        }}
      >
        <Slider
          aria-label="Angle"
          value={angle}
          onChange={handleChange}
          orientation="vertical"
          min={40}
          max={60}
          marks
          valueLabelDisplay="auto"
          sx={{ height: "72%", width: "20%", top: "3%" }}
        />
      </Box>

      <TransformWrapper
        wheel={{
          step: 50
        }}

      >
        <TransformComponent
          wrapperStyle={{
            width: "100%",
            height: "100%",
          }}
          contentStyle={{
            position: "absolute",
            width: "1000px",
          }}
        >
          <>
            {/* FLOOR F3 */}
            <div style={{
              position: 'relative',
              height: "500px",
              zIndex: 0,
            }}>
              <Rotate3D x={100} y={-20} z={40} angle={angle}>
                <img src={myImageF3} alt="My" height={imageHeight} width={imageWidth}/>
              </Rotate3D>
              {/* F3 SHADOW */}
              <div style={{
                position: 'absolute',
                top: `${calculatePixelSize1(angle)}px`,
                zIndex: -1,
              }}>
                <Rotate3D x={100} y={-20} z={40} angle={angle}>
                  <img src={myImageShadowF3} alt="My Image" height={imageHeight} width={imageWidth}/>
                </Rotate3D>
              </div>
              <div style={{
                position: 'absolute',
                top: `${calculatePixelSize2(angle)}px`,
                zIndex: -2,
              }}>
                <Rotate3D x={100} y={-20} z={40} angle={angle}>
                  <img src={myImageShadowF3} alt="My Image" height={imageHeight} width={imageWidth}/>
                </Rotate3D>
              </div>
            </div>

            {/* FLOOR F2 */}
            <div style={{
              position: 'relative',
              zIndex: 0
            }}>
              <Rotate3D x={100} y={-20} z={40} angle={angle}>
                <img src={myImageF2} alt="My" height={imageHeight} width={imageWidth}/>
              </Rotate3D>
              {/* F2 SHADOW */}
              <div style={{
                position: 'absolute',
                top: `${calculatePixelSize1(angle)}px`,
                zIndex: -1,
              }}>
                <Rotate3D x={100} y={-20} z={40} angle={angle}>
                  <img src={myImageShadowF2} alt="My Image" height={imageHeight} width={imageWidth}/>
                </Rotate3D>
              </div>
              <div style={{
                position: 'absolute',
                top: `${calculatePixelSize2(angle)}px`,
                zIndex: -2,
              }}>
                <Rotate3D x={100} y={-20} z={40} angle={angle}>
                  <img src={myImageShadowF2} alt="My Image" height={imageHeight} width={imageWidth}/>
                </Rotate3D>
              </div>
            </div>

            {/* FLOOR F1 */}
            <div style={{
              position: 'relative',
              zIndex: 0,
            }}>
              <Rotate3D x={100} y={-20} z={40} angle={angle}>
                <img src={myImageF1} alt="My" height={imageHeight} width={imageWidth}/>
              </Rotate3D>
              {/* F1 SHADOW */}
              <div style={{
                position: 'absolute',
                top: `${calculatePixelSize1(angle)}px`,
                zIndex: -1,
              }}>
                <Rotate3D x={100} y={-20} z={40} angle={angle}>
                  <img src={myImageShadowF1} alt="My Image" height={imageHeight} width={imageWidth}/>
                </Rotate3D>
              </div>
              <div style={{
                position: 'absolute',
                top: `${calculatePixelSize2(angle)}px`,
                zIndex: -2,
              }}>
                <Rotate3D x={100} y={-20} z={40} angle={angle}>
                  <img src={myImageShadowF1} alt="My Image" height={imageHeight} width={imageWidth}/>
                </Rotate3D>
              </div>
            </div>

            {/* FLOOR L1 */}
            <div style={{
              position: 'relative',
              zIndex: 0,
            }}>
              <Rotate3D x={100} y={-20} z={40} angle={angle}>
                <img src={myImage} alt="My Image" height={imageHeight} width={imageWidth}/>
              </Rotate3D>
              {/* L1 SHADOW */}
              <div style={{
                position: 'absolute',
                top: `${calculatePixelSize1(angle)}px`,
                zIndex: -1,
              }}>
                <Rotate3D x={100} y={-20} z={40} angle={angle}>
                  <img src={myImageShadow} alt="My Image" height={imageHeight} width={imageWidth}/>
                </Rotate3D>
              </div>
              <div style={{
                position: 'absolute',
                top: `${calculatePixelSize2(angle)}px`,
                zIndex: -2,
              }}>
                <Rotate3D x={100} y={-20} z={40} angle={angle}>
                  <img src={myImageShadow} alt="My Image" height={imageHeight} width={imageWidth}/>
                </Rotate3D>
              </div>
            </div>

            {/* FLOOR L2 */}
            <div style={{
              position: 'relative',
              zIndex: 0
            }}>
              <Rotate3D x={100} y={-20} z={40} angle={angle}>
                <img src={myImageL2} alt="My" height={imageHeight} width={imageWidth}/>
              </Rotate3D>
              {/* L2 SHADOW */}
              <div style={{
                position: 'absolute',
                top: `${calculatePixelSize1(angle)}px`,
                zIndex: -1,
              }}>
                <Rotate3D x={100} y={-20} z={40} angle={angle}>
                  <img src={myImageShadowL2} alt="My Image" height={imageHeight} width={imageWidth}/>
                </Rotate3D>
              </div>
              <div style={{
                position: 'absolute',
                top: `${calculatePixelSize2(angle)}px`,
                zIndex: -2,
              }}>
                <Rotate3D x={100} y={-20} z={40} angle={angle}>
                  <img src={myImageShadowL2} alt="My Image" height={imageHeight} width={imageWidth}/>
                </Rotate3D>
              </div>
            </div>
          </>
        </TransformComponent>
      </TransformWrapper>
     </Box>
  );
}


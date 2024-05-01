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
//import { TransformComponent} from "react-zoom-pan-pinch";

const Test: React.FC = () => {
    const defaultAngle = 60;
    const defaultTopValue1 = 31.5;
    const defaultTopValue2 = -.75;
    const [angle, setAngle] = useState(defaultAngle);

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
    <div>

      <Box sx={{display: 'flex', justifyContent: "center", marginTop: '50px', zIndex: '999', width: '60%'}}>
        <Slider
          sx={{ display: 'flex', justifyContent: "center", zIndex: '999', marginLeft: "550px", marginTop: "175px"}}
          aria-label="Angle"
          value={angle}
          onChange={handleChange}
          min={40}
          max={60}
          marks={true}
          valueLabelDisplay="auto"
        />
      </Box>

      <div>

          {/* FLOOR F3 */}
          <div style={{position: 'absolute', top: '-100px', left: '200px', zIndex: 0, height: "0.1%", width: "0.1%"}}>
            <Rotate3D x={100} y={-20} z={40} angle={angle}>
              <img src={myImageF3} alt="My" height={1000} width={1000}/>
            </Rotate3D>
            {/* F3 SHADOW */}
            <div style={{
              position: 'absolute',
              top: `${calculatePixelSize1(angle)}px`,
              left: '0px',
              zIndex: -1,
              height: "0.1%",
              width: "0.1%"
            }}>
              <Rotate3D x={100} y={-20} z={40} angle={angle}>
                <img src={myImageShadowF3} alt="My Image" height={1000} width={1000}/>
              </Rotate3D>
            </div>
            <div style={{
              position: 'absolute',
              top: `${calculatePixelSize2(angle)}px`,
              left: '-1px',
              zIndex: -2,
              height: "0.1%",
              width: "0.1%"
            }}>
              <Rotate3D x={100} y={-20} z={40} angle={angle}>
                <img src={myImageShadowF3} alt="My Image" height={1000} width={1000}/>
              </Rotate3D>
            </div>
          </div>

          {/* FLOOR F2 */}
          <div style={{position: 'absolute', top: '275px', left: '200px', zIndex: 0, height: "0.1%", width: "0.1%"}}>
            <Rotate3D x={100} y={-20} z={40} angle={angle}>
              <img src={myImageF2} alt="My" height={1000} width={1000}/>
            </Rotate3D>
            {/* F2 SHADOW */}
            <div style={{
              position: 'absolute',
              top: `${calculatePixelSize1(angle)}px`,
              left: '0px',
              zIndex: -1,
              height: "0.1%",
              width: "0.1%"
            }}>
              <Rotate3D x={100} y={-20} z={40} angle={angle}>
                <img src={myImageShadowF2} alt="My Image" height={1000} width={1000}/>
              </Rotate3D>
            </div>
            <div style={{
              position: 'absolute',
              top: `${calculatePixelSize2(angle)}px`,
              left: '-1px',
              zIndex: -2,
              height: "0.1%",
              width: "0.1%"
            }}>
              <Rotate3D x={100} y={-20} z={40} angle={angle}>
                <img src={myImageShadowF2} alt="My Image" height={1000} width={1000}/>
              </Rotate3D>
            </div>
          </div>

          {/* FLOOR F1 */}
          <div style={{position: 'absolute', top: '650px', left: '200px', zIndex: 0, height: "0.1%", width: "0.1%"}}>
            <Rotate3D x={100} y={-20} z={40} angle={angle}>
              <img src={myImageF1} alt="My" height={1000} width={1000}/>
            </Rotate3D>
            {/* F1 SHADOW */}
            <div style={{
              position: 'absolute',
              top: `${calculatePixelSize1(angle)}px`,
              left: '0px',
              zIndex: -1,
              height: "0.1%",
              width: "0.1%"
            }}>
              <Rotate3D x={100} y={-20} z={40} angle={angle}>
                <img src={myImageShadowF1} alt="My Image" height={1000} width={1000}/>
              </Rotate3D>
            </div>
            <div style={{
              position: 'absolute',
              top: '-.25px',
              left: '-1px',
              zIndex: -2,
              height: "0.1%",
              width: "0.1%"
            }}>
              <Rotate3D x={100} y={-20} z={40} angle={angle}>
                <img src={myImageShadowF1} alt="My Image" height={1000} width={1000}/>
              </Rotate3D>
            </div>
          </div>

          {/* FLOOR L1 */}
          <div style={{position: 'absolute', top: '1025px', left: '200px', zIndex: 0, height: "0.1%", width: "0.1%"}}>
            <Rotate3D x={100} y={-20} z={40} angle={angle}>
              <img src={myImage} alt="My Image" height={1000} width={1000}/>
            </Rotate3D>
            {/* L1 SHADOW */}
            <div style={{
              position: 'absolute',
              top: `${calculatePixelSize1(angle)}px`,
              left: '0px',
              zIndex: -1,
              height: "0.1%",
              width: "0.1%"
            }}>
              <Rotate3D x={100} y={-20} z={40} angle={angle}>
                <img src={myImageShadow} alt="My Image" height={1000} width={1000}/>
              </Rotate3D>
            </div>
            <div style={{
              position: 'absolute',
              top: `${calculatePixelSize2(angle)}px`,
              left: '-1px',
              zIndex: -2,
              height: "0.1%",
              width: "0.1%"
            }}>
              <Rotate3D x={100} y={-20} z={40} angle={angle}>
                <img src={myImageShadow} alt="My Image" height={1000} width={1000}/>
              </Rotate3D>
            </div>
          </div>

          {/* FLOOR L2 */}
          <div style={{position: 'absolute', top: '1400px', left: '200px', zIndex: 0, height: "0.1%", width: "0.1%"}}>
            <Rotate3D x={100} y={-20} z={40} angle={angle}>
              <img src={myImageL2} alt="My" height={1000} width={1000}/>
            </Rotate3D>
            {/* L2 SHADOW */}
            <div style={{
              position: 'absolute',
              top: `${calculatePixelSize1(angle)}px`,
              left: '0px',
              zIndex: -1,
              height: "0.1%",
              width: "0.1%"
            }}>
              <Rotate3D x={100} y={-20} z={40} angle={angle}>
                <img src={myImageShadowL2} alt="My Image" height={1000} width={1000}/>
              </Rotate3D>
            </div>
            <div style={{
              position: 'absolute',
              top: `${calculatePixelSize2(angle)}px`,
              left: '-1px',
              zIndex: -2,
              height: "0.1%",
              width: "0.1%"
            }}>
              <Rotate3D x={100} y={-20} z={40} angle={angle}>
                <img src={myImageShadowL2} alt="My Image" height={1000} width={1000}/>
              </Rotate3D>
            </div>
          </div>
      </div>

    </div>
);
};

export default Test;


import React from 'react';
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

const Test: React.FC = () => {
  return (
    <>
      {/* FLOOR F3 */}
      <div style={{position: 'absolute', top: '0px', zIndex: -5}}>
        <Rotate3D x={100} y={-20} z={30} angle={70}>
          <img src={myImageF3} alt="My"/>
        </Rotate3D>
        {/* F3 SHADOW */}
        <div style={{position: 'absolute', top: '22.5px', left: '0px', zIndex: -2}}>
          <Rotate3D x={100} y={-20} z={30} angle={70}>
            <img src={myImageShadowF3} alt="My Image"/>
          </Rotate3D>
        </div>
        <div style={{position: 'absolute', top: '-.75px', left: '1px', zIndex: -3}}>
          <Rotate3D x={100} y={-20} z={30} angle={70}>
            <img src={myImageShadowF3} alt="My Image"/>
          </Rotate3D>
        </div>
        <div style={{position: 'absolute', top: '.75px', left: '-1px', zIndex: -4}}>
          <Rotate3D x={100} y={-20} z={30} angle={70}>
            <img src={myImageShadowF3} alt="My Image"/>
          </Rotate3D>
        </div>
        <div style={{position: 'absolute', top: '-1.58px', left: '.2px', zIndex: -4}}>
          <Rotate3D x={100} y={-20} z={30} angle={70}>
            <img src={myImageShadowF3} alt="My Image"/>
          </Rotate3D>
        </div>
      </div>

      {/* FLOOR F2 */}
      <div style={{position: 'absolute', top: '400px', zIndex: -5}}>
        <Rotate3D x={100} y={-20} z={30} angle={70}>
          <img src={myImageF2} alt="My"/>
        </Rotate3D>
        {/* F2 SHADOW */}
        <div style={{position: 'absolute', top: '22.5px', left: '0px', zIndex: -2}}>
          <Rotate3D x={100} y={-20} z={30} angle={70}>
            <img src={myImageShadowF2} alt="My Image"/>
          </Rotate3D>
        </div>
        <div style={{position: 'absolute', top: '-.75px', left: '1px', zIndex: -3}}>
          <Rotate3D x={100} y={-20} z={30} angle={70}>
            <img src={myImageShadowF2} alt="My Image"/>
          </Rotate3D>
        </div>
        <div style={{position: 'absolute', top: '.75px', left: '-1px', zIndex: -4}}>
          <Rotate3D x={100} y={-20} z={30} angle={70}>
            <img src={myImageShadowF2} alt="My Image"/>
          </Rotate3D>
        </div>
        <div style={{position: 'absolute', top: '-1.58px', left: '.2px', zIndex: -4}}>
          <Rotate3D x={100} y={-20} z={30} angle={70}>
            <img src={myImageShadowF2} alt="My Image"/>
          </Rotate3D>
        </div>
      </div>

      {/* FLOOR F1 */}
      <div style={{position: 'absolute', top: '800px', zIndex: -5}}>
        <Rotate3D x={100} y={-20} z={30} angle={70}>
          <img src={myImageF1} alt="My"/>
        </Rotate3D>
        {/* F1 SHADOW */}
        <div style={{position: 'absolute', top: '22.5px', left: '0px', zIndex: -2}}>
          <Rotate3D x={100} y={-20} z={30} angle={70}>
            <img src={myImageShadowF1} alt="My Image"/>
          </Rotate3D>
        </div>
        <div style={{position: 'absolute', top: '-.75px', left: '1px', zIndex: -3}}>
          <Rotate3D x={100} y={-20} z={30} angle={70}>
            <img src={myImageShadowF1} alt="My Image"/>
          </Rotate3D>
        </div>
        <div style={{position: 'absolute', top: '.75px', left: '-1px', zIndex: -4}}>
          <Rotate3D x={100} y={-20} z={30} angle={70}>
            <img src={myImageShadowF1} alt="My Image"/>
          </Rotate3D>
        </div>
        <div style={{position: 'absolute', top: '-1.58px', left: '.2px', zIndex: -4}}>
          <Rotate3D x={100} y={-20} z={30} angle={70}>
            <img src={myImageShadowF1} alt="My Image"/>
          </Rotate3D>
        </div>
      </div>

      {/* FLOOR L1 */}
      <div style={{position: 'absolute',top: '1200px', zIndex: -5}}>
        <Rotate3D x={100} y={-20} z={30} angle={70}>
          <img src={myImage} alt="My Image"/>
        </Rotate3D>
        {/* L1 SHADOW */}
        <div style={{position: 'absolute', top: '22.5px', left: '0px', zIndex: -2}}>
          <Rotate3D x={100} y={-20} z={30} angle={70}>
            <img src={myImageShadow} alt="My Image"/>
          </Rotate3D>
        </div>
        <div style={{position: 'absolute', top: '-.75px', left: '1px', zIndex: -3}}>
          <Rotate3D x={100} y={-20} z={30} angle={70}>
            <img src={myImageShadow} alt="My Image"/>
          </Rotate3D>
        </div>
        <div style={{position: 'absolute', top: '.75px', left: '-1px', zIndex: -4}}>
          <Rotate3D x={100} y={-20} z={30} angle={70}>
            <img src={myImageShadow} alt="My Image"/>
          </Rotate3D>
        </div>
        <div style={{position: 'absolute', top: '-1.58px', left: '.2px', zIndex: -4}}>
          <Rotate3D x={100} y={-20} z={30} angle={70}>
            <img src={myImageShadow} alt="My Image"/>
          </Rotate3D>
        </div>
      </div>

      {/* FLOOR L2 */}
      <div style={{position: 'absolute', top: '1600px', zIndex: -5}}>
        <Rotate3D x={100} y={-20} z={30} angle={70}>
          <img src={myImageL2} alt="My"/>
        </Rotate3D>
        {/* L2 SHADOW */}
        <div style={{position: 'absolute', top: '22.5px', left: '0px', zIndex: -2}}>
          <Rotate3D x={100} y={-20} z={30} angle={70}>
            <img src={myImageShadowL2} alt="My Image"/>
          </Rotate3D>
        </div>
        <div style={{position: 'absolute', top: '-.75px', left: '1px', zIndex: -3}}>
          <Rotate3D x={100} y={-20} z={30} angle={70}>
            <img src={myImageShadowL2} alt="My Image"/>
          </Rotate3D>
        </div>
        <div style={{position: 'absolute', top: '.75px', left: '-1px', zIndex: -4}}>
          <Rotate3D x={100} y={-20} z={30} angle={70}>
            <img src={myImageShadowL2} alt="My Image"/>
          </Rotate3D>
        </div>
        <div style={{position: 'absolute', top: '-1.58px', left: '.2px', zIndex: -4}}>
          <Rotate3D x={100} y={-20} z={30} angle={70}>
            <img src={myImageShadowL2} alt="My Image"/>
          </Rotate3D>
        </div>
      </div>
    </>
  );
};

export default Test;

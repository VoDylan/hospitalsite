import React from 'react';
import Rotate3D from '../components/Rotate3D';
import myImage from '../images/mapImages/MapTestF1.svg'; // Import your image file
//import myImageShadow from '../images/mapImages/MapTestF1Shadow.svg';
import myImageShadow from '../images/mapImages/MapTestF1LightShadow.svg';

const Test: React.FC = () => {
  return (
    <div style={{position: 'absolute'}}>
      {/* Main Image */}
      <Rotate3D x={100} y={-20} z={30} angle={70}>
        <img src={myImage} alt="My Image"/>
      </Rotate3D>

      {/* Shadow Images */}
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
  );
};

export default Test;

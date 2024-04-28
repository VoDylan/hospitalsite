import React from 'react';
import Rotate3D from '../components/Rotate3D';
import myImage from '../images/mapImages/MapTestF1.svg'; // Import your image file
import myImageShadow from '../images/mapImages/MapTestF1Shadow.svg';

const Test: React.FC = () => {
  return (
    <div>
      <Rotate3D x={5} y={0} z={0} angle={50}>
        <img src={myImage} alt="My Image"/>
      </Rotate3D>
      <div style={{position: 'absolute', top: '10px', left: '-1px', zIndex: -1}}>
        <Rotate3D x={3} y={0} z={0} angle={50}>
          <img
            src={myImageShadow}
            alt="My Image"
          />
        </Rotate3D>
      </div>
    </div>
  );
};

export default Test;

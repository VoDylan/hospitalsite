import React from 'react';

interface Rotate3DProps {
  x: number;
  y: number;
  z: number;
  angle: number;
  children: React.ReactNode;
}

const Rotate3D: React.FC<Rotate3DProps> = ({ x, y, z, angle, children }) => {
  // Calculate the rotation string
  const rotation = `rotate3d(${x}, ${y}, ${z}, ${angle}deg)`;

  return (
    <div style={{ transform: rotation }}>
      {children}
    </div>
  );
};

export default Rotate3D;

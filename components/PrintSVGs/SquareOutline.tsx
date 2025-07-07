// components/HUD/SquareOutline.tsx
import React from 'react';

interface SquareOutlineProps extends React.SVGProps<SVGSVGElement> {}

const SquareOutline: React.FC<SquareOutlineProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      {...props}
    >
      <title>Square Outline</title>
      <rect x="5" y="5" width="40" height="40" />
    </svg>
  );
};

export default SquareOutline;

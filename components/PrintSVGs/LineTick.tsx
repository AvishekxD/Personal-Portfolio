// components/HUD/LineTick.tsx
import React from 'react';

interface LineTickProps extends React.SVGProps<SVGSVGElement> {}

const LineTick: React.FC<LineTickProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      {...props}
    >
      <title>Line with Tick</title>
      <path d="M10 10 H90 M50 10 V15" />
    </svg>
  );
};

export default LineTick;

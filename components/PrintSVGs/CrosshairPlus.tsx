import React from 'react';

interface CrosshairPlusProps extends React.SVGProps<SVGSVGElement> {}

const CrosshairPlus: React.FC<CrosshairPlusProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <title>Crosshair Plus</title>
      {/* Horizontal line */}
      <path d="M2 12 H22" />
      {/* Vertical line */}
      <path d="M12 2 V22" />
      {/* Small plus in center */}
      <path d="M10 12 H14 M12 10 V14" />
    </svg>
  );
};

export default CrosshairPlus;

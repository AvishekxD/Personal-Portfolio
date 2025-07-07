// components/HUD/Reticle.tsx
import React from 'react';

interface ReticleProps extends React.SVGProps<SVGSVGElement> {}

const Reticle: React.FC<ReticleProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <title>Reticle</title>
      <circle cx="50" cy="50" r="40" />
      <circle cx="50" cy="50" r="10" />
      <path d="M50 10 V0 M50 90 V100 M10 50 H0 M90 50 H100" />
    </svg>
  );
};

export default Reticle;

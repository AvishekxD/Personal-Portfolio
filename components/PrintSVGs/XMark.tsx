// components/HUD/XMark.tsx
import React from 'react';

interface XMarkProps extends React.SVGProps<SVGSVGElement> {
  // You can add specific props here if this X mark has unique configurable aspects
}

const XMark: React.FC<XMarkProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor" // Allows color to be set via Tailwind text-color or direct style
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props} // Pass all other props (className, style, onClick, etc.)
    >
      <title>X Mark</title>
      <path d="M6 6 L18 18 M6 18 L18 6" />
    </svg>
  );
};

export default XMark;

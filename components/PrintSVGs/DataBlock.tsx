import React from 'react';

interface DataBlockProps extends React.SVGProps<SVGSVGElement> {
  title?: string;
  value?: string;
  // You could add props for more lines of text, or specific internal graphics
}

const DataBlock: React.FC<DataBlockProps> = ({
  title = "SN:00:43/20:34",
  value = "RESTORE POINT",
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 100" // Adjust viewBox as needed for content
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      {...props}
    >
      <title>Data Block</title>
      {/* Outer frame */}
      <rect x="5" y="5" width="190" height="90" stroke="currentColor" fill="none" />

      {/* Internal top line */}
      <path d="M10 25 H190" />

      {/* Text elements (using SVG <text> for simplicity, but could be paths if traced) */}
      <text x="10" y="20" fontSize="10" fontFamily="var(--font-space-mono)" fill="currentColor">
        {title}
      </text>
      <text x="10" y="40" fontSize="8" fontFamily="var(--font-space-mono)" fill="currentColor">
        {value}
      </text>
      <text x="10" y="50" fontSize="8" fontFamily="var(--font-space-mono)" fill="currentColor">
        FILE: 7A-RV
      </text>
      <text x="10" y="60" fontSize="8" fontFamily="var(--font-space-mono)" fill="currentColor">
        STATUS: CONTROL
      </text>
      <text x="10" y="70" fontSize="8" fontFamily="var(--font-space-mono)" fill="currentColor">
        P:24:24 S
      </text>
      <text x="10" y="80" fontSize="8" fontFamily="var(--font-space-mono)" fill="currentColor">
        F16
      </text>

      {/* Small corner details (approximated) */}
      <path d="M5 25 L5 15 L15 15" />
      <path d="M195 25 L195 15 L185 15" />
      <path d="M5 75 L5 85 L15 85" />
      <path d="M195 75 L195 85 L185 85" />
    </svg>
  );
};

export default DataBlock;

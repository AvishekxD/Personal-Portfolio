import React from 'react';

interface ConnectionLinesProps extends React.SVGProps<SVGSVGElement> {
  // You can add props to control segments, angles, etc., for more dynamic lines
}

const ConnectionLines: React.FC<ConnectionLinesProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 100" // Adjusted viewBox for the shape
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <title>Angular Connection Lines with Nodes</title>
      {/* Main angular path */}
      <path d="M10 90 L50 90 L50 50 L90 50 L90 10 L130 10 L130 50 L170 50 L170 90 L190 90" />

      {/* Small squares at key connection points */}
      <rect x="47" y="47" width="6" height="6" fill="currentColor" stroke="none" />
      <rect x="87" y="7" width="6" height="6" fill="currentColor" stroke="none" />
      <rect x="127" y="47" width="6" height="6" fill="currentColor" stroke="none" />
      <rect x="167" y="87" width="6" height="6" fill="currentColor" stroke="none" />

      {/* Small open squares/boxes (approximated) */}
      <rect x="40" y="40" width="20" height="20" stroke="currentColor" strokeWidth="1" fill="none" />
      <rect x="80" y="0" width="20" height="20" stroke="currentColor" strokeWidth="1" fill="none" />
      <rect x="120" y="40" width="20" height="20" stroke="currentColor" strokeWidth="1" fill="none" />
      <rect x="160" y="80" width="20" height="20" stroke="currentColor" strokeWidth="1" fill="none" />
    </svg>
  );
};

export default ConnectionLines;

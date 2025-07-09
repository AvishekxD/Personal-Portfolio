import React from 'react';

interface DataGridDotsProps extends React.SVGProps<SVGSVGElement> {
  rows?: number;
  cols?: number;
  dotSize?: number; // Size of each dot (square)
  spacing?: number; // Spacing between dots
}

const DataGridDots: React.FC<DataGridDotsProps> = ({
  rows = 5,
  cols = 5,
  dotSize = 2,
  spacing = 8,
  ...props
}) => {
  const viewBoxWidth = cols * (dotSize + spacing) - spacing;
  const viewBoxHeight = rows * (dotSize + spacing) - spacing;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      fill="currentColor" // Dots will be filled
      {...props}
    >
      <title>{`${rows}x${cols} Data Grid Dots`}</title>
      {Array.from({ length: rows }).map((_, rIdx) =>
        Array.from({ length: cols }).map((_, cIdx) => (
          <rect
            key={`${rIdx}-${cIdx}`}
            x={cIdx * (dotSize + spacing)}
            y={rIdx * (dotSize + spacing)}
            width={dotSize}
            height={dotSize}
          />
        ))
      )}
    </svg>
  );
};

export default DataGridDots;

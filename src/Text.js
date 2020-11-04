import React from 'react'

const Text = ({ matrix, children, y = 0, textAnchor, style }) => (
    <text
      transform={`matrix(${matrix})`}
      style={{ font: "12px sans-serif", userSelect: 'none', ...style }}
      fill="#333"
      fillOpacity="1"
      stroke="none"
      clipPath="none"
    >
      <tspan dominantBaseline="middle" textAnchor={textAnchor} x={0} y={y}>
        {children}
      </tspan>
    </text>
  );
  
  export default Text
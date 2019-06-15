import React from 'react';

const bikeRadius = 18;
const pillarSize = 28;
const Studio = ({ bikeCount, getX, getY, opacity, hasPillar, getPillarX, getPillarY }) => (
  <g opacity={opacity}>
    {Array(bikeCount).fill(1).map((_, bikeIdx) => {
      const bikeNumber = bikeIdx + 1;
      const x = getX(bikeNumber);
      const y = getY(bikeNumber);
      return (
        <g>
          <circle
            cx={x}
            cy={y}
            r={bikeRadius}
            fill="rgba(45,45,45,.9)"
          />
          <text
            x={x}
            y={y}
            fill="white"
            text-anchor="middle"
            alignment-baseline="middle"
            style={{
              fontSize: '15px',
              fontFamily: 'soin_sans_neueroman,sans-serif',
            }}
          >
            {bikeNumber}
          </text>
        </g>
      );
    })}
    {hasPillar && (
      <g>
        <rect
          width={pillarSize}
          height={pillarSize}
          x={getPillarX()}
          y={getPillarY(pillarSize)}
          fill="#ccc"
        />
        <text
          x={getPillarX()}
          y={getPillarY(pillarSize)}
          fill="white"
          // text-anchor="middle"
          // alignment-baseline="middle"
          style={{
            fontSize: '15px',
            fontFamily: 'soin_sans_neueroman,sans-serif',
          }}
        >
          P
        </text>
      </g>
    )}
  </g>
);

export default Studio;

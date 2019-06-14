import React from 'react';

const inset = 23;
const bikeRadius = 18;
const pillarSize = 28;
const Studio = ({ rows, pillarPosition }) => rows.map((r, i) => (
  <g transform={`translate(${inset * r.inset}, 0)`}>
    {Array(r.end - r.start + 1).fill(1).map((_, j) => (
      <React.Fragment>
        <g>
          <circle
            cx={(j * 10) + (j * bikeRadius * 2) + (r.hasPillar && j + r.start >= pillarPosition ?  20 + (bikeRadius * 3): 0)}
            cy={(bikeRadius * 2) * (i + 1) + (i * 10)}
            r={bikeRadius}
            fill="rgba(45,45,45,.9)"
          />
          <text
            x={(j * 10) + (j * bikeRadius * 2) + (r.hasPillar && j + r.start >= pillarPosition ?  20 + (bikeRadius * 3): 0)}
            y={(bikeRadius * 2) * (i + 1) + (i * 10)}
            fill="white"
            text-anchor="middle"
            alignment-baseline="middle"
            style={{
              fontSize: '15px',
              fontFamily: 'soin_sans_neueroman,sans-serif',
            }}
          >
            {j + r.start}
          </text>
        </g>
        {j + r.start === pillarPosition && (
          <g>
            <rect
              width={pillarSize}
              height={pillarSize}
              x={(j * 10) + (j * bikeRadius * 2)}
              y={(bikeRadius * 2) * (i + 1) + (i * 10) - (pillarSize / 2)}
              fill="#ccc"
            />
            <text
              x={(j * 10) + (j * bikeRadius * 2) + (pillarSize /2)}
              y={(bikeRadius * 2) * (i + 1) + (i * 10)}
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
      </React.Fragment>
    ))}
  </g>
));

export default Studio;

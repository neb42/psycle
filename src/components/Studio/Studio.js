import React from 'react';
import { selectAll } from 'd3-selection';
import { transition } from 'd3-transition';

import * as Studio1 from './studio1';
import * as Studio2 from './studio2';

const bikeRadius = 18;
const pillarSize = 28;

export default class Studio extends React.Component {
  state = {
    Studio: null,
  };

  componentDidUpdate(prevProps) {
    const { studio } = this.props;
    const { studio: prevStudio } = prevProps;
    if (prevStudio === 'studio1' && studio === 'studio2') {
      this.transition(Studio2, Studio1);
    } else if (prevStudio === 'studio2' && studio === 'studio1') {
      this.transition(Studio1, Studio2);
    } else if (prevStudio === null) {
      if (studio === 'studio1') {
        this.transition(Studio1, Studio2);
      } else if (studio === 'studio2') {
        this.transition(Studio2, Studio1);
      }
    } else if (studio === null) {
      this.hideStudio();
    }
  }

  get Studio() {
    const { studio } = this.props;
    if (studio === 'studio1') {
      return Studio1;
    }
    if (studio === 'studio2') {
      return Studio2;
    }
    return null;
  }

  transition = (Studio, PrevStudio) => {
    if (Studio.bikeCount > PrevStudio.bikeCount) {
      selectAll('.bike-circle')
        .filter((_, i) => i >= PrevStudio.bikeCount)
        .transition(transition('a').duration(600))
        .attr('opacity', 1);

      selectAll('.bike-text')
        .filter((_, i) => i >= PrevStudio.bikeCount)
        .transition(transition('aa').duration(600))
        .attr('opacity', 1);

      selectAll('.bike-circle')
        .filter((_, i) => i >= PrevStudio.bikeCount)
        .transition(transition('b').duration(0))
        .attr('x', (_, i) => Studio.getX(i + 1))
        .attr('y', (_, i) => Studio.getY(i + 1));

      selectAll('.bike-text')
        .filter((_, i) => i >= PrevStudio.bikeCount)
        .transition(transition('bb').duration(0))
        .attr('x', (_, i) => Studio.getX(i + 1))
        .attr('y', (_, i) => Studio.getY(i + 1));
    }

    if (Studio.bikeCount < PrevStudio.bikeCount) {
      selectAll('.bike-circle')
        .filter((_, i) => i >= Studio.bikeCount)
        .transition(transition('c').duration(600))
        .attr('opacity', 0);

      selectAll('.bike-text')
        .filter((_, i) => i >= Studio.bikeCount)
        .transition(transition('cc').duration(600))
        .attr('opacity', 0);
    }

    selectAll('.bike-circle')
      .transition(transition('d').duration(600))
      .attr('cx', (_, i) => Studio.getX(i + 1))
      .attr('cy', (_, i) => Studio.getY(i + 1))
      .on('end', () => this.setState({ Studio }));

    selectAll('.bike-text')
      .transition(transition('dd').duration(600))
      .attr('x', (_, i) => Studio.getX(i + 1))
      .attr('y', (_, i) => Studio.getY(i + 1));

    if (Studio.hasPillar) {
      selectAll('.pillar')
        .transition(transition('f').duration(0))
        .attr('x', Studio.getPillarX())
        .attr('y', Studio.getPillarY(pillarSize));

      selectAll('.pillar')
        .transition(transition('ff').duration(600))
        .attr('opacity', 1);
    } else {
      selectAll('.pillar')
        .transition(transition('fff').duration(600))
        .attr('opacity', 0);
    }
  }

  hideStudio = () => {
    const x = Studio.hasPillar ? Studio.getPillarX() : Studio.hasStudio.getX(Math.floor(Studio.bikeCount) / 2);
    const y = Studio.hasPillar ? Studio.getPillarY(pillarSize) : Studio.hasStudio.getY(Math.floor(Studio.bikeCount) / 2);

    selectAll('.bike-circle')
      .transition(transition('d').duration(600))
      .attr('cx', x)
      .attr('cy', y)
      .attr('opacity', 0);

    selectAll('.bike-text')
      .transition(transition('dd').duration(600))
      .attr('x', x)
      .attr('y', y)
        .attr('opacity', 0);

    selectAll('.pillar')
      .transition(transition('dd').duration(600))
      .attr('x', x)
      .attr('y', y)
      .attr('opacity', 0)
      .on('end', () => this.setState({ Studio: null }));
  }

  render() {
    const { Studio } = this.state;
    const pillarX = Studio ? Studio.getPillarX() : Studio1.getPillarX();
    const pillarY = Studio? Studio.getPillarY(pillarSize) : Studio1.getPillarY(pillarSize);
    const pillarOpacity = Studio && Studio.hasPillar ? 1 : 0;
    return (
      <g>
        {Array(Math.max(Studio1.bikeCount, Studio2.bikeCount)).fill(1).map((_, bikeIdx) => {
          const bikeNumber = bikeIdx + 1;
          const x = Studio ? Studio.getX(bikeNumber) : Studio1.getPillarX();
          const y = Studio ? Studio.getY(bikeNumber) : Studio1.getPillarY(pillarSize);
          const bikeOpacity = Studio && bikeNumber <= Studio.bikeCount ? 1 : 0;
          return (
            <g>
              <circle
                className="bike-circle"
                cx={x}
                cy={y}
                r={bikeRadius}
                fill="rgba(45,45,45,.9)"
                opacity={bikeOpacity}
              />
              <text
                className="bike-text"
                x={x}
                y={y}
                fill="white"
                opacity={bikeOpacity}
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
        <g>
          <rect
            className="pillar"
            width={pillarSize}
            height={pillarSize}
            opacity={pillarOpacity}
            x={pillarX}
            y={pillarY}
            fill="#ccc"
          />
          <text
            className="pillar"
            x={pillarX}
            y={pillarY}
            opacity={pillarOpacity}
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
  }
}

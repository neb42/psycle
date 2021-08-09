import React from 'react';
import { select, selectAll } from 'd3-selection';
import { transition } from 'd3-transition';

import * as Studio1 from './studio1';
import * as Studio2 from './studio2';

const bikeRadius = 18;
const pillarSize = 28;

type State = any;

export default class Studio extends React.Component<{}, State> {
  props: any;
  setState: any;
  state = {
    Studio: null,
  };

  componentDidUpdate(prevProps: {}) {
    const { studio, showFavouriteBikes } = this.props;
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'studio' does not exist on type '{}'.
    const { studio: prevStudio, showFavouriteBikes: prevShowFavouriteBikes } = prevProps;

    if (studio !== prevStudio) {
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

    if (showFavouriteBikes !== prevShowFavouriteBikes) {
      if (showFavouriteBikes && !prevShowFavouriteBikes) {
        this.showFavouriteBikes();
      } else if (!showFavouriteBikes && prevShowFavouriteBikes) {
        this.hideFavouriteBikes();
      }
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

  transition = (Studio: any, PrevStudio: any) => {
    if (Studio.bikeCount > PrevStudio.bikeCount) {
      select('.show-circle')
        .selectAll('.bike-circle')
        .transition(transition('a').duration(600))
        .attr('opacity', 1);

      selectAll('.bike-text')
        .transition(transition('aa').duration(600))
        .attr('opacity', 1);
    }

    if (Studio.bikeCount < PrevStudio.bikeCount) {
      select('.show-circle')
        .selectAll('.bike-circle')
        .filter((_: any, i: any) => i >= Studio.bikeCount)
        .transition(transition('c').duration(600))
        .attr('opacity', 0);

      selectAll('.bike-text')
        .filter((_: any, i: any) => i >= Studio.bikeCount)
        .transition(transition('cc').duration(600))
        .attr('opacity', 0);

      select('.show-circle')
        .selectAll('.bike-circle')
        .filter((_: any, i: any) => i < Studio.bikeCount)
        .transition(transition('c').duration(600))
        .attr('opacity', 1);

      selectAll('.bike-text')
        .filter((_: any, i: any) => i < Studio.bikeCount)
        .transition(transition('cc').duration(600))
        .attr('opacity', 1);
    }

    selectAll('.bike-circle')
      .transition(transition('d').duration(600))
      .attr('cx', (_: any, i: any) => Studio.getX(i + 1))
      .attr('cy', (_: any, i: any) => Studio.getY(i + 1))
      .on('end', () => this.setState({ Studio }));

    selectAll('.bike-text')
      .transition(transition('dd').duration(600))
      .attr('x', (_: any, i: any) => Studio.getX(i + 1))
      .attr('y', (_: any, i: any) => Studio.getY(i + 1));

    if (Studio.hasPillar) {
      selectAll('.pillar-rect')
        .transition(transition('f').duration(0))
        .attr('x', Studio.getPillarX())
        .attr('y', Studio.getPillarY(pillarSize));

      selectAll('.pillar-rect, .pillar-text')
        .transition(transition('ff').duration(600))
        .attr('opacity', 1);

      selectAll('.pillar-text')
        .transition(transition('fff').duration(0))
        .attr('x', Studio.getPillarX() + 15)
        .attr('y', Studio.getPillarY(pillarSize) + 15);
    } else {
      selectAll('.pillar-rect, .pillar-text')
        .transition(transition('ffff').duration(600))
        .attr('opacity', 0);
    }
  };

  hideStudio = () => {
    const x = (Studio as any).hasPillar
    ? (Studio as any).getPillarX()
    : Studio1.getX(Math.floor(Studio1.bikeCount / 2));
    const y = (Studio as any).hasPillar
    ? (Studio as any).getPillarY(pillarSize)
    : Studio1.getY(Math.floor(Studio1.bikeCount / 2));

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

    selectAll('.pillar-rect, .pillar-text')
      .transition(transition('dd').duration(600))
      .attr('x', x)
      .attr('y', y)
      .attr('opacity', 0)
      .on('end', () => this.setState({ Studio: null }));
  };

  showFavouriteBikes = () => {
    const { favouriteBikes } = this.props;
    select('.show-circle')
      .selectAll('.bike-circle')
      .filter((_: any, i: any) => favouriteBikes.includes(i + 1))
      .transition(transition('c').duration(600))
      .attr('fill', '#a71b52');
  };

  hideFavouriteBikes = () => {
    select('.show-circle')
      .selectAll('.bike-circle')
      .transition(transition('c').duration(600))
      .attr('fill', 'rgba(45,45,45,.9)');
  };

  render() {
    const { transform, showCircle, showText } = this.props;
    const { Studio } = this.state;
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    const pillarX = Studio ? Studio.getPillarX() : Studio1.getPillarX();
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    const pillarY = Studio ? Studio.getPillarY(pillarSize) : Studio1.getPillarY(pillarSize);
    // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
    const pillarOpacity = Studio && Studio.hasPillar ? 1 : 0;
    return (
      <g className={showCircle ? 'show-circle' : 'show-text'} transform={transform}>
        {Array(Math.max(Studio1.bikeCount, Studio2.bikeCount))
          .fill(1)
          .map((_, bikeIdx) => {
            const bikeNumber = bikeIdx + 1;
            // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
            const x = Studio ? Studio.getX(bikeNumber) : Studio1.getPillarX();
            // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
            const y = Studio ? Studio.getY(bikeNumber) : Studio1.getPillarY(pillarSize);
            // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
            const bikeOpacity = Studio && bikeNumber <= Studio.bikeCount ? 1 : 0;
            return (
              <g>
                <circle
                  className="bike-circle"
                  cx={x}
                  cy={y}
                  r={bikeRadius}
                  fill="rgba(45,45,45,.9)"
                  opacity={showCircle ? bikeOpacity : 0}
                />
                {showText && (
                  <text
                    className="bike-text"
                    x={x}
                    y={y}
                    fill="white"
                    opacity={bikeOpacity}
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    style={{
                      fontSize: '15px',
                      fontFamily: 'soin_sans_neueroman,sans-serif',
                    }}
                  >
                    {bikeNumber}
                  </text>
                )}
              </g>
            );
          })}
        {showCircle && (
          <g>
            <rect
              className="pillar-rect"
              width={pillarSize}
              height={pillarSize}
              opacity={pillarOpacity}
              x={pillarX}
              y={pillarY}
              fill="#ccc"
            />
            <text
              className="pillar-text"
              x={pillarX + 15}
              y={pillarY + 15}
              opacity={pillarOpacity}
              fill="white"
              textAnchor="middle"
              alignmentBaseline="middle"
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

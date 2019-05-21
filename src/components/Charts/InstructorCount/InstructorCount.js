// @flow

import React from 'react';
import { Bar } from '@vx/shape';
import { Group } from '@vx/group';
import { LinearGradient } from '@vx/gradient';
import { scaleBand, scaleLinear } from '@vx/scale';
import { AxisBottom } from '@vx/axis';
import { withTooltip, Tooltip } from '@vx/tooltip';
import * as d3Array from 'd3-array';
import OutsideClickHandler from 'react-outside-click-handler';

type Props = {

};

type State = {

};

export default class InstructorCount extends React.Component<Props, State> {
  props: Props;
  state: State = {
    tooltip: {
      top: 0,
      left: 0,
      show: false,
      data: '',
    },
  };

  render() {
    const { width, height, bookingHistory } = this.props;
    const { tooltip } = this.state;

    const bookingHistoryByInstructor = [];
    d3Array.group(bookingHistory, d => d.instructor).forEach((values, key)=> {
      bookingHistoryByInstructor.push({
        key,
        values,
      });
    });

    // accessors
    const x = d => d.key;
    const y = d => d.values.length;

    // bounds
    const xMax = width;
    const yMax = height - 50;

    // scales
    const xScale = scaleBand({
      rangeRound: [0, xMax],
      domain: bookingHistoryByInstructor.map(x),
      padding: 0.4
    });
    const yScale = scaleLinear({
      rangeRound: [yMax, 0],
      domain: [0, Math.max(...bookingHistoryByInstructor.map(y))]
    });

    return (
      <React.Fragment>
        <svg width={width} height={height}>
          <LinearGradient id="gradient" from="#581929" to="#150e15" />
          <rect width={width} height={height} fill={"url(#gradient)"} rx={14} />
          <Group>
            {bookingHistoryByInstructor.map((d, i) => {
              const instructor = x(d);
              const barWidth = xScale.bandwidth();
              const barHeight = yMax - yScale(y(d));
              const barX = xScale(instructor);
              const barY = yMax - barHeight;
              return (
                <Bar
                  key={`bar-${instructor}`}
                  x={barX}
                  y={barY}
                  width={barWidth}
                  height={barHeight}
                  fill="rgba(23, 233, 217, .5)"
                  onClick={event => {
                    const top = event.clientY;
                    const left = event.clientX;
                    this.setState({
                      tooltip: {
                        top,
                        left,
                        show: true,
                        data: instructor,
                      },
                    });
                  }}
                />
              );
            })}
          </Group>
          <AxisBottom
            top={yMax}
            tickFormat={i => i}
            scale={xScale}
            stroke={'white'}
            tickStroke={'white'}
            hideAxisLine={true}
            tickLabelProps={(value, index) => ({
              fill: 'white',
              fontFamily: 'soin_sans_neueroman,sans-serif',
              fontSize: 11,
              textAnchor: 'middle'
            })}
          />
        </svg>
        {tooltip.show && (
          <OutsideClickHandler onOutsideClick={() => this.setState({ tooltip: { show: false }})} >
            <Tooltip key={tooltip.data} top={tooltip.top} left={tooltip.left} style={{ height: 500, width: 400 }} >
              <iframe style={{ height: '100%', width: '100%' }} src={`https://psyclelondon.com/instructor/${tooltip.data}`} />
            </Tooltip>
          </OutsideClickHandler>
        )}
      </React.Fragment>
    );
  }
};

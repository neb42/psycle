import React from 'react';
import { selectAll, select } from 'd3-selection';
import { transition } from 'd3-transition';
import styled from 'styled-components';
import moment from 'moment';

import { BookingHistoryContext } from '../../../context/BookingHistory';

const R = styled.rect`
  & + text {
    opacity: 0;
  }
  &:hover {
    & + text {
      opacity: 1;
    }
  }
`;

const range = (start, end, step = 1) => {
  const len = Math.floor((end - start) / step) + 1;
  return Array(len)
    .fill()
    .map((_, idx) => start + idx * step);
};

export default class WeekScatter extends React.PureComponent {
  state = {
    visible: this.props.activeIndex === 3,
  };

  static contextType = BookingHistoryContext;

  componentDidMount() {
    const {
      weeklyLollipop: { weeklyCount },
    } = this.context;
    selectAll('.week-scatter-point').data(weeklyCount);
    selectAll('.week-line').data(weeklyCount);
    selectAll('.y-axis-rect').data(this.rectData);
  }

  componentDidUpdate(prevProps) {
    const { activeIndex: prevIdx } = prevProps;
    const { activeIndex } = this.props;

    if (prevIdx !== activeIndex) {
      this.handleActiveIndexChange(activeIndex);
    }
  }

  handleActiveIndexChange = activeIndex => {
    if (activeIndex === 2) {
      this.show();
    } else if (activeIndex === 1 || activeIndex === 3) {
      this.hide();
    }
  };

  show = () => {
    const {
      weeklyLollipop: { yScale, xScale },
    } = this.context;

    selectAll('.y-axis-rect')
      .transition(transition().duration(600 / yScale.domain()[0]))
      .delay((d, i) => {
        return ((yScale.domain()[0] - 1 - i) / (yScale.domain()[0] - 1)) * 600;
      })
      .attr('y', (d, i) => {
        return i * this.rectHeight + 50;
      })
      .attr('height', this.rectHeight);

    selectAll('.week-line')
      .transition(transition().duration(600))
      .attr('y2', d => yScale(d.value) + this.yOffset);

    selectAll('.week-scatter-point')
      .transition(transition('dsf').duration(600))
      .attr('cx', d => xScale(this.timeInteger(d.key)))
      .attr('cy', d => yScale(d.value) + this.yOffset)
      .attr('fill-opacity', 1)
      .on('end', () => this.setState({ visible: true }));
  };

  hide = () => {
    const {
      weeklyLollipop: { yScale },
    } = this.context;

    selectAll('.y-axis-rect')
      .transition(transition().duration(600 / yScale.domain()[0]))
      .delay((d, i) => {
        return (i / (yScale.domain()[0] - 1)) * 600;
      })
      .attr('y', (d, i) => {
        return (i + 1) * this.rectHeight + 50;
      })
      .attr('height', 0);

    selectAll('.week-line')
      .transition(transition().duration(600))
      .attr('y2', yScale(0));

    selectAll('.week-scatter-point')
      .transition(transition().duration(600))
      .attr('cy', yScale(0))
      .attr('fill-opacity', 0)
      .on('end', () => this.setState({ visible: false }));
  };

  get yOffset() {
    return this.rectHeight / 2;
  }

  get rectHeight() {
    const { height } = this.props;
    const {
      weeklyLollipop: { yScale },
    } = this.context;
    return (height - 90) / (yScale.domain()[0] - yScale.domain()[1]);
  }

  get rectData() {
    const {
      weeklyLollipop: { yScale },
    } = this.context;
    return range(yScale.domain()[1], yScale.domain()[0])
      .slice(1)
      .reverse();
  }

  timeInteger = key => {
    const [weekday, hour, minute] = key.split('-');
    const ti = (Number(weekday) - 1) * 1440 + Number(hour) * 60 + Number(minute);
    return ti;
  };

  render() {
    const { height, width } = this.props;
    const { visible } = this.state;
    const {
      weeklyLollipop: { weeklyCount, xScale, yScale },
    } = this.context;

    return (
      <React.Fragment>
        <g>
          {this.rectData.map((v, i) => (
            <React.Fragment>
              <R
                className="y-axis-rect"
                height={visible ? this.rectHeight : 0}
                width={width}
                y={visible ? i * this.rectHeight + 50 : (i + 1) * this.rectHeight + 50}
                x={0}
                opacity={
                  (yScale.domain()[0] > 20 ? 0.2 : 0.3) *
                  (v / (yScale.domain()[0] - yScale.domain()[1]))
                }
                fill="#fff"
              />
              <text
                className={`y-axis-text-${v}`}
                x={20}
                y={i * this.rectHeight + 50 + this.yOffset + 8}
                fill="white"
                style={{
                  fontSize: 16,
                  fontFamily: 'soin_sans_neueroman,sans-serif',
                  fillOpacity: 0.6,
                }}
              >
                {v}
              </text>
            </React.Fragment>
          ))}
        </g>
        {weeklyCount.map((datum, i) => (
          <React.Fragment>
            <line
              className="week-line"
              x1={xScale(this.timeInteger(datum.key))}
              x2={xScale(this.timeInteger(datum.key))}
              y1={yScale(0)}
              y2={
                visible
                  ? yScale(datum.value) + this.yOffset + Math.min(5, this.rectHeight)
                  : yScale(0)
              }
              stroke="#fff"
            />
            <circle
              className={`week-scatter-point circle-${datum.key}`}
              cx={xScale(this.timeInteger(datum.key))}
              cy={visible ? yScale(datum.value) + this.yOffset : height}
              r={Math.min(5, this.rectHeight)}
              fillOpacity={visible ? 1 : 0}
              onMouseEnter={() => {
                const w = 100;
                const h = 60;
                const x = this.timeInteger(datum.key) > 3 * 1440 ? 50 : 400;
                const y = yScale(datum.value) - h / 2;

                const [weekday, hour, minute] = datum.key.split('-');

                select('.tooltip-rect')
                  .transition(transition('a').duration(300))
                  .attr('opacity', 0.6);
                select('.tooltip-rect')
                  .transition(transition().duration(0))
                  .attr('x', x)
                  .attr('y', y)
                  .attr('width', w)
                  .attr('height', h);
                selectAll('.tooltip-weekday, .tooltip-time')
                  .transition(transition('aa').duration(300))
                  .style('fill-opacity', 1);
                select('.tooltip-weekday')
                  .transition(transition().duration(0))
                  .attr('x', x + w / 2)
                  .attr('y', y + 20)
                  .text(
                    moment()
                      .day(Number(weekday))
                      .format('dddd'),
                  );
                select('.tooltip-time')
                  .transition(transition().duration(0))
                  .attr('x', x + w / 2)
                  .attr('y', y + h - 20)
                  .text(
                    moment()
                      .hour(Number(hour))
                      .minute(Number(minute))
                      .format('h:mma'),
                  );

                select(`.y-axis-text-${datum.value}`)
                  .transition(transition().duration(300))
                  .style('fill-opacity', 1)
                  .style('opacity', 1);
                selectAll('.week-line, .week-scatter-point')
                  .filter(d => d.key !== datum.key)
                  .transition(transition().duration(300))
                  .attr('opacity', 0.3);

                selectAll('.y-axis-rect')
                  .transition(transition().duration(300))
                  .attr('opacity', d => (d === datum.value ? 0.3 : 0.05));
              }}
              onMouseLeave={() => {
                select('.tooltip-rect')
                  .transition(transition('a').duration(300))
                  .attr('opacity', 0);
                select('.tooltip-rect')
                  .transition(
                    transition()
                      .duration(0)
                      .delay(300),
                  )
                  .attr('x', 0)
                  .attr('y', 0)
                  .attr('width', 0)
                  .attr('height', 0);
                selectAll('.tooltip-weekday, .tooltip-time')
                  .transition(transition('aa').duration(300))
                  .style('fill-opacity', 0);
                select('.tooltip-weekday')
                  .transition(
                    transition()
                      .duration(0)
                      .delay(300),
                  )
                  .attr('x', 0)
                  .attr('y', 0)
                  .text('');
                select('.tooltip-time')
                  .transition(
                    transition()
                      .duration(0)
                      .delay(300),
                  )
                  .attr('x', 0)
                  .attr('y', 0)
                  .text('');

                select(`.y-axis-text-${datum.value}`)
                  .transition(transition().duration(300))
                  .attr('fill-opacity', 0.6)
                  .style('opacity', null);
                selectAll('.week-line, .week-scatter-point')
                  .filter(d => d.key !== datum.key)
                  .transition(transition('aa').duration(300))
                  .attr('opacity', 1);
                selectAll('.y-axis-rect')
                  .transition(transition().duration(300))
                  .attr(
                    'opacity',
                    d =>
                      (yScale.domain()[0] > 20 ? 0.2 : 0.3) *
                      (d / (yScale.domain()[0] - yScale.domain()[1])),
                  );
              }}
              fill="#fff"
            />
          </React.Fragment>
        ))}
        <g>
          <rect className="tooltip tooltip-rect" fill="#1a1a1a" opacity={0} />
          <text
            className="tooltip tooltip-weekday"
            textAnchor="middle"
            alignmentBaseline="central"
            fill="#fff"
            style={{
              fillOpacity: 0,
              fontFamily: 'soin_sans_neueroman,sans-serif',
            }}
          />
          <text
            className="tooltip tooltip-time"
            textAnchor="middle"
            alignmentBaseline="central"
            fill="#fff"
            style={{
              fillOpacity: 0,
              fontFamily: 'soin_sans_neueroman,sans-serif',
            }}
          />
        </g>
      </React.Fragment>
    );
  }
}

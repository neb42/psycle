import React from 'react';
import { selectAll } from 'd3-selection';
import { transition } from 'd3-transition';
import styled from 'styled-components';

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
  return Array(len).fill().map((_, idx) => start + (idx * step));
}

export default class WeekScatter extends React.PureComponent {
  state = {
    visible: this.props.activeIndex === 3,
  };

  componentDidMount() {
    selectAll('.week-scatter-point').data(this.props.weeklyCount);
    selectAll('.week-line').data(this.props.weeklyCount);
  }

  componentDidUpdate(prevProps) {
    const { activeIndex: prevIdx } = prevProps;
    const { activeIndex } = this.props;

    if (prevIdx !== activeIndex) {
      this.handleActiveIndexChange(activeIndex);
    }
  }

  handleActiveIndexChange = (activeIndex) => {
    if (activeIndex === 2) {
      this.show();
    } else if (activeIndex === 1 || activeIndex === 3) {
      this.hide();
    }
  }

  show = () => {
    const  {
      yScatterScale,
      xScatterScale,
    } = this.props;

    selectAll('.week-line')
      .transition(transition().duration(600))
      .attr('y2', d => yScatterScale(d.value) + this.yOffset);

    selectAll('.week-scatter-point')
      .transition(transition('dsf').duration(600))
      .attr('cx', d => xScatterScale(this.timeInteger(d.key)))
      .attr('cy', d => yScatterScale(d.value) + this.yOffset)
      .attr('fill-opacity', 1)
      .on('end', () => this.setState({ visible: true }));
  }

  hide = () => {
    const { yScatterScale } = this.props;

    selectAll('.week-line')
      .transition(transition().duration(600))
      .attr('y2', yScatterScale(0));

    selectAll('.week-scatter-point')
      .transition(transition().duration(600))
      .attr('cy', yScatterScale(0))
      .attr('fill-opacity', 0)
      .on('end', () => this.setState({ visible: false }));
  }

  get yOffset() {
    return this.rectHeight / 2;
  }

  get rectHeight() {
    const { yScatterScale, height } = this.props
    return (height - 90) / (yScatterScale.domain()[0] - yScatterScale.domain()[1]);
  }

  timeInteger = key => {
    const [weekday, hour, minute] = key.split('-');
    const ti =  ((Number(weekday) - 1) * 1440) + (Number(hour) * 60) + Number(minute);
    return ti;
  }

  render() {
    const  {
      yScatterScale,
      xScatterScale,
      weeklyCount,
      height,
      width,
    } = this.props;
    const { visible } = this.state;

    return (
      <React.Fragment>
        {weeklyCount.map((datum, i) => (
          <React.Fragment>
            <line
              className="week-line"
              x1={xScatterScale(this.timeInteger(datum.key))}
              x2={xScatterScale(this.timeInteger(datum.key))}
              y1={yScatterScale(0)}
              y2={visible ? yScatterScale(datum.value) + this.yOffset : yScatterScale(0)}
              stroke="#fff"
            />
            <circle
              className="week-scatter-point"
              cx={xScatterScale(this.timeInteger(datum.key))}
              cy={visible ? yScatterScale(datum.value) + this.yOffset : height}
              r={Math.min(5, this.rectHeight)}
              fillOpacity={visible ? 1 : 0}
              fill={'#fff'}
            />
          </React.Fragment>
        ))}
        <g>
          {range(yScatterScale.domain()[1], yScatterScale.domain()[0]).slice(1).reverse().map((v, i) => (
            <React.Fragment>
              <R
                height={this.rectHeight}
                width={width} 
                y={(i * this.rectHeight) + 50}
                x={0}
                opacity={visible ? (yScatterScale.domain()[0] > 20 ? 0.2 : 0.3) * (v / (yScatterScale.domain()[0] - yScatterScale.domain()[1])) : 0}
                fill="#fff"
              />
              <text
                x={20}
                y={(i * this.rectHeight) + 50 + this.yOffset + 8}
                fill="white"
                style={{
                  fontSize: 16,
                  fontFamily: 'soin_sans_neueroman,sans-serif',
                  fillOpacity: 0.8,
                }}
              >
                {v}
              </text>
            </React.Fragment>
          ))}
        </g>
      </React.Fragment>
    );
  }
}

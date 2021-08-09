import React from 'react';
import styled from 'styled-components';
import { select, selectAll } from 'd3-selection';
import { axisBottom, axisLeft } from 'd3-axis';
import { timeFormat } from 'd3-time-format';
import { timeYear } from 'd3-time';

import { DataContext } from '../../../context/DataContext';

const StyledAxis = styled.g`
  & line {
    stroke: #fff;
    stroke-width: 2px;
  }

  & path {
    stroke: #fff;
    stroke-width: 3px;
  }

  & text {
    fill: #fff;
    font-size: 14px;
  }
`;

type Props = {
  activeIndex: number;
  height: number;
  width: number;
  barIndex: number;
  scatterIndex: number;
  movingAverageIndex: number;
};

type State = {
  opacityX: number;
  opacityY: number;
};

export default class Axis extends React.PureComponent<Props, State> {
  state: State = {
    opacityX: 0,
    opacityY: 0,
  };

  static contextType = DataContext;

  context: any;

  props: any;

  setState: any;

  componentDidMount() {
    const { activeIndex } = this.props;
    this.handleActiveIndexChange(activeIndex);
  }

  componentDidUpdate(prevProps: Props) {
    const { activeIndex: prevIdx } = prevProps;
    const { activeIndex } = this.props;

    if (prevIdx !== activeIndex) {
      this.handleActiveIndexChange(activeIndex);
    }
  }

  handleActiveIndexChange = (activeIndex: any) => {
    const { barIndex, scatterIndex, movingAverageIndex } = this.props;
    if (activeIndex === scatterIndex) {
      this.renderScatterAxis();
    } else if (activeIndex === barIndex) {
      this.renderBarAxis();
    } else if (activeIndex === movingAverageIndex) {
      this.renderMovingAverageAxis();
    } else {
      this.hide();
    }
  };

  renderMovingAverageAxis = () => {
    const {
      movingAverage: { xScale, yScale },
    } = this.context;
    const axisX = axisBottom(xScale).tickFormat((d: any) => {
      if (timeYear(d) < d) {
        return timeFormat('%b')(d);
      }
      return timeFormat('%Y')(d);
    });
    const axisY = axisLeft(yScale).tickFormat(function(e: any) {
      if (Math.floor(e) !== e) {
        return;
      }
      return e;
    });

    select('.axis.x')
      .append('g')
      .call(axisX)
      .transition()
      .duration(600)
      .style('opacity', 0.7)
      .on('end', () => this.setState({ opacityX: 0.7 }));

    select('.axis.y')
      .append('g')
      .call(axisY)
      .transition()
      .duration(600)
      .style('opacity', 0.7)
      .on('end', () => this.setState({ opacityY: 0.7 }));
  };

  renderScatterAxis = () => {
    const {
      weeklyLollipop: { xScale },
    } = this.context;
    const axisX = axisBottom(xScale)
      .tickValues([0, 1440, 2 * 1440, 3 * 1440, 4 * 1440, 5 * 1440, 6 * 1440])
      .tickFormat((e: any) => {
        switch (e) {
          case 0:
            return 'Mon';
          case 1440:
            return 'Tues';
          case 2 * 1440:
            return 'Wed';
          case 3 * 1440:
            return 'Thur';
          case 4 * 1440:
            return 'Fri';
          case 5 * 1440:
            return 'Sat';
          case 6 * 1440:
            return 'Sun';
          default:
            return '';
        }
      });

    select('.axis.x')
      .append('g')
      .call(axisX)
      .transition()
      .duration(600)
      .style('opacity', 1)
      .on('end', () => this.setState({ opacityX: 1 }));

    selectAll('.axis.y')
      .transition()
      .duration(600)
      .style('opacity', 0)
      .on('end', () => this.setState({ opacityY: 0 }));
  };

  renderBarAxis = () => {
    const {
      instructorBars: { xScale },
    } = this.context;

    const axis = axisBottom(xScale).tickFormat(function(e: any) {
      if (Math.floor(e) !== e) {
        return;
      }
      return e;
    });

    select('.axis.x')
      .append('g')
      .call(axis)
      .transition()
      .duration(600)
      .style('opacity', 1)
      .on('end', () => this.setState({ opacityX: 1 }));

    selectAll('.axis.y')
      .transition()
      .duration(600)
      .style('opacity', 0)
      .on('end', () => this.setState({ opacityY: 0 }));
  };

  hide = () => {
    selectAll('.axis')
      .transition()
      .duration(600)
      .style('opacity', 0)
      .on('end', () => this.setState({ opacityX: 0, opacityY: 0 }));
  };

  render() {
    const { height } = this.props;
    const { opacityX, opacityY } = this.state;
    return (
      <>
        <StyledAxis
          className="axis x"
          transform={`translate(0, ${height})`}
          style={{ opacity: opacityX }}
        />
        <StyledAxis className="axis y" style={{ opacity: opacityY }} />
      </>
    );
  }
}

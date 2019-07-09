import React from 'react';
import styled from 'styled-components';
import { select, selectAll } from 'd3-selection';
import { axisBottom, axisLeft } from 'd3-axis';
import { transition } from 'd3-transition';
import { format } from 'd3-format';

const StyledAxis = styled.g`
  & line {
    stroke: #fff;
  }

  & path {
    stroke: #fff;
  }
 
  & text {
    fill: #fff;
  } 
`;

export default class Axis extends React.PureComponent {
  state = {
    opacityX: 0,
    opacityY: 0,
  };

  componentDidMount() {
    const { activeIndex } = this.props;
    this.handleActiveIndexChange(activeIndex);
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
      this.renderScatterAxis();
    } else if (activeIndex === 3) {
      this.renderBarAxis();
    } else {
      this.hide();
    }
  }

  renderScatterAxis = () => {
    const { xScatterScale, yScatterScale } = this.props;
    const axisX = axisBottom()
      .tickValues([
        0,
        1440,
        2 * 1440,
        3 * 1440,
        4 * 1440,
        5 * 1440,
        6 * 1440,
      ])
      .tickFormat(e => {
        switch (e) {
          case 0:
            return 'Monday';
          case 1440:
            return 'Tuesday';
          case 2 * 1440:
            return 'Wednesday';
          case 3 * 1440:
            return 'Thursday';
          case 4 * 1440:
            return 'Friday';
          case 5 * 1440:
            return 'Saturday';
          case 6 * 1440:
            return 'Sunday';
          default:
            return '';
        }
      })
      .scale(xScatterScale);

    select('.axis.x')
      .call(axisX)
      .transition(
        transition()
          .duration(500)
      )
      .style('opacity', 1)
      .on('end', () => this.setState({ opacityX: 1 }));
  }

  renderBarAxis = () => {
    const { xBarScale } = this.props;
    const axis = axisBottom()
      .scale(xBarScale)
      .tickFormat(function(e){
        if(Math.floor(e) !== e) {
          return;
        }
        return e;
      });
    select('.axis.x')
      .call(axis)
      .transition(
        transition()
          .duration(500)
      )
      .style('opacity', 1)
      .on('end', () => this.setState({ opacityX: 1 }));
  }

  hide = () => {
    selectAll('.axis')
      .transition(
        transition()
          .duration(500)
      )
      .style('opacity', 0)
      .on('end', () => this.setState({ opacityX: 0, opacityY: 0 }));
  }

  render() {
    const { width, height } = this.props;
    const { opacityX, opacityY } = this.state;
    return (
      <React.Fragment>
        <StyledAxis
          className="axis x"
          transform={`translate(0, ${height})`}
          style={{ opacity: opacityX }}
        />
        {/* <StyledAxis
          className="axis y"
          transform={`translate(${width}, 0)`}
          style={{ opacity: opacityY }}
        /> */}
      </React.Fragment>
    );
  }
}

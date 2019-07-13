import React from 'react';

import { BookingHistoryContext } from '../../context/BookingHistory';

import Login from './Login';
import Axis from './Axis';
import ClassCount from './ClassCount';
import WeekScatter from './WeekScatter';
import InstructorBars from './InstructorBars';
import FavouriteInstructor from './FavouriteInstructor';
import Studio from './Studio';

import * as Styles from './Visualisations.styles';

export default class Visualisations extends React.Component {
  static contextType = BookingHistoryContext;

  get svgWidth() {
    const { width, margin: { left, right }} = this.props;
    return width + left + right;
  }

  get svgHeight() {
    const { height, margin: { top, bottom }} = this.props;
    return height + top + bottom;
  }

  get groupTransform() {
    const { margin: { left, top }} = this.props;
    return `translate(${left}, ${top})`;
  }

  render() {
    const { width, height, activeIndex, progress } = this.props;
    const { loaded } = this.context;

    return (
      <Styles.Visualisations id="vis">
        <svg width={this.svgWidth} height={this.svgHeight}>
          <g transform={this.groupTransform}>
            <foreignObject  width={this.svgWidth} height={this.svgHeight}>
              <Login activeIndex={activeIndex} />
            </foreignObject>
            {loaded && (
              <React.Fragment>
                <Axis
                  activeIndex={activeIndex}
                  height={height}
                  width={width}
                />
                <ClassCount
                  activeIndex={activeIndex}
                  width={this.svgWidth}
                  height={this.svgHeight}
                />
                <Styles.VisGroup index={2} activeIndex={activeIndex}> 
                  <WeekScatter
                    activeIndex={activeIndex}
                    height={this.svgHeight}
                    width={this.svgWidth}
                  />
                </Styles.VisGroup>
                <Styles.VisGroup index={3} activeIndex={activeIndex}> 
                  <InstructorBars
                    activeIndex={activeIndex}
                    instructorCounts={this.instructorCounts}
                    yBarScale={this.yBarScale}
                    xBarScale={this.xBarScale}
                    barColorScale={this.barColorScale}
                    width={this.svgWidth}
                  />
                </Styles.VisGroup>
                <Styles.VisGroup index={4} activeIndex={activeIndex}> 
                  <FavouriteInstructor
                    activeIndex={activeIndex}
                    height={this.svgHeight}
                    width={this.svgWidth}
                  />
                </Styles.VisGroup>
                <Styles.VisGroup index={5} activeIndex={activeIndex}> 
                  <Studio
                    activeIndex={activeIndex}
                    width={this.svgWidth}
                    height={this.svgHeight}
                  />
                </Styles.VisGroup>
              </React.Fragment>
            )}
          </g>
        </svg>
      </Styles.Visualisations>
    );
  }
}

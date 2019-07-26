import React from 'react';

import Axis from './Axis';
import ClassCount from './ClassCount';
import Calendar from './Calendar';
import WeekScatter from './WeekScatter';
import InstructorBars from './InstructorBars';
import FavouriteInstructor from './FavouriteInstructor';
import Studio from './Studio';
import MovingAverage from './MovingAverage';

import * as Styles from './Visualisations.styles';

const CALENDAR_START_INDEX = 0;
const MOVING_AVERAGE_START_INDEX = 1;
const WEEKLY_LOLLIPOP_START_INDEX = 2;
const INSTRUCTOR_BARS_START_INDEX = 3;
const FAVOURITE_INSTRUCTOR_START_INDEX = 4;
const STUDIO_START_INDEX = 5;

export default class MortimerStreetRideVis extends React.Component {
  render() {
    const { width, height, svgWidth, svgHeight, activeIndex, progress } = this.props;
    return (
      <React.Fragment>
        <Axis
          activeIndex={activeIndex}
          height={height}
          width={width}
          barIndex={INSTRUCTOR_BARS_START_INDEX}
          scatterIndex={WEEKLY_LOLLIPOP_START_INDEX}
          movingAverageIndex={MOVING_AVERAGE_START_INDEX}
        />
        <Styles.VisGroup startIndex={CALENDAR_START_INDEX} activeIndex={activeIndex}>
          <Calendar
            startIndex={CALENDAR_START_INDEX}
            activeIndex={activeIndex}
            width={svgWidth}
            height={svgHeight}
          />
        </Styles.VisGroup>
        <Styles.VisGroup startIndex={MOVING_AVERAGE_START_INDEX} activeIndex={activeIndex}>
          <MovingAverage
            startIndex={MOVING_AVERAGE_START_INDEX}
            activeIndex={activeIndex}
            height={svgHeight}
            width={svgWidth}
          />
        </Styles.VisGroup>
        <Styles.VisGroup startIndex={WEEKLY_LOLLIPOP_START_INDEX} activeIndex={activeIndex}>
          <WeekScatter
            startIndex={WEEKLY_LOLLIPOP_START_INDEX}
            activeIndex={activeIndex}
            height={svgHeight}
            width={svgWidth}
          />
        </Styles.VisGroup>
        <Styles.VisGroup startIndex={INSTRUCTOR_BARS_START_INDEX} activeIndex={activeIndex}>
          <InstructorBars
            startIndex={INSTRUCTOR_BARS_START_INDEX}
            activeIndex={activeIndex}
            width={svgWidth}
          />
        </Styles.VisGroup>
        <Styles.VisGroup startIndex={FAVOURITE_INSTRUCTOR_START_INDEX} activeIndex={activeIndex}>
          <FavouriteInstructor
            startIndex={FAVOURITE_INSTRUCTOR_START_INDEX}
            activeIndex={activeIndex}
            height={svgHeight}
            width={svgWidth}
          />
        </Styles.VisGroup>
        <Styles.VisGroup startIndex={STUDIO_START_INDEX} activeIndex={activeIndex}>
          <Studio activeIndex={activeIndex} width={svgWidth} height={svgHeight} startIndex={STUDIO_START_INDEX} />
        </Styles.VisGroup>
      </React.Fragment>
    );
  }
}
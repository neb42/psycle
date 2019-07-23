import React from 'react';

import Axis from './Axis';
import ClassCount from './ClassCount';
import WeekScatter from './WeekScatter';
import InstructorBars from './InstructorBars';
import FavouriteInstructor from './FavouriteInstructor';
import Studio from './Studio';

import * as Styles from './Visualisations.styles';

export default class MortimerStreetRideVis extends React.Component {
  render() {
    const { width, height, svgWidth, svgHeight, activeIndex, progress } = this.props;
    return (
      <React.Fragment>
        <Axis activeIndex={activeIndex} height={height} width={width} barIndex={2} scatterIndex={1} />
        <Styles.VisGroup startIndex={0} activeIndex={activeIndex}>
          <ClassCount
            startIndex={0}
            activeIndex={activeIndex}
            width={svgWidth}
            height={svgHeight}
          />
        </Styles.VisGroup>
        <Styles.VisGroup startIndex={1} activeIndex={activeIndex}>
          <WeekScatter
            startIndex={1}
            activeIndex={activeIndex}
            height={svgHeight}
            width={svgWidth}
          />
        </Styles.VisGroup>
        <Styles.VisGroup startIndex={2} activeIndex={activeIndex}>
          <InstructorBars
            startIndex={2}
            activeIndex={activeIndex}
            width={svgWidth}
          />
        </Styles.VisGroup>
        <Styles.VisGroup startIndex={3} activeIndex={activeIndex}>
          <FavouriteInstructor
            startIndex={3}
            activeIndex={activeIndex}
            height={svgHeight}
            width={svgWidth}
          />
        </Styles.VisGroup>
        <Styles.VisGroup startIndex={4} activeIndex={activeIndex}>
          <Studio activeIndex={activeIndex} width={svgWidth} height={svgHeight} startIndex={4} />
        </Styles.VisGroup>
      </React.Fragment>
    );
  }
}
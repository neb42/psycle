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
        <Axis activeIndex={activeIndex} height={height} width={width} />
        <ClassCount
          activeIndex={activeIndex}
          width={svgWidth}
          height={svgHeight}
        />
        <Styles.VisGroup index={1} activeIndex={activeIndex}>
          <WeekScatter
            activeIndex={activeIndex}
            height={svgHeight}
            width={svgWidth}
          />
        </Styles.VisGroup>
        <Styles.VisGroup index={2} activeIndex={activeIndex}>
          <InstructorBars
            activeIndex={activeIndex}
            width={svgWidth}
          />
        </Styles.VisGroup>
        <Styles.VisGroup index={3} activeIndex={activeIndex}>
          <FavouriteInstructor
            activeIndex={activeIndex}
            height={svgHeight}
            width={svgWidth}
          />
        </Styles.VisGroup>
        <Styles.VisGroup index={4} activeIndex={activeIndex}>
          <Studio activeIndex={activeIndex} width={svgWidth} height={svgHeight} />
        </Styles.VisGroup>
      </React.Fragment>
    );
  }
}
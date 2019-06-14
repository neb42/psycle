import React from 'react';
import { nest } from 'd3-collection';
import { scaleBand, scaleLinear, scaleSequential, scaleTime } from 'd3-scale';
import { max, bin, extent } from 'd3-array';
import { interpolatePuRd } from 'd3-scale-chromatic';
import moment from 'moment';

import { BookingHistoryContext } from '../../context/BookingHistory';

import Login from './Login';
import Axis from './Axis';
import ClassCount from './ClassCount';
import WeekScatter from './WeekScatter';
import InstructorBars from './InstructorBars';
import FavouriteInstructor from './FavouriteInstructor';

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

  // Weekly scatter plot

  get weeklyCount() {
    const { bookingHistory } = this.context;
    return nest()
      .key(function (d) {
        const m = moment(d.date);
        return ((m.isoWeekday() - 1) * 1440) + (m.hour() * 60) + m.minute();
      })
      .rollup(function (v) { return v.length; })
      .entries(bookingHistory);
  }

  get yScatterScale() {
    const { height } = this.props;
    const countMax = max(this.weeklyCount, function (d) { return d.value;});
    return scaleLinear()
      .domain([0, countMax])
      .range([0, height - 50], 0.1, 0.1);
  }

  get xScatterScale() {
    const { width } = this.props;
    return scaleLinear()
     .domain([0, 10080])
     .range([0, width]);
  }

  get scatterColorScale() {
    return null;
  }

  // Instructor bar plot

  get instructorCounts() {
    const { bookingHistory } = this.context;
    return nest()
      .key(function (d) { return d.instructor; })
      .rollup(function (v) { return v.length; })
      .entries(bookingHistory)
      .sort(function (a, b) {return b.value - a.value;});
  }

  get yBarScale() {
    console.log('HERE', this.instructorCounts.map((_, i) => i))
    const { height } = this.props;
    return scaleBand()
      .paddingInner(0.08)
      .domain(this.instructorCounts.map((_, i) => i))
      .range([0, height - 50], 0.1, 0.1);
  }

  get xBarScale() {
    const { width } = this.props;
    const countMax = max(this.instructorCounts, function (d) { return d.value;});
    return scaleLinear()
      .range([0, width])
      .domain([0, countMax]);
  }

  get barColorScale() {
    const countMax = max(this.instructorCounts, function (d) { return d.value;});
    return scaleSequential()
      .domain([0, countMax])
      .interpolator(interpolatePuRd);
  }

  render() {
    const { width, height, activeIndex, progress } = this.props;
    return (
      <Styles.Visualisations id="vis">
        <svg width={this.svgWidth} height={this.svgHeight}>
          <g transform={this.groupTransform}>
            <foreignObject  width={this.svgWidth} height={this.svgHeight}>
              <Login activeIndex={activeIndex} />
            </foreignObject>
            <Axis
              activeIndex={activeIndex}
              height={height}
              xBarScale={this.xBarScale}
              xScatterScale={this.xScatterScale}
              yScatterScale={this.yScatterScale}
            />
            <ClassCount
              activeIndex={activeIndex}
              width={this.svgWidth}
              height={this.svgHeight}
            />
            <WeekScatter
              activeIndex={activeIndex}
              weeklyCount={this.weeklyCount}
              yScatterScale={this.yScatterScale}
              xScatterScale={this.xScatterScale}
              scatterColorScale={this.scatterColorScale}
              height={this.svgHeight}
            />
            <InstructorBars
              activeIndex={activeIndex}
              instructorCounts={this.instructorCounts}
              yBarScale={this.yBarScale}
              xBarScale={this.xBarScale}
              barColorScale={this.barColorScale}
            />
            <foreignObject  width={this.svgWidth} height={this.svgHeight}>
              <FavouriteInstructor
                activeIndex={activeIndex}
                height={this.svgHeight}
                width={this.svgWidth}
              />
            </foreignObject>
          </g>
        </svg>
      </Styles.Visualisations>
    );
  }
}

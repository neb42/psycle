import React from 'react';
import { nest } from 'd3-collection';
import { scaleBand, scaleLinear, scaleSequential, scaleTime } from 'd3-scale';
import { max, bin, extent } from 'd3-array';
import { interpolatePuRd } from 'd3-scale-chromatic';
import { contourDensity } from 'd3-contour';
import moment from 'moment';

import { BookingHistoryContext } from '../../context/BookingHistory';

import Login from './Login';
import Axis from './Axis';
import ClassCount from './ClassCount';
import WeekScatter from './WeekScatter';
import InstructorBars from './InstructorBars';
import FavouriteInstructor from './FavouriteInstructor';
import Studio from './Studio';

import * as Studio1 from '../Studio/studio1';
import * as Studio2 from '../Studio/studio2';

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

  // Class clount

  get classCountData() {
    const { bookingHistory } = this.context;
    const [ minDate, maxDate ] = extent(bookingHistory, d => d.date);
    const count = bookingHistory.length;
    const monthCount = Math.round(moment(maxDate).diff(moment(minDate), 'months', true));
    const averagePerMonth = (count / monthCount).toFixed(1);
    return {
      count,
      monthCount,
      averagePerMonth,
    };
  }

  // Weekly scatter plot

  get weeklyCount() {
    const { bookingHistory } = this.context;
    return nest()
      .key(function(d) { 
        const m = moment(d.date);
        return `${m.isoWeekday()}-${m.hour()}-${m.minute()}`;
      })
      // .key(function (d) {
      //   const m = moment(d.date);
      //   return ((m.isoWeekday() - 1) * 1440) + (m.hour() * 60) + m.minute();
      // })
      .rollup(function (v) { return v.length * 10; })
      .entries(bookingHistory);
  }

  get yScatterScale() {
    const { height } = this.props;
    const countMax = max(this.weeklyCount, function (d) { return d.value;});
    return scaleLinear()
      .domain([countMax + countMax * 0.05, 0])
      .range([50, height], 0.1, 0.1);
  }

  get xScatterScale() {
    const { width } = this.props;
    return scaleLinear()
     .domain([0, 10080])
     .range([0, width]);
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

  // Favourite instructor

  get favouriteInstructorName() {
    const { bookingHistory } = this.context;
    return bookingHistory.sort((a,b) =>
      bookingHistory.filter(v => v.instructor === a.instructor).length
      - bookingHistory.filter(v => v.instructor === b.instructor).length
    )[bookingHistory.length - 1].instructor.toLowerCase();
  }

  // Studio 1 contour density

  get studio1ContourDensity() {
    const { width, height } = this.props;
    const { bookingHistory } = this.context;
    const densityData = contourDensity()
      .x(function(d) { return Studio1.getX(d.bike); })
      .y(function(d) { return Studio1.getY(d.bike); })
      .size([this.svgWidth, this.svgHeight])
      .bandwidth(15)(
        bookingHistory.filter(d => d.studio === 'Studio 1')
      );
    return densityData;
  }

  get studio2ContourDensity() {
    const { width, height } = this.props;
    const { bookingHistory } = this.context;
    const densityData = contourDensity()
      .x(function(d) { return Studio2.getX(d.bike); })
      .y(function(d) { return Studio2.getY(d.bike); })
      .size([this.svgWidth, this.svgHeight])
      .bandwidth(15)(
        bookingHistory.filter(d => d.studio === 'Studio 2')
      );
    return densityData;
  }

  get contourDensityColorScale() {
    return scaleLinear()
      .domain([0, 0.0008]) // Points per square pixel.
      .range(["white", "#a71b52"]);
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
                  xBarScale={this.xBarScale}
                  xScatterScale={this.xScatterScale}
                  yScatterScale={this.yScatterScale}
                />
                <ClassCount
                  {...this.classCountData}
                  activeIndex={activeIndex}
                  width={this.svgWidth}
                  height={this.svgHeight}
                />
                <Styles.VisGroup index={2} activeIndex={activeIndex}> 
                  <WeekScatter
                    activeIndex={activeIndex}
                    weeklyCount={this.weeklyCount}
                    yScatterScale={this.yScatterScale}
                    xScatterScale={this.xScatterScale}
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
                  />
                </Styles.VisGroup>
                <Styles.VisGroup index={4} activeIndex={activeIndex}> 
                  <FavouriteInstructor
                    favouriteInstructorName={this.favouriteInstructorName}
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
                    contourDensityColorScale={this.contourDensityColorScale}
                    studio1ContourDensity={this.studio1ContourDensity}
                    studio2ContourDensity={this.studio2ContourDensity}
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

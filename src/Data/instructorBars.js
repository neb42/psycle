import { nest } from 'd3-collection';
import { scaleBand, scaleLinear } from 'd3-scale';
import { max } from 'd3-array';

export const instructorCounts = (bookingHistory) => {
  return nest()
    .key(function (d) { return d.instructor; })
    .rollup(function (v) { return v.length; })
    .entries(bookingHistory)
    .sort(function (a, b) {return b.value - a.value;});
}

export const yScale = (bookingHistory, height) => {
  return scaleBand()
    .paddingInner(0.08)
    .domain(instructorCounts(bookingHistory).map((_, i) => i))
    .range([0, height - 50], 0.1, 0.1);
}

export const xScale = (bookingHistory, width) => {
  const countMax = max(instructorCounts(bookingHistory), function (d) { return d.value;});
  return scaleLinear()
    .range([0, width])
    .domain([0, countMax]);
}

export const colorScale = (bookingHistory) => {
  const countMax = max(instructorCounts(bookingHistory), function (d) { return d.value;});
  return scaleLinear()
    .domain([0, countMax])
    .range([0.2, 0.7]);
}

const data = ({ bookingHistory, width, height }) => ({
  instructorCounts: instructorCounts(bookingHistory),
  yScale: yScale(bookingHistory, height), 
  xScale: xScale(bookingHistory, width),
  colorScale: colorScale(bookingHistory),
});

export default data;
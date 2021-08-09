import { nest } from 'd3-collection';
import { scaleBand, scaleLinear } from 'd3-scale';
import { max } from 'd3-array';

export const instructorCounts = (bookingHistory: any) => {
  return nest()
    .key(function(d: any) {
      return d.instructor;
    })
    .rollup(function(v: any) {
      return v.length;
    })
    .entries(bookingHistory)
    .sort(function(a: any, b: any) {
      return b.value - a.value;
    });
};

export const yScale = (bookingHistory: any, height: any) => {
  return scaleBand()
    .paddingInner(0.08)
    .domain(instructorCounts(bookingHistory).map((_: any, i: any) => i))
    .range([0, height - 50], 0.1, 0.1);
};

export const xScale = (bookingHistory: any, width: any) => {
  const countMax = max(instructorCounts(bookingHistory), function(d: any) {
    return d.value;
  });
  return scaleLinear()
    .range([0, width])
    .domain([0, countMax]);
};

export const colorScale = (bookingHistory: any) => {
  const countMax = max(instructorCounts(bookingHistory), function(d: any) {
    return d.value;
  });
  return scaleLinear()
    .domain([0, countMax])
    .range([0.2, 0.7]);
};

const data = ({
  bookingHistory,
  width,
  height
}: any) => ({
  instructorCounts: instructorCounts(bookingHistory),
  yScale: yScale(bookingHistory, height),
  xScale: xScale(bookingHistory, width),
  colorScale: colorScale(bookingHistory),
});

export default data;

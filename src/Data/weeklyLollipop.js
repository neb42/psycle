import { nest } from 'd3-collection';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import moment from 'moment';

export const weeklyCount = (bookingHistory) => {
  return nest()
    .key(function(d) { 
      const m = moment(d.date);
      return `${m.isoWeekday()}-${m.hour()}-${m.minute()}`;
    })
    .rollup(function (v) { return v.length; })
    .entries(bookingHistory);
}

export const yScale = (bookingHistory, height) => {
  const countMax = max(weeklyCount(bookingHistory), function (d) { return d.value;});
  return scaleLinear()
    .domain([countMax + Math.round(countMax * 0.05), 0])
    .range([50, height], 0.1, 0.1);
}

export const xScale = (width) => {
  return scaleLinear()
    .domain([0, 10080])
    .range([0, width]);
}

const data = ({ bookingHistory, width, height }) => ({
  weeklyCount: weeklyCount(bookingHistory),
  yScale: yScale(bookingHistory, height),
  xScale: xScale(width), 
});

export default data;
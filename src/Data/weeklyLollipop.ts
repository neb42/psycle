import { nest } from 'd3-collection';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import moment from 'moment';

const weeklyCount = (bookingHistory: any) => {
  return nest()
    .key(function(d: any) {
      const m = moment(d.date);
      return `${m.isoWeekday()}-${m.hour()}-${m.minute()}`;
    })
    .rollup(function(v: any) {
      return v.length;
    })
    .entries(bookingHistory);
};

const yScale = (bookingHistory: any, height: any) => {
  const countMax = max(weeklyCount(bookingHistory), function(d: any) {
    return d.value;
  });
  return scaleLinear()
    .domain([countMax + Math.round(countMax * 0.05), 0])
    .range([50, height], 0.1, 0.1);
};

const xScale = (width: any) => {
  return scaleLinear()
    .domain([0, 10080])
    .range([0, width]);
};

const data = ({
  bookingHistory,
  width,
  height
}: any) => ({
  weeklyCount: weeklyCount(bookingHistory),
  yScale: yScale(bookingHistory, height),
  xScale: xScale(width),
});

export default data;

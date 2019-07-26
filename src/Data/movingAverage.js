import { nest } from 'd3-collection';
import { extent, max } from 'd3-array';
import { scaleLinear, scaleTime } from 'd3-scale';
import { isoParse } from 'd3-time-format';

const dataByMonth = bookingHistory => nest()
  .key(function(d) {
    const date = new Date(d.date);
    return new Date(`${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-01`);
  })
  .rollup(function(v) {
    return v.length;
  })
  .entries(bookingHistory)
  .sort((a, b) => new Date(a.key) - new Date(b.key));
      
const xScale = (bookingHistory, width) =>
  scaleTime()
    .domain(extent(dataByMonth(bookingHistory), d => isoParse(d.key)))
    .range([0, width]);
    
const yScale = (bookingHistory, height) =>
  scaleLinear()
    .domain([0, max(dataByMonth(bookingHistory), d => d.value) * 1.05])
    .rangeRound([height, 0]);

const data = ({ bookingHistory, width, height }) => ({
  dataByMonth: dataByMonth(bookingHistory),
  xScale: xScale(bookingHistory, width),
  yScale: yScale(bookingHistory, height),
});

export default data;

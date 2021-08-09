import { nest } from 'd3-collection';
import { extent, max } from 'd3-array';
import { scaleLinear, scaleTime } from 'd3-scale';
import { isoParse } from 'd3-time-format';

const dataByMonth = (bookingHistory: any) => nest()
  .key(function(d: any) {
    const date = new Date(d.date);
    return new Date(`${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-01`);
  })
  .rollup(function(v: any) {
    return v.length;
  })
  .entries(bookingHistory)
  // @ts-expect-error ts-migrate(2362) FIXME: The left-hand side of an arithmetic operation must... Remove this comment to see the full error message
  .sort((a: any, b: any) => new Date(a.key) - new Date(b.key));
      
const xScale = (bookingHistory: any, width: any) =>
  scaleTime()
    .domain(extent(dataByMonth(bookingHistory), (d: any) => isoParse(d.key)))
    .range([0, width]);
    
const yScale = (bookingHistory: any, height: any) =>
  scaleLinear()
    .domain([0, max(dataByMonth(bookingHistory), (d: any) => d.value) * 1.05])
    .rangeRound([height, 0]);

const data = ({
  bookingHistory,
  width,
  height
}: any) => ({
  dataByMonth: dataByMonth(bookingHistory),
  xScale: xScale(bookingHistory, width),
  yScale: yScale(bookingHistory, height),
});

export default data;

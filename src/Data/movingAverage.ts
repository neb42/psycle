import { nest } from 'd3-collection';
import { extent, max } from 'd3-array';
import { scaleLinear, scaleTime } from 'd3-scale';
import { isoParse } from 'd3-time-format';

const dataByMonth = (bookingHistory: any) =>
  nest()
    .key(function(d: any) {
      const date = new Date(d.date);
      return new Date(`${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-01`).toDateString();
    })
    .rollup(function(v: any) {
      return v.length;
    })
    .entries(bookingHistory)
    .sort((a: any, b: any) => new Date(a.key).valueOf() - new Date(b.key).valueOf());

const xScale = (bookingHistory: any, width: any) => {
  const [min, max] = extent(dataByMonth(bookingHistory), (d: any) => isoParse(d.key));
  if (!min || !max) throw new Error();
  return scaleTime()
    .domain([min, max])
    .range([0, width]);
};

const yScale = (bookingHistory: any, height: any) =>
  scaleLinear()
    .domain([0, max(dataByMonth(bookingHistory), (d: any) => d.value) * 1.05])
    .rangeRound([height, 0]);

const data = ({ bookingHistory, width, height }: any) => ({
  dataByMonth: dataByMonth(bookingHistory),
  xScale: xScale(bookingHistory, width),
  yScale: yScale(bookingHistory, height),
});

export default data;

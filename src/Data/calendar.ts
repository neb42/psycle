import { nest } from 'd3-collection';

const dataByDay = (bookingHistory: any) =>
  nest()
    .key(function(d: any) {
      return new Date(d.date).toDateString();
    })
    .rollup(function(v: any) {
      return v.length;
    })
    .entries(bookingHistory);

const data = ({ bookingHistory, width, height }: any) => ({
  dataByDay: dataByDay(bookingHistory),
});

export default data;

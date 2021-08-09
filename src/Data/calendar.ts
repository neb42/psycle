import { nest } from 'd3-collection';

const dataByDay = bookingHistory => nest()
  .key(function(d) {
    return new Date(d.date);
  })
  .rollup(function(v) {
    return v.length;
  })
  .entries(bookingHistory);

const data = ({ bookingHistory, width, height }) => ({
  dataByDay: dataByDay(bookingHistory),
});

export default data;

import { extent } from 'd3-array';
import moment from 'moment';

const classCountData = bookingHistory => {
  const [ minDate, maxDate ] = extent(bookingHistory, d => d.date);
  const count = bookingHistory.length;
  const monthCount = Math.round(moment(maxDate).diff(moment(minDate), 'months', true));
  const averagePerMonth = (count / monthCount).toFixed(1);
  return {
    count,
    monthCount,
    averagePerMonth,
  };
};

const data = ({ bookingHistory, width, height }) => ({
  ...classCountData(bookingHistory),
});

export default data;
import React, { useContext, useEffect, useCallback } from 'react';
import { extent, range } from 'd3-array';
import { timeDays } from 'd3-time';
import { timeFormat } from 'd3-time-format';
import moment from 'moment';

import { BookingHistoryContext } from '../../../context/BookingHistory';
import { selectAll } from 'd3-selection';
import { transition } from 'd3-transition';

const CELL_SIZE = 7;

const Calendar = ({
  width,
  height,
  activeIndex,
  progress,
  startIndex,
}) => {
  const { calendar: { dataByDay }} = useContext(BookingHistoryContext);

  const getColor = useCallback(day => {
    const d = dataByDay.find(d => timeFormat('%b %d, %Y')(new Date(d.key)) === timeFormat('%b %d, %Y')(day));
    if (d) {
      if (d.value === 1) {
        return 'green';
      }
      if (d.value === 2) {
        return 'blue';
      }
      if (d.value === 3) {
        return 'green';
      }
    }
    return '#eee';
  }, [dataByDay]);

  const show = useCallback(() => {
    selectAll('.calendar-day-rect')
      .transition(transition().duration(600))
      .style('fill', d => getColor(d))
      .attr('opacity', 1);

    selectAll('.calendar-text')
      .transition(transition().duration(600))
      .attr('opacity', 1);
  }, [getColor]);

  const hide = () => {
    selectAll('.calendar-day-rect, .calendar-text')
      .transition(transition().duration(600))
      .attr('opacity', 0);
  };
  
  useEffect(() => {
    const [minYear, maxYear] = extent(dataByDay, d => moment(d.key).year());
    selectAll('.calendar-day-rect')
      .data(timeDays(new Date(minYear, 0, 1), new Date(maxYear + 1, 0, 1)));
  }, [dataByDay]);

  // Handle active index change
  useEffect(() => {
    if (activeIndex === startIndex) {
      show();
    } else {
      hide();
    }
  }, [activeIndex, show, startIndex]);
  
  const [minYear, maxYear] = extent(dataByDay, d => moment(d.key).year());

  const yearRange = minYear === maxYear ? [minYear] : range(minYear, maxYear);

  const positionFromMonth = month =>
    (timeFormat('%U')(new Date(`2019-${month}-01`)) * CELL_SIZE) + (timeFormat('%U')(new Date(`2019-${month}-01`)) * 3);
  const positionFromDay = day => (day * CELL_SIZE) + (day * 3) ;

  return (
    <g transform="translate(0, 20)">
      {range(1, 13).map(m => (
        <text
          className="calendar-text"
          x={positionFromMonth(m) + 35}
          y="-7"
        >
          {moment.monthsShort(m - 1)}
        </text>
      ))}
      {yearRange.map((year, i) => ( 
        <g transform={`translate(35, ${130 * i})`}>
          {[2, 4, 6].map(d => (
            <text
              className="calendar-text"
              y={positionFromDay(d)}
              x="-35"
            >
              {moment.weekdaysShort(d - 1)}
            </text>
          ))}
          <text
            className="calendar-text"
            transform={`translate(535, 40) rotate(90)`}
            style={{ textAnchor: 'middle' }}
          >
            {year}
          </text>
          {timeDays(new Date(year, 0, 1), new Date(year + 1, 0, 1)).map(day => (
            <rect
              className="calendar-day-rect"
              date={timeFormat('%b %d, %Y')(day)}
              width={CELL_SIZE}
              height={CELL_SIZE}
              x={(timeFormat('%U')(day) * CELL_SIZE) + (timeFormat('%U')(day) * 3)}
              y={(day.getDay() * CELL_SIZE) + (day.getDay() * 3)}
            />
          ))}
        </g>
      ))}
    </g>
  );
};

export default Calendar;
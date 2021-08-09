import React, { useEffect, useCallback } from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { extent, range } from 'd3-array';
import { timeDays } from 'd3-time';
import { timeFormat } from 'd3-time-format';
import { selectAll } from 'd3-selection';

import useChartTransition from '../../../hooks/useChartTransition';
import { useDataContext } from '../../../context/DataContext';

const Text = styled.text`
  fill: #fff;
  font-size: 12px;
`;

const YearText = styled.text`
  fill: #fff;
  font-size: 16px;
`;

const CELL_SIZE = 7;

const Calendar = ({ width, height, activeIndex, progress, startIndex }: any) => {
  const {
    calendar: { dataByDay },
  } = useDataContext();

  const [minYear, maxYear] = extent(dataByDay, (d: any) => moment(d.key).year());

  if (!minYear || !maxYear) return null;

  const getColor = useCallback(
    (day: any) => {
      const d = dataByDay.find(
        (d: any) => timeFormat('%b %d, %Y')(new Date(d.key)) === timeFormat('%b %d, %Y')(day),
      );
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
    },
    [dataByDay],
  );

  const show = useCallback(() => {
    const delayUnit = 5;

    selectAll('.calendar-day-rect')
      .attr('opacity', 0)
      .transition()
      .delay((d: any) => {
        const daysSinceStart =
          (new Date(d).valueOf() - new Date(`${minYear}-01-01`).valueOf()) / 86400000;
        return delayUnit * daysSinceStart;
      })
      .duration(300)
      .style('fill', (d: any) => getColor(d))
      .attr('opacity', 1);

    selectAll('.calendar-text-weekday')
      .attr('opacity', 0)
      .transition()
      .delay((_: any, i: any) => {
        const year = Math.floor(i / 3);
        const daysSinceStart =
          (new Date(`${minYear + year}-01-01`).valueOf() - new Date(`${minYear}-01-01`).valueOf()) /
          86400000;
        return daysSinceStart * delayUnit + (i % 3) * 50;
      })
      .duration(600)
      .attr('opacity', 1);

    selectAll('.calendar-text-month')
      .attr('opacity', 0)
      .transition()
      .delay((_: any, i: any) => {
        if (i === 0) {
          return 0;
        }
        const daysSinceStart =
          (new Date(`${minYear}-${i}-01`).valueOf() - new Date(`${minYear}-01-01`).valueOf()) /
          86400000;
        return delayUnit * daysSinceStart;
      })
      .duration(600)
      .attr('opacity', 1);

    selectAll('.calendar-text-year')
      .attr('opacity', 0)
      .transition()
      .delay((_: any, i: any) => {
        const daysSinceStart =
          (new Date(`${minYear + i + 1}-01-01`).valueOf() -
            new Date(`${minYear}-01-01`).valueOf()) /
          86400000;
        return delayUnit * daysSinceStart;
      })
      .duration(600)
      .attr('opacity', 1);
  }, [getColor, minYear]);

  const hide = () => {
    selectAll(
      '.calendar-day-rect, .calendar-text-year, .calendar-text-month, .calendar-text-weekday',
    )
      .transition()
      .duration(600)
      .attr('opacity', 0);
  };

  useEffect(() => {
    selectAll('.calendar-day-rect').data(
      timeDays(new Date(minYear, 0, 1), new Date(maxYear + 1, 0, 1)),
    );
  }, [dataByDay, maxYear, minYear]);

  useChartTransition({ [startIndex]: show }, hide, activeIndex);

  const yearRange = minYear === maxYear ? [minYear] : range(minYear, maxYear + 1);

  const positionFromMonth = (month: any) =>
    Number(timeFormat('%U')(new Date(`2019-${month}-01`))) * CELL_SIZE +
    Number(timeFormat('%U')(new Date(`2019-${month}-01`))) * 3;
  const positionFromDay = (day: any) => day * CELL_SIZE + day * 3;

  return (
    <g transform={`translate(0, ${(130 * (maxYear - minYear + 1)) / 2})`}>
      {range(1, 13).map((m: any) => (
        <Text className="calendar-text-month" x={positionFromMonth(m) + 35} y="-7">
          {moment.monthsShort(m - 1)}
        </Text>
      ))}
      {yearRange.map((year: any, i: any) => (
        <g transform={`translate(35, ${130 * i})`}>
          {[2, 4, 6].map((d) => (
            <Text className="calendar-text-weekday" y={positionFromDay(d)} x="-35">
              {moment.weekdaysShort(d - 1)}
            </Text>
          ))}
          <YearText
            className="calendar-text-year"
            transform="translate(535, 40) rotate(90)"
            style={{ textAnchor: 'middle' }}
          >
            {year}
          </YearText>
          {timeDays(new Date(year, 0, 1), new Date(year + 1, 0, 1)).map((day: any) => (
            <rect
              className="calendar-day-rect"
              // date={timeFormat('%b %d, %Y')(day)}
              width={CELL_SIZE}
              height={CELL_SIZE}
              x={Number(timeFormat('%U')(day)) * CELL_SIZE + Number(timeFormat('%U')(day)) * 3}
              y={day.getDay() * CELL_SIZE + day.getDay() * 3}
            />
          ))}
        </g>
      ))}
    </g>
  );
};

export default React.memo(Calendar);

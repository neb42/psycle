import React, { useContext, useEffect, useCallback } from 'react';
import { line, curveBasis } from 'd3-shape';
import { selectAll, select } from 'd3-selection';
import { transition } from 'd3-transition';
import { isoParse } from 'd3-time-format';

import { BookingHistoryContext } from '../../../context/BookingHistory';
import useChartTransition from '../../../hooks/useChartTransition';

const MovingAverage = ({
  width,
  height,
  activeIndex,
  progress,
  startIndex,
}) => {
  const { movingAverage: { dataByMonth, xScale, yScale }} = useContext(BookingHistoryContext);

  const show = () => {
    select('.moving-average-path')
      .attr('stroke', 'transparent');

    select('.moving-average-path')
      .transition()
      .duration(600)
      .attr('stroke', '#fff');
  };

  const hide = () => {
    select('.moving-average-path')
      .transition()
      .duration(600)
      .attr('stroke', 'transparent');
  };

  useChartTransition({ [startIndex]: show }, hide, activeIndex);
      
  const movingAverageLine = line()
    .x(d => xScale(isoParse(d.key)))
    .y(d => yScale(d.value))
    .curve(curveBasis);
       
  return  (
    <path className="moving-average-path" d={movingAverageLine(dataByMonth)} stroke="#fff" fill="transparent" />
  );
};

export default MovingAverage;
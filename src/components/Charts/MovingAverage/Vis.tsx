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
    const totalLength = select('.moving-average-path').node().getTotalLength();
    selectAll('.moving-average-path')
      .attr('stroke-dasharray', totalLength + ' ' + totalLength)
      .attr('stroke-dashoffset', totalLength)
      .transition()
      .duration(2000)
      .attr('stroke-dashoffset', 0);
  };

  const hide = () => {
    const totalLength = select('.moving-average-path').node().getTotalLength();
    selectAll('.moving-average-path')
      .transition()
      .duration(600)
      .attr('stroke-dashoffset', totalLength);
  };

  useChartTransition({ [startIndex]: show }, hide, activeIndex);
      
  const movingAverageLine = line()
    .x(d => xScale(isoParse(d.key)))
    .y(d => yScale(d.value))
    .curve(curveBasis);
       
  return (
    <path
      className="moving-average-path"
      d={movingAverageLine(dataByMonth)}
      stroke="#fff"
      strokeWidth="4px"
      strokeLinecap="round"
      fill="transparent"
    />
  );
};

export default React.memo(MovingAverage);
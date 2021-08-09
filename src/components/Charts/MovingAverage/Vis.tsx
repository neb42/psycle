import React, { useContext, useEffect, useCallback } from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'd3-s... Remove this comment to see the full error message
import { line, curveBasis } from 'd3-shape';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'd3-s... Remove this comment to see the full error message
import { selectAll, select } from 'd3-selection';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'd3-t... Remove this comment to see the full error message
import { transition } from 'd3-transition';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'd3-t... Remove this comment to see the full error message
import { isoParse } from 'd3-time-format';

import { BookingHistoryContext } from '../../../context/BookingHistory';
import useChartTransition from '../../../hooks/useChartTransition';

const MovingAverage = ({
  width,
  height,
  activeIndex,
  progress,
  startIndex
}: any) => {
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
    .x((d: any) => xScale(isoParse(d.key)))
    .y((d: any) => yScale(d.value))
    .curve(curveBasis);
       
  return (
    // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
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
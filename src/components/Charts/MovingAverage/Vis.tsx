import React from 'react';
import { line, curveBasis } from 'd3-shape';
import { selectAll, select } from 'd3-selection';
import { isoParse } from 'd3-time-format';

import useChartTransition from '../../../hooks/useChartTransition';
import { useDataContext } from '../../../context/DataContext';

const MovingAverage = ({ width, height, activeIndex, progress, startIndex }: any) => {
  const {
    movingAverage: { dataByMonth, xScale, yScale },
  } = useDataContext();

  const show = () => {
    const node = select('.moving-average-path').node();
    if (!node) return;
    const totalLength = (node as SVGPathElement).getTotalLength();
    selectAll('.moving-average-path')
      .attr('stroke-dasharray', `${totalLength} ${totalLength}`)
      .attr('stroke-dashoffset', totalLength)
      .transition()
      .duration(2000)
      .attr('stroke-dashoffset', 0);
  };

  const hide = () => {
    const node = select('.moving-average-path').node();
    if (!node) return;
    const totalLength = (node as SVGPathElement).getTotalLength();
    selectAll('.moving-average-path')
      .transition()
      .duration(600)
      .attr('stroke-dashoffset', totalLength);
  };

  useChartTransition({ [startIndex]: show }, hide, activeIndex);

  const movingAverageLine = line<typeof dataByMonth[number]>()
    .x((d: any) => {
      const date = isoParse(d.key);
      return date ? xScale(date) : 0;
    })
    .y((d: any) => yScale(d.value))
    .curve(curveBasis);

  return (
    <path
      className="moving-average-path"
      d={movingAverageLine(dataByMonth) || undefined}
      stroke="#fff"
      strokeWidth="4px"
      strokeLinecap="round"
      fill="transparent"
    />
  );
};

export default React.memo(MovingAverage);

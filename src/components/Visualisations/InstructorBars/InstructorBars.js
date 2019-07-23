import React from 'react';
import { selectAll } from 'd3-selection';
import { transition } from 'd3-transition';

import { BookingHistoryContext } from '../../../context/BookingHistory';

export default class InstructorBars extends React.PureComponent {
  state = {
    visible: this.props.activeIndex === 2,
  };

  static contextType = BookingHistoryContext;

  componentDidMount() {
    selectAll('.instructor-count-bar').data(this.context.instructorBars.instructorCounts);
  }

  componentDidUpdate(prevProps) {
    const { activeIndex: prevIdx } = prevProps;
    const { activeIndex } = this.props;

    if (prevIdx !== activeIndex) {
      this.handleActiveIndexChange(activeIndex);
    }
  }

  handleActiveIndexChange = activeIndex => {
    const { startIndex } = this.props;
    if (activeIndex === startIndex) {
      this.show();
    } else {
      this.hide();
    }
  };

  show = () => {
    const {
      instructorBars: { xScale },
    } = this.context;
    selectAll('.instructor-count-bar')
      .transition(
        transition()
          .duration(600)
          .delay(function(d, i) {
            return 300 * (i + 1);
          }),
      )
      .attr('width', function(d) {
        return xScale(d.value);
      });

    selectAll('.bar-text')
      .transition(
        transition()
          .duration(600)
          .delay(1200),
      )
      .attr('opacity', 1)
      .on('end', () => this.setState({ visible: true }));
  };

  hide = () => {
    selectAll('.bar-text')
      .transition(transition().duration(600))
      .attr('opacity', 0);

    selectAll('.instructor-count-bar')
      .transition(transition().duration(600))
      .attr('width', 0)
      .on('end', () => this.setState({ visible: false }));
  };

  rectWidth = datum => {
    const { visible } = this.state;
    const {
      instructorBars: { xScale },
    } = this.context;
    if (visible) {
      return xScale(datum.value);
    }
    return 0;
  };

  render() {
    const { width } = this.props;
    const {
      instructorBars: { instructorCounts, yScale, colorScale },
    } = this.context;
    const { visible } = this.state;

    return (
      <React.Fragment>
        {instructorCounts.map((datum, i) => (
          <rect
            className="instructor-count-bar"
            width={this.rectWidth(datum)}
            height={yScale.bandwidth()}
            x={0}
            y={yScale(i)}
            // fill={barColorScale(datum.value)}
            fill="#fff"
            opacity={colorScale(datum.value)}
          />
        ))}
        {instructorCounts.map((datum, i) => (
          <text
            className="bar-text"
            x={width - 50}
            y={yScale(i)}
            dy={yScale.bandwidth() / 1.2}
            fill="#fff"
            textAnchor="end"
            opacity={visible ? 1 : 0}
            style={{
              fontSize: yScale.bandwidth(),
              fontFamily: 'soin_sans_neueroman,sans-serif',
            }}
          >
            {datum.key}
          </text>
        ))}
      </React.Fragment>
    );
  }
}

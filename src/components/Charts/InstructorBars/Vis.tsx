import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'd3-s... Remove this comment to see the full error message
import { selectAll } from 'd3-selection';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'd3-t... Remove this comment to see the full error message
import { transition } from 'd3-transition';

import { BookingHistoryContext } from '../../../context/BookingHistory';

type State = any;

export default class InstructorBars extends React.PureComponent<{}, State> {
  state = {
    // @ts-expect-error ts-migrate(2729) FIXME: Property 'props' is used before its initialization... Remove this comment to see the full error message
    visible: this.props.activeIndex === 2,
  };

  static contextType = BookingHistoryContext;

  context: any;
  props: any;
  setState: any;

  componentDidMount() {
    selectAll('.instructor-count-bar').data(this.context.instructorBars.instructorCounts);
  }

  componentDidUpdate(prevProps: {}) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'activeIndex' does not exist on type '{}'... Remove this comment to see the full error message
    const { activeIndex: prevIdx } = prevProps;
    const { activeIndex } = this.props;

    if (prevIdx !== activeIndex) {
      this.handleActiveIndexChange(activeIndex);
    }
  }

  handleActiveIndexChange = (activeIndex: any) => {
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
      .transition()
      .duration(600)
      .delay(function(d: any, i: any) {
        return 300 * (i + 1);
      })
      .attr('width', function(d: any) {
        return xScale(d.value);
      });

    selectAll('.bar-text')
      .transition()
      .delay((_: any, i: any) => 300 * (i + 2))
      .duration(600)
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

  rectWidth = (datum: any) => {
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
        {instructorCounts.map((datum: any, i: any) => (
          // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
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
        {instructorCounts.map((datum: any, i: any) => (
          // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
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
          {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
          </text>
        ))}
      </React.Fragment>
    );
  }
}

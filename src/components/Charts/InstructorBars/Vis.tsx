import React from 'react';
import { selectAll } from 'd3-selection';

import { DataContext } from '../../../context/DataContext';

type Props = {
  activeIndex: number;
};

type State = {
  visible: boolean;
};

export default class InstructorBars extends React.PureComponent<Props, State> {
  state: State = {
    visible: this.props.activeIndex === 2,
  };

  static contextType = DataContext;

  context: any;

  props: any;

  setState: any;

  componentDidMount() {
    selectAll('.instructor-count-bar').data(this.context.instructorBars.instructorCounts);
  }

  componentDidUpdate(prevProps: Props) {
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
      .delay(function (d: any, i: any) {
        return 300 * (i + 1);
      })
      .attr('width', function (d: any) {
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
    selectAll('.bar-text').transition().duration(600).attr('opacity', 0);

    selectAll('.instructor-count-bar')
      .transition()
      .duration(600)
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
      <>
        {instructorCounts.map((datum: any, i: any) => (
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
      </>
    );
  }
}

import React from 'react';
import { selectAll } from 'd3-selection';
import { transition } from 'd3-transition';

export default class InstructorBars extends React.PureComponent {
  state = {
    visible: this.props.activeIndex === 3,
  };

  componentDidMount() {
    selectAll('.instructor-count-bar').data(this.props.instructorCounts);
  }

  componentDidUpdate(prevProps) {
    const { activeIndex: prevIdx } = prevProps;
    const { activeIndex } = this.props;

    if (prevIdx !== activeIndex) {
      this.handleActiveIndexChange(activeIndex);
    }
  }

  handleActiveIndexChange = (activeIndex) => {
    if (activeIndex === 3) {
      this.show();
    } else  {
      this.hide();
    }
  }

  show = () => {
    const { xBarScale } = this.props;
    selectAll('.instructor-count-bar')
      .transition(
        transition()
          .duration(600)
          .delay(function (d, i) {
            return 300 * (i + 1);
          })
      )
      .attr('width', function (d) {
        return xBarScale(d.value);
      });

    selectAll('.bar-text')
      .transition(
        transition()
          .duration(600)
          .delay(1200)
      )
      .attr('opacity', 1)
      .on('end', () => this.setState({ visible: true }));
  }

  hide = () => {
    selectAll('.instructor-count-bar,.bar-text')
      .transition(transition('hide-bars').duration(600))
      .attr('width', 0)
      .on('end', () => this.setState({ visible: false }));
  }

  rectWidth = (datum) => {
    const { xBarScale } = this.props;
    const { visible } = this.state;
    if (visible) {
      return xBarScale(datum.value);
    }
    return 0;
  }

  render() {
    const  {
      yBarScale,
      barColorScale,
      instructorCounts,
      width,
    } = this.props;
    const { visible } = this.state;

    return (
      <React.Fragment>
        {instructorCounts.map((datum, i) => (
          <rect
            className="instructor-count-bar"
            width={this.rectWidth(datum)}
            height={yBarScale.bandwidth()}
            x={0}
            y={yBarScale(i)}
            fill={barColorScale(datum.value)}
          />
        ))}
        {instructorCounts.map((datum, i) => (
          <text
            className="bar-text"
            x={width - 50}
            y={yBarScale(i)}
            dy={yBarScale.bandwidth() / 1.2}
            fill="white"
            textAnchor="end"
            opacity={visible ? 1 : 0}
            style={{
              fontSize: yBarScale.bandwidth(),
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

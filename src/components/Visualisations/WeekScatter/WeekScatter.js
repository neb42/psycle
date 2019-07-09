import React from 'react';
import { selectAll } from 'd3-selection';
import { transition } from 'd3-transition';

const range = (start, end, step = 1) => {
  const len = Math.floor((end - start) / step) + 1;
  return Array(len).fill().map((_, idx) => start + (idx * step));
}

export default class WeekScatter extends React.PureComponent {
  state = {
    visible: this.props.activeIndex === 3,
  };

  componentDidMount() {
    selectAll('.week-scatter-point').data(this.props.weeklyCount);
    selectAll('.week-line').data(this.props.weeklyCount);
  }

  componentDidUpdate(prevProps) {
    const { activeIndex: prevIdx } = prevProps;
    const { activeIndex } = this.props;

    if (prevIdx !== activeIndex) {
      this.handleActiveIndexChange(activeIndex);
    }
  }

  handleActiveIndexChange = (activeIndex) => {
    if (activeIndex === 2) {
      this.show();
    } else if (activeIndex === 1 || activeIndex === 3) {
      this.hide();
    }
  }

  show = () => {
    const  {
      yScatterScale,
      xScatterScale,
    } = this.props;

    selectAll('.week-line')
      .transition(transition().duration(600))
      .attr('y2', d => yScatterScale(d.value) + this.yOffset);

    selectAll('.week-scatter-point')
      .transition(transition('dsf').duration(600))
      .attr('cx', d => xScatterScale(d.key))
      .attr('cy', d => yScatterScale(d.value) + this.yOffset)
      .attr('fill-opacity', 1)
      .on('end', () => this.setState({ visible: true }));
  }

  hide = () => {
    const { yScatterScale } = this.props;

    selectAll('.week-line')
      .transition(transition().duration(600))
      .attr('y2', yScatterScale(0));

    selectAll('.week-scatter-point')
      .transition(transition().duration(600))
      .attr('cy', yScatterScale(0))
      .attr('fill-opacity', 0)
      .on('end', () => this.setState({ visible: false }));
  }

  get yOffset() {
    return this.rectHeight / 2;
  }

  get rectHeight() {
    const { yScatterScale, height } = this.props
    return (height - 90) / (yScatterScale.domain()[0] - yScatterScale.domain()[1]);
  }

  render() {
    const  {
      yScatterScale,
      xScatterScale,
      weeklyCount,
      height,
      width,
    } = this.props;
    const { visible } = this.state;

    return (
      <React.Fragment>
        {weeklyCount.map((datum, i) => (
          <React.Fragment>
            <line
              className="week-line"
              x1={xScatterScale(datum.key)}
              x2={xScatterScale(datum.key)}
              y1={yScatterScale(0)}
              y2={visible ? yScatterScale(datum.value) + this.yOffset : yScatterScale(0)}
              stroke="#fff"
            />
            <circle
              className="week-scatter-point"
              cx={xScatterScale(datum.key)}
              cy={visible ? yScatterScale(datum.value) + this.yOffset : height}
              r={5}
              fillOpacity={visible ? 1 : 0}
              fill={'#fff'}
            />
          </React.Fragment>
        ))}
        <g>
          {range(yScatterScale.domain()[1], yScatterScale.domain()[0]).slice(1).reverse().map((v, i) => (
            <React.Fragment>
              <rect
                height={this.rectHeight}
                width={width} 
                y={(i * this.rectHeight) + 50}
                x={-20}
                opacity={visible ? 0.3 * (v / (yScatterScale.domain()[0] - yScatterScale.domain()[1])) : 0}
                fill="#fff"
              />
              <text
                x={-15}
                y={(i * this.rectHeight) + 50 + this.yOffset + 8}
                fill="white"
                opacity={visible ? 1 : 0}
                style={{
                  fontSize: 16,
                  fontFamily: 'soin_sans_neueroman,sans-serif',
                }}
              >
                {v}
              </text>
            </React.Fragment>
          ))}
        </g>
      </React.Fragment>
    );
  }
}

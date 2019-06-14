import React from 'react';
import { selectAll } from 'd3-selection';
import { transition } from 'd3-transition';

export default class WeekScatter extends React.PureComponent {
  state = {
    visible: this.props.activeIndex === 3,
  };

  componentDidMount() {
    selectAll('.week-scatter-point').data(this.props.weeklyCount);
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
    selectAll('.week-scatter-point')
      .transition(transition('dsf').duration(600))
      .attr('cx', d => xScatterScale(d.key))
      .attr('cy', d => yScatterScale(d.value))
      .attr('fill-opacity', 1)
      .on('end', () => this.setState({ visible: true }));
  }

  hide = () => {
    const { height} = this.props;
    selectAll('.week-scatter-point')
      .transition(transition().duration(600))
      .attr('cx', 0)
      .attr('cy', height)
      .attr('fill-opacity', 0)
      .on('end', () => this.setState({ visible: false }));
  }

  render() {
    const  {
      yScatterScale,
      xScatterScale,
      scatterColorScale,
      weeklyCount,
      height,
    } = this.props;
    const { visible } = this.state;

    return (
      <React.Fragment>
        {weeklyCount.map((datum, i) => (
          <circle
            className="week-scatter-point"
            cx={visible ? xScatterScale(datum.key) : 0}
            cy={visible ? yScatterScale(datum.value) : height}
            r={5}
            fillOpacity={visible ? 1 : 0}
            // fill={scatterColorScale(datum.value)}
            fill={'red'}
          />
        ))}
      </React.Fragment>
    );
  }
}

import React from 'react';
import { selectAll } from 'd3-selection';
import { transition } from 'd3-transition';

import { Studio1 } from '../../Studio';

export default class Studio1Viz extends React.Component {
  state = {
    visible: this.props.activeIndex === 5,
  };

  componentDidUpdate(prevProps) {
    const { activeIndex: prevIdx } = prevProps;
    const { activeIndex } = this.props;

    if (prevIdx !== activeIndex) {
      this.handleActiveIndexChange(activeIndex);
    }
  }

  handleActiveIndexChange = (activeIndex) => {
    if (activeIndex === 5) {
      this.show();
    } else if (activeIndex === 4 || activeIndex === 6) {
      this.hide();
    }
  }

  show = () => {
    selectAll('.studio-row')
      .transition(
        transition()
          .duration(600)
      )
      .attr('opacity', 1)
      .on('end', () => this.setState({ visible: true }));
  }

  hide = () => {
    selectAll('.studio-row')
      .transition(transition().duration(600))
      .attr('opacity', 0)
      .on('end', () => this.setState({ visible: false }));
  }



  render() {
    const { visible } = this.props;
    return (
      <Studio1 opacity={visible ? 1 : 0} />
    );
  }
}

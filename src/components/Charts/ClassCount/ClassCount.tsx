import React from 'react';
import { select, selectAll } from 'd3-selection';
import styled from 'styled-components';

import { DataContext } from '../../../context/DataContext';

const A = styled.text`
  fill: #fff;
  font-size: 95px;
  text-anchor: middle;
  font-family: soin_sans_neueroman, sans-serif;
`;

const B = styled.text`
  fill: #fff;
  font-size: 55px;
  text-anchor: middle;
  font-family: soin_sans_neueroman, sans-serif;
`;

const C = styled.text`
  fill: #fff;
  font-size: 55px;
  text-anchor: middle;
  font-family: soin_sans_neueroman, sans-serif;
`;

type Props = {
  activeIndex: number;
};

type State = {
  visible: boolean;
  state: 0 | 1 | 2;
};

export default class ClassCount extends React.PureComponent<Props, State> {
  state: State = {
    visible: this.props.activeIndex === this.props.startIndex,
    state: 0,
  };

  static contextType = DataContext;

  context: any;

  props: any;

  setState: any;

  componentDidUpdate(prevProps: Props) {
    const { activeIndex: prevIdx } = prevProps;
    const { activeIndex } = this.props;

    if (prevIdx !== activeIndex) {
      this.handleActiveIndexChange(activeIndex, prevIdx);
    }
  }

  handleActiveIndexChange = (activeIndex: any, prevIdx: any) => {
    const { startIndex } = this.props;
    if (activeIndex < startIndex) {
      this.hideFromTop();
    } else if (activeIndex === startIndex) {
      this.showFromTop();
    } else if (activeIndex === startIndex && prevIdx === startIndex + 1) {
      this.showFromBottom();
    } else if (activeIndex === startIndex + 1) {
      this.hideFromBottom();
    }
  };

  showFromTop = () => {
    const { height, width } = this.props;
    const transitionSpeed = 600;
    // initialise

    select('.class-count.b')
      .transition()
      .duration(0)
      .attr('x', width / 2)
      .attr('y', height / 3 + height / 5)
      .attr('opacity', 0);

    select('.class-count.c')
      .transition()
      .duration(0)
      .attr('x', width / 2)
      .attr('y', height / 3 + height / 5)
      .attr('opacity', 0);

    select('.class-count.a')
      .transition()
      .duration(0)
      .attr('transform', '')
      .attr('x', width / 2)
      .attr('y', height / 2);

    // step 1

    select('.class-count.a').transition().duration(transitionSpeed).attr('opacity', 1);

    // step 2

    select('.class-count.a')
      .transition()
      .duration(transitionSpeed)
      .delay(transitionSpeed)
      .attr('y', height / 3);

    select('.class-count.b')
      .transition()
      .duration(transitionSpeed)
      .delay(transitionSpeed)
      .attr('opacity', 1);

    // step 3

    select('.class-count.b')
      .transition()
      .duration(transitionSpeed)
      .delay(transitionSpeed * 2)
      .attr('x', width / 5 + 45);

    select('.class-count.c')
      .transition()
      .duration(transitionSpeed)
      .delay(transitionSpeed * 2)
      .attr('x', (width * 4) / 5 - 45)
      .attr('opacity', 1)
      .on('end', () => this.setState({ state: 1 }));
  };

  showFromBottom = () => {
    selectAll('.class-count')
      .transition()
      .duration(600)
      .attr('opacity', 1)
      .on('end', () => this.setState({ state: 1 }));
  };

  hideFromTop = () => {
    selectAll('.class-count')
      .transition()
      .duration(600)
      .attr('opacity', 0)
      .on('end', () => this.setState({ state: 0 }));
  };

  hideFromBottom = () => {
    selectAll('.class-count')
      .transition()
      .duration(600)
      .attr('opacity', 0)
      .on('end', () => this.setState({ state: 2 }));
  };

  hide = () => {
    selectAll('.class-count')
      .transition()
      .duration(600)
      .attr('opacity', 0)
      .on('end', () => this.setState({ opacity: 0 }));
  };

  get aProps(): Object {
    const { width, height } = this.props;
    const { state } = this.state;
    return {
      x: width / 2,
      y: state === 0 ? height / 2 : height / 3,
      opacity: state === 1 ? 1 : 0,
    };
  }

  get bProps(): Object {
    const { width, height } = this.props;
    const { state } = this.state;
    return {
      x: state === 0 ? width / 2 : width / 5 + 45,
      y: height / 3 + height / 5,
      opacity: state === 1 ? 1 : 0,
    };
  }

  get cProps(): Object {
    const { width, height } = this.props;
    const { state } = this.state;
    return {
      x: state === 0 ? width / 2 : (width * 4) / 5 - 45,
      y: height / 3 + height / 5,
      opacity: state === 1 ? 1 : 0,
    };
  }

  render() {
    const {
      classCount: { count, monthCount, averagePerMonth },
    } = this.context;

    return (
      <>
        <A className="class-count a" {...this.aProps}>
          {count} classes
        </A>
        <B className="class-count b" {...this.bProps}>
          {monthCount} months
        </B>
        <C className="class-count c" {...this.cProps}>
          {averagePerMonth} / month
        </C>
      </>
    );
  }
}

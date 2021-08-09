import React from 'react';
import { select, selectAll } from 'd3-selection';

import { BookingHistoryContext } from '../../context/BookingHistory';
import Sections from '../Sections';
import Scroller from '../../Scroller';
import MortimerStreetRideVis from './MortimerStreetRideVis';

import * as Styles from './Visualisations.styles';

type State1 = any;

export default class Visualisations extends React.Component<{}, State1> {
  static contextType = BookingHistoryContext;

  props: any;
  scroller: any;
  setState: any;

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'State'.
  state: State = {
    activeIndex: -1,
    progress: 0,
  };

  componentDidMount() {
    this.setupScroller();
  }

  // componentDidUpdate(_, prevState) {
  //   const { loaded } = this.state;
  //   if (loaded !== prevState.loaded) {
  //     this.scroller.scroll(selectAll('#step'));
  //   }
  // }

  setupScroller = () => {
    // setup scroll functionality
    this.scroller = new Scroller();
    this.scroller.scrollContainer(select('#graphic'));

    // pass in .step selection as the steps
    this.scroller.scroll(selectAll('#step'));

    // setup event handling
    this.scroller.on('active', (index: any) => {
      // activate current section
      // plot.activate(index);
      this.setState({ activeIndex: index });
    });

    this.scroller.on('progress', (index: any, progress: any) => {
      // plot.update(index, progress);
      this.setState({ activeIndex: index, progress });
    });
  };

  get svgWidth() {
    const {
      width,
      margin: { left, right },
    } = this.props;
    return width + left + right;
  }

  get svgHeight() {
    const {
      height,
      margin: { top, bottom },
    } = this.props;
    return height + top + bottom;
  }

  get groupTransform() {
    const {
      margin: { left, top },
    } = this.props;
    return `translate(${left}, ${top})`;
  }

  render() {
    const { width, height } = this.props;
    const { activeIndex, progress } = this.state;

    return (
      <Styles.Container className="container">
        <Styles.Graphic id="graphic">
          <Sections activeIndex={activeIndex} progress={progress} />
          <Styles.VisGroup index={0} activeIndex={activeIndex}>
            <Styles.Visualisations id="vis">
              <svg width={this.svgWidth} height={this.svgHeight}>
                <g transform={this.groupTransform}>
                  <MortimerStreetRideVis
                    width={width}
                    height={height}
                    svgWidth={this.svgWidth}
                    svgHeight={this.svgHeight}
                    activeIndex={activeIndex}
                    progress={progress}
                  />
                </g>
              </svg>
            </Styles.Visualisations>
          </Styles.VisGroup>
          <Styles.ExtraSpace id="extra-space" />
        </Styles.Graphic>
      </Styles.Container>
    );
  }
}

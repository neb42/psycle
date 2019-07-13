// @flow

import React from 'react';
import { select, selectAll } from 'd3-selection';
import { ThemeProvider, defaultTokens } from '@faculty/adler-tokens';

import Sections from './components/Sections';
import Visualisations from './components/Visualisations';
import Scroller from './Scroller';
import { BookingHistoryProvider } from './context/BookingHistory';
import Data from './Data';

import * as Styles from './App.styles';

type State = {
  bookingHistory: Array<*>,
};

export default class App extends React.Component<*, State> {
  state: State = {
    data: {},
    instructors: [],
    activeIndex: 0,
    progress: 0,
    loaded: false,
  };
  scroller: Scroller;

  width = 600;
  height = 520;
  margin = { top: 0, left: 30, bottom: 40, right: 10 };

  componentDidMount() {
    this.setupScroller();
  }

  componentDidUpdate(_, prevState) {
    const { loaded } = this.state;
    if (loaded !== prevState.loaded) {
     this.scroller.scroll(selectAll('#step'));
    }
  }

  setupScroller = () => {
    // setup scroll functionality
    this.scroller = new Scroller();
    this.scroller.scrollContainer(select('#graphic'));

    // pass in .step selection as the steps
    this.scroller.scroll(selectAll('#step'));

    // setup event handling
    this.scroller.on('active', index => {
      // activate current section
      // plot.activate(index);
      this.setState({ activeIndex: index });
    });

    this.scroller.on('progress', (index, progress) => {
      // plot.update(index, progress);
      this.setState({ activeIndex: index, progress });
    });
  }

  setData = (bookingHistory, instructors) => {
    this.setState({
      data: Data({
        bookingHistory,
        height: this.height, // - this.margin.top - this.margin.bottom,
        width: this.width, // - this.margin.left - this.margin.right,
      }),
      instructors,
      loaded: true,
    });
  }

  render() {
    const { data, instructors, activeIndex, progress, loaded } = this.state;

    const context = {
      ...data,
      instructors,
      loaded,
      setData: this.setData,
    };

    return (
      <ThemeProvider theme={defaultTokens}>
        <BookingHistoryProvider value={context}>
          <Styles.Container className="container">
            <Styles.Graphic id="graphic">
              <Sections activeIndex={activeIndex} progress={progress} />
              <Visualisations
                activeIndex={activeIndex}
                progress={progress}
                width={this.width}
                height={this.height}
                margin={this.margin}
              />
              {loaded && <Styles.ExtraSpace id="extra-space" />}
            </Styles.Graphic>
          </Styles.Container>
        </BookingHistoryProvider>
      </ThemeProvider>
    );
  }
}

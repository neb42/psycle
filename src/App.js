// @flow

import React from 'react';
import { ThemeProvider, defaultTokens } from '@faculty/adler-tokens';

import Banner from './components/Banner';
import Visualisations from './components/Visualisations';
import { BookingHistoryProvider } from './context/BookingHistory';
import Data from './Data';

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
  };

  render() {
    const { data, instructors, loaded } = this.state;

    const context = {
      ...data,
      instructors,
      loaded,
      setData: this.setData,
    };

    return (
      <ThemeProvider theme={defaultTokens}>
        <BookingHistoryProvider value={context}>
          <Banner />
          {loaded && (
            <Visualisations
              width={this.width}
              height={this.height}
              margin={this.margin}
            />
          )}
        </BookingHistoryProvider>
      </ThemeProvider>
    );
  }
}

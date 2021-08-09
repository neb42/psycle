// @flow

import React from 'react';
import { ThemeProvider, defaultTokens } from '@faculty/adler-tokens';

import Banner from './components/Banner';
import Visualisations from './components/Visualisations';
import { BookingHistoryProvider, BookingHistoryConsumer } from './context/BookingHistory';
import Data from './Data';

type State = {
  bookingHistory: Array<*>,
};

export default class App extends React.Component<*, State> {
  state: State = {
    bookingHistory: [],
    instructors: [],
    filters: {
      location: 'mortimer st',
      classType: 'ride',
    },
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
      bookingHistory,
      instructors,
      loaded: true,
    });
  };

  setLocationFilter = (location) => {
    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        location,
      },
    }));
  }

  setClassTypeFilter = (classType) => {
    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        classType,
      },
    }));
  }

  render() {
    const { instructors, bookingHistory, filters, loaded } = this.state;

    const filteredBookingHistory = bookingHistory.filter(bh => 
      (filters.location === 'all' || filters.location === bh.location)
      && (filters.classType === 'all' || filters.classType === bh.classType)
    )
    const context = {
      ...Data({
        bookingHistory: filteredBookingHistory,
        height: this.height, // - this.margin.top - this.margin.bottom,
        width: this.width, // - this.margin.left - this.margin.right,
      }),
      filters,
      instructors,
      loaded,
      bookingHistory: filteredBookingHistory,
      setData: this.setData,
      setLocationFilter: this.setLocationFilter,
      setClassTypeFilter: this.setClassTypeFilter,
    };

    return (
      <ThemeProvider theme={defaultTokens}>
        <BookingHistoryProvider value={context}>
          <BookingHistoryConsumer>
            {({ loaded: l }) => (
              <React.Fragment>
                <Banner />
                {l && (
                  <Visualisations
                    width={this.width}
                    height={this.height}
                    margin={this.margin}
                  />
                )}
              </React.Fragment>
            )}
          </BookingHistoryConsumer>
        </BookingHistoryProvider>
      </ThemeProvider>
    );
  }
}

// @flow

import React from 'react';
import { select, selectAll } from 'd3-selection';
import { ThemeProvider, defaultTokens } from '@faculty/adler-tokens';

import Sections from './components/Sections';
import Visualisations from './components/Visualisations';
import Scroller from './Scroller';
import { BookingHistoryProvider } from './context/BookingHistory';

import * as Styles from './App.styles';

type State = {
  bookingHistory: Array<*>,
};

export default class App extends React.Component<*, State> {
  state: State = {
    bookingHistory: [],
    instructors: [],
    activeIndex: 0,
    progress: 0,
    loaded: false,
  };
  scroller: Scroller;

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
    this.setState({ bookingHistory, instructors, loaded: true });
  }

  get fakeBookingHistory() {
    return [
      {
        date: '2019-06-14T18:30:00',
        classType: 'ride',
        location: 'mortimer',
        instructor: 'alana',
        bike: 29,
      },
      {
        date: '2019-06-14T18:30:00',
        classType: 'ride',
        location: 'mortimer',
        instructor: 'alana',
        bike: 29,
      },
      {
        date: '2019-06-14T18:30:00',
        classType: 'ride',
        location: 'mortimer',
        instructor: 'alana',
        bike: 29,
      },
      {
        date: '2019-06-14T10:30:00',
        classType: 'ride',
        location: 'mortimer',
        instructor: 'sunny',
        bike: 29,
      },
      {
        date: '2019-04-15T18:30:00',
        classType: 'ride',
        location: 'mortimer',
        instructor: 'sunny',
        bike: 43,
      },
      {
        date: '2019-04-15T18:30:00',
        classType: 'ride',
        location: 'mortimer',
        instructor: 'sunny',
        bike: 43,
      },
      {
        date: '2019-04-15T18:30:00',
        classType: 'ride',
        location: 'mortimer',
        instructor: 'sunny',
        bike: 43,
      },
      {
        date: '2019-04-15T18:30:00',
        classType: 'ride',
        location: 'mortimer',
        instructor: 'sunny',
        bike: 43,
      },
      {
        date: '2019-04-15T18:30:00',
        classType: 'ride',
        location: 'mortimer',
        instructor: 'sunny',
        bike: 43,
      },
      {
        date: '2019-04-15T18:30:00',
        classType: 'ride',
        location: 'mortimer',
        instructor: 'sunny',
        bike: 43,
      },
      {
        date: '2019-04-15T18:30:00',
        classType: 'ride',
        location: 'mortimer',
        instructor: 'sunny',
        bike: 43,
      },
      {
        date: '2019-04-15T18:30:00',
        classType: 'ride',
        location: 'mortimer',
        instructor: 'sunny',
        bike: 43,
      },
      {
        date: '2019-04-15T18:30:00',
        classType: 'ride',
        location: 'mortimer',
        instructor: 'sunny',
        bike: 43,
      },
      {
        date: '2019-04-15T18:30:00',
        classType: 'ride',
        location: 'mortimer',
        instructor: 'sunny',
        bike: 43,
      },
      {
        date: '2019-04-15T18:30:00',
        classType: 'ride',
        location: 'mortimer',
        instructor: 'sunny',
        bike: 43,
      },
      {
        date: '2019-04-15T18:30:00',
        classType: 'ride',
        location: 'mortimer',
        instructor: 'sunny',
        bike: 43,
      },
      {
        date: '2019-04-15T18:30:00',
        classType: 'ride',
        location: 'mortimer',
        instructor: 'sunny',
        bike: 43,
      },
      {
        date: '2019-04-15T18:30:00',
        classType: 'ride',
        location: 'mortimer',
        instructor: 'sunny',
        bike: 43,
      },
      {
        date: '2019-04-15T18:30:00',
        classType: 'ride',
        location: 'mortimer',
        instructor: 'sunny',
        bike: 43,
      },
      {
        date: '2019-04-15T18:30:00',
        classType: 'ride',
        location: 'mortimer',
        instructor: 'sunny',
        bike: 43,
      },
      {
        date: '2019-04-15T18:30:00',
        classType: 'ride',
        location: 'mortimer',
        instructor: 'sunny',
        bike: 43,
      },
      {
        date: '2019-04-15T18:30:00',
        classType: 'ride',
        location: 'mortimer',
        instructor: 'sunny',
        bike: 43,
      },
      {
        date: '2019-04-15T18:30:00',
        classType: 'ride',
        location: 'mortimer',
        instructor: 'sunny',
        bike: 43,
      },
      {
        date: '2019-04-15T18:30:00',
        classType: 'ride',
        location: 'mortimer',
        instructor: 'sunny',
        bike: 43,
      },
      {
        date: '2019-04-15T18:30:00',
        classType: 'ride',
        location: 'mortimer',
        instructor: 'sunny',
        bike: 43,
      },
      {
        date: '2019-04-15T18:30:00',
        classType: 'ride',
        location: 'mortimer',
        instructor: 'felix',
        bike: 18,
      },
      {
        date: '2019-04-15T18:30:00',
        classType: 'ride',
        location: 'mortimer',
        instructor: 'felix',
        bike: 18,
      },
    ];
  }

  render() {
    const { bookingHistory, instructors, activeIndex, progress, loaded } = this.state;

    const context = {
      bookingHistory,
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
                width={600}
                height={520}
                margin={{ top: 0, left: 30, bottom: 40, right: 10 }}
              />
              {loaded && <Styles.ExtraSpace id="extra-space" />}
            </Styles.Graphic>
          </Styles.Container>
        </BookingHistoryProvider>
      </ThemeProvider>
    );
  }
}

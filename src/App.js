// @flow

import React from 'react';
import { Spinner } from '@asidatascience/adler-ui';

import { BookingHistoryProvider, BookingHistoryConsumer } from './context/BookingHistory';
import Request from './helpers/Request';
import Login from './pages/Login';
import InstructorCount from './components/Charts/InstructorCount';


type State = {
  bookingHistory: Array<*>,
  isFetching: boolean,
  loggedIn: boolean,
};

export default class App extends React.Component<*, State> {
  state: State = {
    bookingHistory: [],
    isFetching: false,
    loggedIn: false,
  };

  handleLogin = async (username: string, password: string) => {
    this.setState({ isFetching: true });
    const bookingHistory = await this.fetchBookingHistory(username, password);
    this.setState({
      bookingHistory,
      isFetching: false,
      loggedIn: true,
    });
  }

  fetchBookingHistory = async (username: string, password: string) => {
    const request = Request.get('/booking-history')
      .setQueryParameters({
         username: {
           value: username,
           type: Request.pass,
         },
         password: {
           value: password,
           type: Request.pass,
         },
       });
    const { bookingHistory } = await request.send();
    return bookingHistory;
  }

  render() {
    const { isFetching, loggedIn, bookingHistory } = this.state;

    if (loggedIn) {
      return (
        <BookingHistoryProvider value={bookingHistory} >
          <BookingHistoryConsumer>
            {context =>
              <InstructorCount bookingHistory={context} width={600} height={400} />
            }
          </BookingHistoryConsumer>
        </BookingHistoryProvider>
      );
    }

    if (isFetching) {
      return <Spinner />;
    }

    return (
      <Login onLogin={this.handleLogin} />
    );
  }
}

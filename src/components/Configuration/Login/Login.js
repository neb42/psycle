// @flow

import React from 'react';
import axios from 'axios';
import { Input, Button } from '@faculty/adler-web-components';

import { BookingHistoryContext } from '../../../context/BookingHistory';
import Spinner from '../../Spinner';

import * as Styles from './Login.styles';

type Props = {
  onLogin: (username: string, password: string) => Promise<void>,
};

type State = {
  username: string,
  password: string,
};

export default class Login extends React.Component<Props, State> {
  state: State = {
    username: '',
    password: '',
    loading: false,
    error: false,
  };

  static contextType = BookingHistoryContext;

  handleUsernameChange = (value: string) => {
    this.setState({ username: value });
  };

  handlePasswordChange = (value: string) => {
    this.setState({ password: value });
  };

  handleSubmit = async (event) => {
    const { username, password } = this.state;
    const { setData } = this.context;

    event.preventDefault();

    try {
      this.setState({ loading: true });
      const [bookingHistory, instructors] = await Promise.all([
        this.fetchBookingHistory(username, password),
        this.fetchInstructors(),
      ]);
      setData(bookingHistory, instructors);
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false, error: true });
    }
  };

  fetchBookingHistory = async (username: string, password: string) => {
    const {
      data: { bookingHistory },
    } = await axios.get(`/booking-history?username=${username}&password=${password}`, {
      headers: {
        'UserAPI-Key': 'qaZ6fkpjjwRgDl77PS4s8bd26IQ3EuZzCgyuAMdxO8SPpllbKo',
      },
    });
    return bookingHistory;
  };

  fetchInstructors = async () => {
    const {
      data: { instructors },
    } = await axios.get('/instructors', {
      headers: {
        'UserAPI-Key': 'qaZ6fkpjjwRgDl77PS4s8bd26IQ3EuZzCgyuAMdxO8SPpllbKo',
      },
    });
    return instructors;
  };

  render() {
    const { activeIndex } = this.props;
    const { username, password, loading, error } = this.state;
    const { loaded } = this.context;

    if (loaded) {
      return null;
    }

    if (loading) {
      return (
        <Styles.SpinnerWrapper>
          <Spinner size={26} thick />
        </Styles.SpinnerWrapper>
      );
    }

    return (
      <Styles.Container visible={activeIndex === 0} onSubmit={this.handleSubmit}>
        <Input
          type="email"
          value={username}
          placeholder="username"
          onChange={this.handleUsernameChange}
        />
        <Input
          type="password"
          value={password}
          placeholder="password"
          onChange={this.handlePasswordChange}
        />
        <Button
          type="submit"
          text="login"
          size={Button.sizes.medium}
          style={Button.styles.filled}
          color={Button.colors.primary}
        />
        {error && <span>error</span>}
      </Styles.Container>
    );
  }
}

// @flow

import React from 'react';
import axios from 'axios';
import { Input, Button } from '@faculty/adler-web-components';

import { BookingHistoryConsumer } from '../../../context/BookingHistory';

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
  };

  handleUsernameChange = (value: string) => {
    this.setState({ username: value });
  }

  handlePasswordChange = (value: string) => {
    this.setState({ password: value });
  }

  handleSubmit = setBookingHistory => async () => {
    const { username, password } = this.state;
    const bookingHistory = await this.fetchBookingHistory(username, password);
    setBookingHistory(bookingHistory);
  };

  fetchBookingHistory = async (username: string, password: string) => {
    const { data: { bookingHistory }} = await axios.get(`/booking-history?username=${username}&password=${password}`, {
      headers: {
        'UserAPI-Key': 'qaZ6fkpjjwRgDl77PS4s8bd26IQ3EuZzCgyuAMdxO8SPpllbKo',
      },
    })
    return bookingHistory;
  }

  render() {
    const { activeIndex } = this.props;
    const { username, password } = this.state;
    return (
      <BookingHistoryConsumer>
        {({ setBookingHistory })=> (
          <Styles.Container visible={activeIndex === 0}>
            <Input type="email" value={username} placeholder="username" onChange={this.handleUsernameChange} />
            <Input type="password" value={password} placeholder="password" onChange={this.handlePasswordChange} />
            <Button
              text="login"
              size={Button.sizes.medium}
              style={Button.styles.filled}
              color={Button.colors.primary}
              onClick={this.handleSubmit(setBookingHistory)}
            />
          </Styles.Container>
        )}
      </BookingHistoryConsumer>
    );
  }
}

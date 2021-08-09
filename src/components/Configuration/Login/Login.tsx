import React from 'react';

import Spinner from '../../Spinner';
import { DataContext } from '../../../context/DataContext';

import * as Styles from './Login.styles';

type Props = {
};

type State = {
  username: string;
  password: string;
};

export default class Login extends React.Component<Props, State> {
  state: State = {
    username: '',
    password: '',
  };

  static contextType = DataContext;

  context: any;

  handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ username: event.target.value });
  };

  handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = async (event: any) => {
    const { username, password } = this.state;
    const { login } = this.context;
    event.preventDefault();
    login(username, password);
  };

  handleFakeData = (event: any) => {
    event.preventDefault();
    // login(username, password);
  };

  render() {
    const { username, password } = this.state;
    const { loaded } = this.context;

    const loading = false;
    const error = false;

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
      <Styles.Container onSubmit={this.handleSubmit}>
        <input
          type="email"
          value={username}
          placeholder="username"
          onChange={this.handleUsernameChange}
        />
        <input
          type="password"
          value={password}
          placeholder="password"
          onChange={this.handlePasswordChange}
        />
        <button type="submit">Login</button>
        <button>Use fake data</button>
        {error && <span>error</span>}
      </Styles.Container>
    );
  }
}

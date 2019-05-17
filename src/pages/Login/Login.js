// @flow

import React from 'react';
import { Input } from '@asidatascience/adler-ui';
import { Button } from '@faculty/adler-web-components';

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

  handleSubmit = () => {
    const { onLogin } = this.props;
    const { username, password } = this.state;
    onLogin(username, password);
  };

  render() {
    const { username, password } = this.state;
    return (
      <Styles.Container>
        <Input type="email" value={username} placeholder="username" onChange={this.handleUsernameChange} />
        <Input type="password" value={password} placeholder="password" onChange={this.handlePasswordChange} />
        <Button
          text="login"
          size={Button.sizes.medium}
          style={Button.styles.filled}
          color={Button.colors.primary}
          onClick={this.handleSubmit}
        />
      </Styles.Container>
    );
  }
}

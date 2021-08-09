import React from 'react';

import { DataContext } from '../../../context/DataContext';
import Login from '../Login';
import Selector from '../Selector';

import * as Styles from './Configuration.styles';

export default class Configuration extends React.Component {
  static contextType = DataContext;

  context: any;

  render() {
    const { loaded } = this.context;
    if (loaded) {
      return <Selector />;
    }

    return <Login />;
  }
}

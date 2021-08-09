import React from 'react';

import { BookingHistoryContext } from '../../../context/BookingHistory';
import Login from '../Login';
import Selector from '../Selector';

import * as Styles from './Configuration.styles';

export default class Configuration extends React.Component {
  static contextType = BookingHistoryContext;

  render() {
    const { loaded } = this.context;
    if (loaded) {
      return <Selector />;
    }

    return <Login />;
  }
}


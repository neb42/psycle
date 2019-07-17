import React from 'react';

import { BookingHistoryContext } from '../../../context/BookingHistory';

import * as Styles from './Selector.styles';

export default class Selector extends React.Component {
  static contextType = BookingHistoryContext;

  render() {
    return (
      <div>
        <div> 
          <button>all</button>
          <button>mortimer st</button>
          <button>shoreditch</button>
          <button>clapham</button>
        </div>
        <div>
          <button>all</button>
          <button>ride</button>
          <button>barre</button>
          <button>strength</button>
          <button>yoga</button>
        </div>
      </div>
    );
  }
}
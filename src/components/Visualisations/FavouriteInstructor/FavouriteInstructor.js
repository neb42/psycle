// @flow

import React from 'react';

import { BookingHistoryContext } from '../../../context/BookingHistory';

export default class FavouriteInstructor extends React.PureComponent {
  static contextType = BookingHistoryContext;

  get photo() {
    const { favouriteInstructorName } = this.props;
    const { instructors } = this.context;
    if (instructors && instructors[favouriteInstructorName]) {
      return instructors[favouriteInstructorName].photo;
    }
    return '';
  }

  render() {
    const { activeIndex, height } = this.props;
    return (
      <img
        alt=""
        style={{
          opacity: activeIndex === 4 ? 1 : 0,
          transition: 'opacity 600ms',
        }}
        src={this.photo}
        width={height}
        height={height}
      />
    );
  }
}

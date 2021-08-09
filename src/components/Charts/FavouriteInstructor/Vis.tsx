import React from 'react';

import { DataContext } from '../../../context/DataContext';

export default class FavouriteInstructor extends React.PureComponent {
  static contextType = DataContext;

  context: any;

  props: any;

  get photo() {
    const {
      instructors,
      favouriteInstructor: { favouriteInstructorName },
    } = this.context;
    if (instructors && instructors[favouriteInstructorName]) {
      return instructors[favouriteInstructorName].photo;
    }
    return '';
  }

  render() {
    const { activeIndex, height, width, startIndex } = this.props;
    return (
      <foreignObject width={width} height={height}>
        <img
          alt=""
          style={{
            opacity: activeIndex === startIndex ? 1 : 0,
            transition: 'opacity 600ms',
          }}
          src={this.photo}
          width={height}
          height={height}
        />
      </foreignObject>
    );
  }
}

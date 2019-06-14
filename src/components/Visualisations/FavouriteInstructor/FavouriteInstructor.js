// @flow

import React from 'react';

export default class FavouriteInstructor extends React.Component {
  render() {
    const { activeIndex, height } = this.props;
    return (
      <img
        alt=""
        style={{
          opacity: activeIndex === 4 ? 1 : 0,
          transition: 'opacity 600ms',
        }}
        src="https://psyclelondon.com/dynamic/thumbs/790x790e/1544127918Alana-Profile.jpg"
        width={height}
        height={height}
      />
    );
  }
}

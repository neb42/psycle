import React from 'react';

import Step from '../Step';
import { BookingHistoryContext } from '../../context/BookingHistory';
import { calendarText } from '../Charts/Calendar';
import { movingAverageText } from '../Charts/MovingAverage';
import { weeklyLollipopText } from '../Charts/WeeklyLollipop';
import { instructorBarsText } from '../Charts/InstructorBars';
import { favouriteInstructorText } from '../Charts/FavouriteInstructor';
import { studioText } from '../Charts/Studio';

import * as Styles from './Sections.styles';

export default class Sections extends React.Component {
  static contextType = BookingHistoryContext;

  get steps() {
    return [
      calendarText(this.context),
      movingAverageText(this.context),
      weeklyLollipopText(this.context),
      instructorBarsText(this.context),
      favouriteInstructorText(this.context),
      ...studioText(this.context),
      {
        title: 'End?',
        content: 'Blah blah',
      },
    ];
  }

  render() {
    const { activeIndex } = this.props;

    return (
      <Styles.Sections id="sections">
        {this.steps.map((s, i) => (
          <Step {...s} isActive={activeIndex === i} />
        ))}
      </Styles.Sections>
    );
  }
}

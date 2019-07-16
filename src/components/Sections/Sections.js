import React from 'react';
import styled from 'styled-components';

import { BookingHistoryContext } from '../../context/BookingHistory';
import Step from '../Step';
import FavouriteInstructor from '../Visualisations/FavouriteInstructor';
import InstructorBars from '../Visualisations/InstructorBars/InstructorBars';

import * as Styles from './Sections.styles';

const PsycleTitle = styled.span`
  font-size: 16px;
  letter-spacing: 0.158em;
  text-transform: uppercase;
  font-family: soin_sans_neueroman, sans-serif;
`;

export default class Sections extends React.Component {
  static contextType = BookingHistoryContext;

  get steps() {
    const {
      loaded,
      classCount,
      favouriteInstructor,
      instructorBars,
      studio,
      weeklyLollipop,
    } = this.context;

    if (!loaded) {
      return [
        {
          title: <PsycleTitle>psycle</PsycleTitle>,
          content: 'Just Ride',
        },
      ];
    }

    return [
      {
        title: <PsycleTitle>psycle</PsycleTitle>,
        content: 'Just Ride',
      },
      {
        title: 'Class count',
        content: `Well done! You've been going to Psycle for ${classCount.monthCount} months and completed ${classCount.count} classes. Keep going.`,
      },
      {
        title: 'Favourite day',
        content: 'Your fave time to go is Tuesday evenings',
      },
      {
        title: 'Instructors',
        content: 'Blah blah blah',
      },
      {
        title: `${this.context.favouriteInstructor.favouriteInstructorName} is your favourite instructor`,
        content: this.context.instructors[
          this.context.favouriteInstructor.favouriteInstructorName
        ].description
          .split('\n\n')
          .map(paragraph => (
            <React.Fragment>
              <span>{paragraph}</span>
              <br />
              <br />
            </React.Fragment>
          )),
      },
      {
        title: 'Studio 1',
        content: 'Blah blah',
      },
      {
        title: 'Studio 1 heatmap',
        content: 'Blah blah',
      },
      {
        title: 'Studio 1 favourite',
        content: 'Blah blah',
      },
      {
        title: 'Studio 2',
        content: 'Blah blah',
      },
      {
        title: 'Studio 2 heatmap',
        content: 'Blah blah',
      },
      {
        title: 'Studio 2 favourite',
        content: 'Blah blah',
      },
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

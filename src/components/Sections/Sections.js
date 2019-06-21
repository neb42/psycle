import React from 'react';
import styled from 'styled-components';

import Step from '../Step';

import * as Styles from './Sections.styles';

const PsycleTitle = styled.span`
  font-size: 16px;
  letter-spacing: .158em;
  text-transform: uppercase;
  font-family: soin_sans_neueroman,sans-serif;
`

const steps = [
  {
    title: <PsycleTitle>psycle</PsycleTitle>,
    content: 'Just Ride',
  },
  {
    title: 'Class count',
    content: '14 rides',
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
    title: 'Fave Instructor',
    content: (
      <React.Fragment>
        <span>
          Alana's fierce attitude gives you both an intense and invigorating experience, challenging you on a physical and mental level. Her infectious charisma and energy pulls you in, and once she has you in the palm of her hand she “makes an individual connection with every single rider" in her class.
        </span>
        <br />
        <br />
        <span>
          Alana takes you on a personal journey so that you "can use what you’ve achieved on the bike in your lives outside the studio”. Her unique mashup of R&B, hip hop, and house music, coupled with nostalgic classics make you feel alive, drip with sweat and leave you feeling like you can do anything!
        </span>
      </React.Fragment>
    ),
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

export default class Sections extends React.Component {
  render() {
    const { activeIndex } = this.props;
    return (
      <Styles.Sections id="sections">
        {steps.map((s, i) => <Step {...s} isActive={activeIndex === i} />)}
      </Styles.Sections>
    );
  }
}

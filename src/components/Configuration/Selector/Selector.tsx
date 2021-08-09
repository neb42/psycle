import React from 'react';

import { DataContext } from '../../../context/DataContext';

import * as Styles from './Selector.styles';

const locations = ['all', 'mortimer st', 'shoreditch', 'clapham', 'the wharf'];

const classTypes = ['all', 'ride', 'barre', 'strength', 'yoga'];

export default class Selector extends React.Component {
  static contextType = DataContext;

  context: any;

  handleLocationChange = (location: any) => () => {
    const { setLocationFilter } = this.context;
    setLocationFilter(location);
  };

  handleClassTypeChange = (classType: any) => () => {
    const { setClassTypeFilter } = this.context;
    setClassTypeFilter(classType);
  };

  render() {
    const {
      filters: { location: currentLocation, classType: currentClassType },
    } = this.context;

    return (
      <Styles.Container>
        <Styles.Locations>
          {locations.map((l) => (
            <Styles.Button disabled={l !== 'mortimer st'} active={l === currentLocation}>
              {l}
            </Styles.Button>
          ))}
        </Styles.Locations>
        <Styles.ClassTypes>
          {classTypes.map((c) => (
            <Styles.Button disabled={c !== 'ride'} active={c === currentClassType}>
              {c}
            </Styles.Button>
          ))}
        </Styles.ClassTypes>
      </Styles.Container>
    );
  }
}

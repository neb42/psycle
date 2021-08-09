import React from 'react';

import Configuration from '../Configuration';

import * as Styles from './Banner.styles';

const Banner = () => (
  <Styles.Container>  
    <Styles.Image src="https://psyclelondon.com/static/images/psycle-hero-1.jpg" />
    <Styles.Content>
      <Styles.Text> 
        <Styles.Title>Psycle Data Exploration</Styles.Title>
      </Styles.Text>
      <Configuration />
    </Styles.Content>
  </Styles.Container>
);

export default Banner;
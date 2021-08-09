import React from 'react';

import * as Styles from './Spinner.styles';

const Spinner = ({ thick = false, size = 14 }) => (
  <Styles.Container>
    <Styles.Wrapper>
      <Styles.Spinner size={size} thick={thick} />
    </Styles.Wrapper>
  </Styles.Container>
);

export default Spinner;

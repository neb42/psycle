import React from 'react';

import Studio from './Studio';
import { getStuido1X, getStuido1Y, getPillarX, getPillarY, bikeCount } from './studio1';
// import studio2 from './studio2';

export const Studio1 = props => <Studio
  {...props}
  hasPillar
  getX={getStuido1X}
  getY={getStuido1Y}
  getPillarX={getPillarX}
  getPillarY={getPillarY}
  bikeCount={bikeCount}
/>;
// export const Studio2 = props => <Studio {...props} {...studio2} />;

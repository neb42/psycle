import classCount from './classCount';
import favouriteInstructor from './favouriteInstructor';
import instructorBars from './instructorBars';
import studio from './studio';
import weeklyLollipop from './weeklyLollipop';

const data = d => ({
  classCount: classCount(d),
  favouriteInstructor: favouriteInstructor(d),
  instructorBars: instructorBars(d),
  studio: studio(d),
  weeklyLollipop: weeklyLollipop(d),
});

export default data;
import calendar from './calendar';
import classCount from './classCount';
import favouriteInstructor from './favouriteInstructor';
import instructorBars from './instructorBars';
import studio from './studio';
import weeklyLollipop from './weeklyLollipop';
import movingAverage from './movingAverage';

const data = (d: any) => ({
  calendar: calendar(d),
  classCount: classCount(d),
  favouriteInstructor: favouriteInstructor(d),
  instructorBars: instructorBars(d),
  studio: studio(d),
  weeklyLollipop: weeklyLollipop(d),
  movingAverage: movingAverage(d)
});

export default data;

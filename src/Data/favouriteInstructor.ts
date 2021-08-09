const favouriteInstructorName = (bookingHistory: any) => {
  const favouriteInstructor = bookingHistory.sort(
    (a: any, b: any) =>
      bookingHistory.filter((v: any) => v.instructor === a.instructor).length -
      bookingHistory.filter((v: any) => v.instructor === b.instructor).length,
  )[bookingHistory.length - 1];

  return favouriteInstructor ? favouriteInstructor.instructor.toLowerCase() : '';
};

const data = ({ bookingHistory, width, height }: any) => ({
  favouriteInstructorName: favouriteInstructorName(bookingHistory),
});

export default data;

const favouriteInstructorName = bookingHistory => {
  return bookingHistory
    .sort(
      (a, b) =>
        bookingHistory.filter(v => v.instructor === a.instructor).length -
        bookingHistory.filter(v => v.instructor === b.instructor).length,
    )
    [bookingHistory.length - 1].instructor.toLowerCase();
};

const data = ({ bookingHistory, width, height }) => ({
  favouriteInstructorName: favouriteInstructorName(bookingHistory),
});

export default data;

import React from 'react';

const favouriteInstructorText = (context: any) => {
  const {
    instructors,
    favouriteInstructor: {
      favouriteInstructorName,
    },
  } = context;
  const title = `${favouriteInstructorName} is your favourite instructor`;
  const content = instructors[favouriteInstructorName].description
    .split('\n\n')
    .map((paragraph: any) => <React.Fragment>
    <span>{paragraph}</span>
    <br />
    <br />
  </React.Fragment>);

  return {
    title,
    content,
  };
};

export default favouriteInstructorText;
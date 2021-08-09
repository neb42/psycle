const calendarText = (context: any) => {
  const {
    classCount: {
      count,
      monthCount,
    },
  } = context;

  const title = 'Your timeline';
  const content = `Well done! You've been going to Psycle for ${monthCount} months and completed ${count} classes. Keep going.`;

  return {
    title,
    content,
  };
};

export default calendarText;
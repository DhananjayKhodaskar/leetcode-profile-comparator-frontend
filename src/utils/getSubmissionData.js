export const getLast24hSubmission = (submissions) => {
  const currentTimestamp = Math.floor(Date.now() / 1000);

  const oneDayInSeconds = 24 * 60 * 60;
  const submittedInLast24Hours = submissions.submission.filter((submission) => {
    const submissionTimestamp = parseInt(submission.timestamp);
    return currentTimestamp - submissionTimestamp <= oneDayInSeconds;
  });

  return {
    submissions: submittedInLast24Hours,
    username: submissions.username,
  };
};

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

export const calculateStreaks = (data) => {
  
  const submissionCalendar = JSON.parse(data.submissionCalendar);

  
  const dates = Object.keys(submissionCalendar)
    .map((timestamp) => {
      return new Date(timestamp * 1000).toISOString().split("T")[0]; 
    })
    .sort(); 

  let longestStreak = 0;
  let currentStreak = 0;
  let previousDate = null;

  
  if (dates.length === 0) {
    return { longestStreak, currentStreak };
  }

  dates.forEach((date) => {
    const currentDate = new Date(date);

    if (previousDate === null) {
      currentStreak = 1; 
    } else {
      const diff = (currentDate - previousDate) / (1000 * 60 * 60 * 24);
      if (diff === 1) {
        currentStreak++; 
      } else {
        
        currentStreak = 1; 
      }
    }
    longestStreak = Math.max(longestStreak, currentStreak); 
    previousDate = currentDate; 
  });

  
  const today = new Date();
  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(today.getDate() - 2);
  
  const lastSubmissionDate = new Date(dates[dates.length - 1]);

  
  if (lastSubmissionDate < twoDaysAgo) {
    currentStreak = 0; 
  }

  return { longestStreak, currentStreak }; 
};


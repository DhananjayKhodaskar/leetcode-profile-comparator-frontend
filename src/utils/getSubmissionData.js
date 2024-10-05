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
  const dateData = {}; // Initialize an object to hold the submission status

  // Populate the dateData with submission status
  dates.forEach((date) => {
    dateData[date] = true; // Mark the date as true for submission
  });

  // Fill in the dateData for all dates, including those without submissions
  const startDate = new Date(dates[0]);
  const endDate = new Date();

  for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
    const dateString = d.toISOString().split("T")[0];
    if (!dateData[dateString]) {
      dateData[dateString] = false; // Mark the date as false if no submission
    }
  }

  if (dates.length === 0) {
    return { longestStreak, currentStreak, dateData };
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

  return { longestStreak, currentStreak, dateData };
};

export const getLast365Days = (forTooltip = false) => {
  const dates = [];
  const today = new Date();

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  for (let i = 0; i < 365; i++) {
    const currentDate = new Date();
    currentDate.setDate(today.getDate() - i);

    if (forTooltip) {
      const day = currentDate.getDate();
      const month = monthNames[currentDate.getMonth()];
      const year = currentDate.getFullYear();
      dates.push(`${month} ${day}, ${year}`);
    } else {
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");
      dates.push(`${year}-${month}-${day}`);
    }
  }

  return dates.reverse();
};

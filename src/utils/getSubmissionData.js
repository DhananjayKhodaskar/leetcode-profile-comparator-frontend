import { FOR_THE } from "./common";

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

export const getLastDaysByMonth = (
  forThe = "",
  startDate = new Date(), // Optional start date (defaults to today)
  daysToRetrieve = 365 // Optional number of days to retrieve (defaults to 365)
) => {
  const months = []; // Array to hold arrays for each month
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

  let currentDate = new Date(startDate);
  let totalDaysCounted = 0; // Keep track of total days processed

  // Helper function to push formatted dates into the appropriate array
  const formatAndPushDate = (date, arr) => {
    if (forThe === FOR_THE.TOOLTIP) {
      const day = date.getDate();
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();
      arr.push(`${month} ${day}, ${year}`);
    } else if (!forThe) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      arr.push(`${year}-${month}-${day}`);
    }
  };

  // Continue adding dates until the specified number of days are processed
  while (totalDaysCounted < daysToRetrieve) {
    const monthArray = [];
    const currentMonth = currentDate.getMonth();
    const daysInCurrentMonth = new Date(
      currentDate.getFullYear(),
      currentMonth + 1,
      0
    ).getDate();

    let daysToProcess = Math.min(
      daysInCurrentMonth,
      daysToRetrieve - totalDaysCounted // Limit to remaining days if partial month
    );

    // Adjust for the first month if it’s the start month (it might be partial)
    if (months.length === 0) {
      daysToProcess = Math.min(currentDate.getDate(), daysToProcess);
    }

    // Collect dates for the current month
    for (
      let day = daysToProcess;
      day > 0 && totalDaysCounted < daysToRetrieve;
      day--
    ) {
      formatAndPushDate(currentDate, monthArray);
      currentDate.setDate(currentDate.getDate() - 1);
      totalDaysCounted++;
    }

    // Push the month name once for FOR_THE.MONTH_DISPLAY
    if (forThe === FOR_THE.MONTH_DISPLAY) {
      months.push(monthNames[currentMonth]);
    } else {
      months.push(monthArray); // Add the month array to the result
    }
  }

  return months;
};

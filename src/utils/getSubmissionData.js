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

export const getRecentSubmission = (submissions, days = 7) => {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const daysInSeconds = 24 * 60 * 60 * days;

  const recentSubmissions = submissions.flatMap((user) =>
    user.submission
      .map((submission) => ({
        title: submission.title,
        titleSlug: submission.titleSlug,
        timestamp: submission.timestamp,
        statusDisplay: submission.statusDisplay,
        lang: submission.lang,
        username: user.username,
      }))
      .filter((submission) => {
        const submissionTimestamp = parseInt(submission.timestamp);
        return currentTimestamp - submissionTimestamp <= daysInSeconds;
      })
  );

  // Sort and slice the final collection
  return recentSubmissions
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 40);
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
  const dateData = {};

  dates.forEach((date) => {
    dateData[date] = true;
  });

  const startDate = new Date(dates[0]);
  const endDate = new Date();

  for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
    const dateString = d.toISOString().split("T")[0];
    if (!dateData[dateString]) {
      dateData[dateString] = false;
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
  startDate = new Date(),
  daysToRetrieve = 365
) => {
  const months = [];
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
  let totalDaysCounted = 0;

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
      daysToRetrieve - totalDaysCounted
    );

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

    // Reverse the month array to push dates from earliest to latest
    monthArray.reverse();

    // Push the month name once for FOR_THE.MONTH_DISPLAY
    if (forThe === FOR_THE.MONTH_DISPLAY) {
      months.push(monthNames[currentMonth]);
    } else {
      months.push(monthArray); // Add the month array to the result
    }
  }

  return months;
};
export const getProblemNameFromSlug = (input) =>
  input
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export const formatTimestamp = (timestamp) => {
  // Create a Date object from the ISO 8601 date string
  const date = new Date(timestamp);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return "Invalid Date"; // Return an error message for invalid date
  }

  const now = Date.now();
  const diff = now - date.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (seconds < 60) {
    return `${seconds} sec${seconds !== 1 ? "s" : ""} ago`;
  } else if (minutes < 60) {
    return `${minutes} min${minutes !== 1 ? "s" : ""} ago`;
  } else if (hours < 24) {
    return `${hours} hr${hours !== 1 ? "s" : ""} ago`;
  } else if (days === 1) {
    return `Yesterday`;
  } else if (days < 7) {
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  } else if (date.toDateString() === new Date().toDateString()) {
    return `Today at ${date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  } else {
    return date.toLocaleDateString();
  }
};

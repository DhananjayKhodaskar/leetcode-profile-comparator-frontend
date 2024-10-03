export const transformData = ({ contests, usernames }) => {
  const series = [];

  // Loop through usernames and contests to create series
  for (let i = 0; i < usernames.length; i++) {
    const seriesItem = {
      name: usernames[i],
      data: [...contests[i]?.contestParticipation] || [], // Default to an empty array if undefined
    };

    series.push(seriesItem);
  }

  // Return the transformed data in the desired format
  return series;
};

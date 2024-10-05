export const transformData = ({ contests, usernames }) => {
  const series = [];

  for (let i = 0; i < usernames.length; i++) {
    const seriesItem = {
      name: usernames[i],
      data: [...contests[i]?.contestParticipation] || [],
    };

    series.push(seriesItem);
  }

  return series;
};

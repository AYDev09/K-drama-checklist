import React from 'react';

const Stats = ({ dramas }) => {
  const totalKdramas = dramas.length;
  const completedKdramas = dramas.filter(drama => drama.episodesWatched >= drama.totalEpisodes).length;
  const currentlyWatching = dramas.filter(drama => drama.episodesWatched < drama.totalEpisodes).length;
  const totalEpisodesWatched = dramas.reduce((acc, drama) => acc + drama.episodesWatched, 0);

  return (
    <div id="stats">
      <h2>Statistics</h2>
      <p>Total K-Dramas: {totalKdramas}</p>
      <p>Completed K-Dramas: {completedKdramas}</p>
      <p>Currently Watching: {totalKdramas-completedKdramas}</p>
      <p>Total Episodes Watched: {totalEpisodesWatched}</p>
    </div>
  );
};

export default Stats;

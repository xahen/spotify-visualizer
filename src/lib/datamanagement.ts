export const sortSongByListens = (songs: any) => {
  const sortedSongs = Object.entries(songs).sort(
    ([, a], [, b]) => b.times_listened - a.times_listened
  );

  return sortedSongs;
};

export const sortArtistByListens = (artists: any) => {
  const sortedSongs = Object.entries(artists).sort(
    ([, a], [, b]) => b.songs_played - a.songs_played
  );

  return sortedSongs;
};

export const totalTimeListened = (songs: any) => {
  let timeListened = 0;
  Object.entries(songs).forEach(([, data]: [string, any]) => {
    timeListened += data.ms_listened;
  });

  return timeListened;
};

type Artist = {
  name: string;
  songs_played: number;
  ms_listened: number;
  times_skipped: number;
};

type ArtistList = {
  [key: string]: Artist;
};

type Song = {
  name: string;
  artist: string;
  times_listened: number;
  ms_listened: number;
  times_skipped: number;
};

type SongList = {
  [key: string]: Song;
};

export const processData = (
  songs: SongList,
  artists: ArtistList,
  jsonContents: any
) => {
  Object.entries(jsonContents).forEach(([filename, data]: [string, any]) => {
    for (const entry of data) {
      let songName = entry["master_metadata_track_name"];
      let artistName = entry["master_metadata_album_artist_name"];
      let idName = artistName + " - " + songName;

      if (songName !== null && artistName !== null) {
        if (idName in songs) {
          songs[idName].ms_listened += entry["ms_played"];
          songs[idName].times_listened += 1;
          if (entry["skipped"]) {
            songs[idName].times_skipped += 1;
          }
        } else {
          songs[idName] = {
            name: songName,
            artist: artistName,
            times_listened: 1,
            ms_listened: entry["ms_played"],
            times_skipped: entry["skipped"] ? 1 : 0,
          };
        }

        if (artistName in artists) {
          artists[artistName].ms_listened += entry["ms_played"];
          artists[artistName].songs_played += 1;
          if (entry["skipped"]) {
            artists[artistName].times_skipped += 1;
          }
        } else {
          artists[artistName] = {
            name: artistName,
            songs_played: 1,
            ms_listened: entry["ms_played"],
            times_skipped: entry["skipped"] ? 1 : 0,
          };
        }
      }
    }
  });

  /*
    const sortedSongs = Object.fromEntries(
        Object.entries(songs).sort(
            (a: [string, Song], b: [string, Song]) =>
                b[1].times_listened - a[1].times_listened
        )
    ) as SongList;
    
  Object.entries(sortedSongs).forEach(([key, value]: [string, Song]) => {
    console.log(value);
  });

    Object.entries(artists).forEach(([key, value]) => {
      console.log(value);
    });
  */
};

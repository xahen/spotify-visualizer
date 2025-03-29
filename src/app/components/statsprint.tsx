"use client";

import { useAppContext } from "@/context/AppContext";

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

const sortSongByListens = (songs: any) => {
  const sortedSongs = Object.entries(songs).sort(
    ([, a], [, b]) => b.times_listened - a.times_listened
  );

  return sortedSongs;
};

const sortArtistByListens = (songs: any) => {
  const sortedSongs = Object.entries(songs).sort(
    ([, a], [, b]) => b.songs_played - a.songs_played
  );

  return sortedSongs;
};

export const StatsPrint = () => {
  const { songData, artistData } = useAppContext();

  const sortedByListens = sortSongByListens(songData);
  const artistByListens = sortArtistByListens(artistData);

  return (
    <div className="m-auto">
      <div className="flex mt-4">
        <div className="ml-25">
          <div>
            <h2 className="text-3xl">top songs</h2>
          </div>
          <div className="mt-2">
            {sortedByListens.map((song) => (
              <p className="ml-4 text-base" key={song[0]}>
                {song[1].artist} - {song[1].name} ({song[1].times_listened})
              </p>
            ))}
          </div>
        </div>
        <div className="mr-25">
          <div>
            <h2 className="text-3xl">top artists</h2>
          </div>
          <div className="mt-2">
            {artistByListens.map((artist) => (
              <p className="ml-4 text-base" key={artist[0]}>
                {artist[1].name} ({artist[1].songs_played})
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

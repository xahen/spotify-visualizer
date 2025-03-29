"use client";

import { useAppContext } from "@/context/AppContext";
import {
  sortSongByListens,
  sortArtistByListens,
  totalTimeListened,
} from "@/lib/datamanagement";

export const StatsOverview = () => {
  const { songData, artistData } = useAppContext();
  const sortedSongs = sortSongByListens(songData);
  const sortedArtists = sortArtistByListens(artistData);
  const years = totalTimeListened(songData);

  // summary cards
  // 2 at the top? - top songs and top artists
  return (
    // top summary cards
    <>
      <section className="flex flex-row m-auto">
        {/* top songs */}
        <div className="bg-gray-500 m-4 p-2 w-[40vw] h-[35vh] rounded-3xl overflow-hidden">
          <div>
            <h1 className="text-2xl text-center">Your top songs</h1>
          </div>
          <div className="mt-4 ml-4">
            <ul className="list-decimal list-inside">
              {sortedSongs.slice(0, 10).map((song) => (
                <li key={song[0]}>
                  {song[1].artist} - {song[1].name} ({song[1].times_listened})
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* top artists */}
        <div className="bg-gray-500 m-4 p-2 w-[40vw] h-[35vh] rounded-3xl overflow-hidden">
          <div>
            <h1 className="text-2xl text-center">Your top artists</h1>
          </div>
          <div className="mt-4 ml-4">
            <ul className="list-decimal list-inside">
              {sortedArtists.slice(0, 10).map((artist) => (
                <li key={artist[0]}>
                  {artist[1].name} ({artist[1].songs_played})
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="flex m-auto">
        <div className="bg-gray-500 m-4 p-2 w-[82vw] h-[30vh] rounded-3xl">
          {years} years
        </div>
      </section>
    </>
  );
};

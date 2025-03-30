"use client";

import { useAppContext } from "@/context/AppContext";
import {
  sortSongByListens,
  sortArtistByListens,
  totalTimeListened,
} from "@/lib/datamanagement";

import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

export const StatsOverview = () => {
  const { songData, artistData } = useAppContext();
  const sortedSongs = sortSongByListens(songData);
  const sortedArtists = sortArtistByListens(artistData);
  const [years, days, hours, minutes, seconds] = totalTimeListened(songData);

  // summary cards
  // 2 at the top? - top songs and top artists
  return (
    // top summary cards
    <>
      <section className="flex flex-row m-auto">
        {/* top songs */}
        <div className="bg-gray-500 m-4 p-4 w-[40vw] h-[35vh] rounded-3xl overflow-hidden">
          <h1 className="text-2xl text-center">Your top songs</h1>

          <ul className="mt-4 ml-4 list-decimal list-inside">
            {sortedSongs.slice(0, 10).map((song) => (
              <li key={song[0]}>
                {song[1].artist} - {song[1].name} ({song[1].times_listened})
              </li>
            ))}
          </ul>
        </div>

        {/* top artists */}
        <div className="bg-gray-500 m-4 p-4 w-[40vw] h-[35vh] rounded-3xl overflow-hidden">
          <h1 className="text-2xl text-center">Your top artists</h1>

          <ul className="mt-4 ml-4 list-decimal list-inside">
            {sortedArtists.slice(0, 10).map((artist) => (
              <li key={artist[0]}>
                {artist[1].name} ({artist[1].songs_played})
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* total listening time */}
      <section className="m-auto bg-gray-500 p-4 w-[82vw] h-[40vh] rounded-3xl">
        <h1 className="text-2xl text-center">Your total listening time</h1>
        <h2 className="text-lg">
          {years > 0 ? (years > 1 ? years + " years" : years + " year") : null}{" "}
          {days > 0 ? (days > 1 ? days + " days" : days + " day") : null}{" "}
          {hours > 0 ? (hours > 1 ? hours + " hours" : hours + " hour") : null}{" "}
          {minutes > 0
            ? minutes > 1
              ? minutes + " minutes"
              : minutes + " minute"
            : null}{" "}
          {seconds > 0
            ? seconds > 1
              ? seconds + " seconds"
              : seconds + " second"
            : null}
        </h2>
      </section>
    </>
  );
};

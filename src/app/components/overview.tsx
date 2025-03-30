"use client";

import { useAppContext } from "@/context/AppContext";
import {
  sortSongByListens,
  sortArtistByListens,
  totalTimeListened,
  aggregateData,
  calculateYearlyCount,
} from "@/lib/datamanagement";
import {
  Chart as ChartJS,
  defaults,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

defaults.maintainAspectRatio = false;
defaults.responsive = true;
defaults.color = "#FFFFFF";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export const StatsOverview = () => {
  const { songData, artistData, listeningEvents } = useAppContext();
  const sortedSongs = sortSongByListens(songData);
  const sortedArtists = sortArtistByListens(artistData);
  const [years, days, hours, minutes, seconds] = totalTimeListened(songData);
  const aggregatedData = aggregateData(listeningEvents);
  const yearlyCount = calculateYearlyCount(aggregatedData);

  console.log(aggregatedData);

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
              <li key={song.name}>
                {song.artist} - {song.name} ({song.times_listened})
              </li>
            ))}
          </ul>
        </div>

        {/* top artists */}
        <div className="bg-gray-500 m-4 p-4 w-[40vw] h-[35vh] rounded-3xl overflow-hidden">
          <h1 className="text-2xl text-center">Your top artists</h1>

          <ul className="mt-4 ml-4 list-decimal list-inside">
            {sortedArtists.slice(0, 10).map((artist) => (
              <li key={artist.name}>
                {artist.name} ({artist.songs_played})
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* total listening time */}
      <section className="m-auto bg-gray-500 p-4 w-[82vw] h-[45vh] rounded-3xl">
        <h1 className="text-2xl text-center">Your total listening time</h1>
        <div className="h-[80%] mt-2">
          <Bar
            data={{
              labels: yearlyCount.labels,
              datasets: [
                {
                  label: "Plays per year",
                  data: yearlyCount.dataPoints,
                  backgroundColor: "#1ed760",
                },
              ],
            }}
          />
        </div>
        <h2 className="text-lg mt-2">
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

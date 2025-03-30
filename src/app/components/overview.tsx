"use client";

import { useState, useRef, useMemo, useEffect } from "react";
// import the use of global states
import { useAppContext } from "@/context/AppContext";
// import all the needed data management functions
import {
  sortSongByListens,
  sortArtistByListens,
  totalTimeListened,
  aggregateData,
  calculateYearlyCount,
  calculateMonthlyCount,
  calculateDailyCount,
} from "@/lib/datamanagement";
import { NestedAggregation } from "@/lib/types";
// import chartjs and other related things
// do i need to import all of these? or can i find a way around it
// seems kind of stupid
import {
  Chart as ChartJS,
  defaults,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, getElementAtEvent } from "react-chartjs-2";

// set default chartjs options for better visuals
defaults.maintainAspectRatio = false;
defaults.responsive = true;
defaults.color = "#FFFFFF";
defaults.backgroundColor = "rgba(255, 255, 255, 0.2)";

// i needed this to make it work - but i want to find a way around it
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export const StatsOverview = () => {
  // global states
  const { songData, artistData, listeningEvents } = useAppContext();

  const [chartData, setChartData] = useState<{
    labels: string[];
    dataPoints: number[];
  }>({ labels: [], dataPoints: [] });
  const chartRef = useRef<any>(null);

  // organizing data from all the data management functions
  const sortedSongs = sortSongByListens(songData);
  const sortedArtists = sortArtistByListens(artistData);
  const [years, days, hours, minutes, seconds] = totalTimeListened(songData);

  // maybe give this a more descriptive name?
  // it aggregates the listeningEvents array to a collection of objects
  // the keys are the date and the values are the count (songs played)
  const aggregatedData = aggregateData(listeningEvents);

  // specify it to every year
  const yearlyCount = calculateYearlyCount(aggregatedData);

  useEffect(() => {
    setChartData(yearlyCount);
  }, []);

  // specify it to every month in a specific year
  //const monthlyCount = calculateMonthlyCount(aggregatedData, "2023");

  // specify it to every day in a specific month in a specific year
  //const dailyCount = calculateDailyCount(aggregatedData, "2023", "03");

  const handleBarClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!chartRef.current) return;

    const elements = getElementAtEvent(chartRef.current, event);

    if (elements.length > 0) {
      const index = elements[0].index;
      console.log("Clicked on:", chartData.labels[index]);

      const monthlyCount = calculateMonthlyCount(
        aggregatedData,
        chartData.labels[index]
      );
      setChartData(monthlyCount);
    }
  };

  const barData = useMemo(
    () => ({
      labels: chartData.labels,
      datasets: [
        {
          label: "Plays per year",
          data: chartData.dataPoints,
          backgroundColor: "#1ed760",
        },
      ],
    }),
    [chartData]
  );

  // summary cards
  // 2 at the top? - top songs and top artists
  return (
    // top summary cards
    <>
      <section className="flex flex-row m-auto">
        {/* top songs */}
        <div className="bg-spotifyblack m-4 p-4 w-[40vw] h-[35vh] rounded-3xl overflow-hidden">
          <h1 className="text-2xl text-center text-spotifygreen">
            Your top songs
          </h1>

          <ul className="mt-4 ml-4 list-decimal list-inside">
            {sortedSongs.slice(0, 10).map((song) => (
              <li key={song.name}>
                {song.artist} - {song.name} ({song.times_listened})
              </li>
            ))}
          </ul>
        </div>

        {/* top artists */}
        <div className="bg-spotifyblack m-4 p-4 w-[40vw] h-[35vh] rounded-3xl overflow-hidden">
          <h1 className="text-2xl text-center text-spotifygreen">
            Your top artists
          </h1>

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
      <section className="m-auto bg-spotifyblack p-4 w-[82vw] h-[45vh] rounded-3xl">
        <h1 className="text-2xl text-center text-spotifygreen">
          Your total listening time
        </h1>
        <div className="h-[80%] mt-2">
          {/* songs played bar chart */}
          {/* find a way to change between yearly and monthly bar charts */}
          <Bar ref={chartRef} data={barData} onClick={handleBarClick} />
        </div>

        {/* fairly convoluted implementation */}
        {/* renders total listening time with all factors accounted for */}
        <h2 className="text-lg mt-4 text-center">
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

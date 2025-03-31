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
import { monthToNumber } from "@/lib/data";

import { FaGithub } from "react-icons/fa6";

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

import { NoData } from "@/app/components/nodata";

/* eslint react-hooks/exhaustive-deps: "off" */

// set default chartjs options for better visuals
defaults.maintainAspectRatio = false;
defaults.responsive = true;
defaults.color = "#FFFFFF";
defaults.borderColor = "rgba(255, 255, 255, 0.2)";

// i needed this to make it work - but i want to find a way around it
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export const StatsOverview = () => {
  // global states
  const { songData, artistData, listeningEvents } = useAppContext();
  // local states
  const [chartData, setChartData] = useState<{
    labels: string[];
    dataPoints: number[];
  }>({ labels: [], dataPoints: [] });
  const [monthData, setMonthData] = useState<{
    labels: string[];
    dataPoints: number[];
  }>({ labels: [], dataPoints: [] });
  const [barState, setBarState] = useState<string>("year");
  const [trackYear, setTrackYear] = useState<string>("");
  // reference to bar chart
  const chartRef = useRef<ChartJS<"bar"> | null | undefined>(null);

  // organizing data from all the data management functions
  const sortedSongs = sortSongByListens(songData);
  const sortedArtists = sortArtistByListens(artistData);
  const [years, days, hours, minutes, seconds] = totalTimeListened(songData);

  // maybe give this a more descriptive name?
  // it aggregates the listeningEvents array to a collection of objects
  // the keys are the date and the values are the count (songs played)
  const aggregatedData = aggregateData(listeningEvents);

  // get the song count for every year
  const yearlyCount = calculateYearlyCount(aggregatedData);

  // useEffect is used so the setChartData state isn't updated constantly, as it was causing crashes
  useEffect(() => {
    setChartData(yearlyCount);
  }, []);

  // function that is called when the bar chart is clicked
  // gets the element (bar) that was clicked on, then uses the label of that bar to flatten the correct data
  const handleBarClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    // return of the bar chart doesn't exist
    if (!chartRef.current) return;

    // get an array of all the elements in the bar chart - this is a built-in react-chartjs-2 function
    const elements = getElementAtEvent(chartRef.current, event);

    if (elements.length > 0) {
      // gets the label of the clicked element
      const index = elements[0].index;

      // flattens data to a specified year, showing the months of that year
      if (barState === "year") {
        const monthlyCount = calculateMonthlyCount(
          aggregatedData,
          chartData.labels[index]
        );
        setChartData(monthlyCount);
        setBarState("month");
        setTrackYear(chartData.labels[index]);
        setMonthData(monthlyCount);
      }
      // flattens data to a specified month, showing the days of that month
      else if (barState === "month") {
        const monthNumber = monthToNumber[chartData.labels[index]];
        const dailyCount = calculateDailyCount(
          aggregatedData,
          trackYear,
          monthNumber
        );
        setChartData(dailyCount);
        setBarState("day");
      }
    }
  };

  // conditionally rendered button that takes the user back to 1 level of abstraction higher
  const backButton = () => {
    if (barState === "month") {
      setBarState("year");
      setChartData(yearlyCount);
    } else if (barState === "day") {
      setBarState("month");
      setChartData(monthData);
    }
  };

  // useMemo used for optimization
  const barData = useMemo(
    () => ({
      labels: chartData.labels,
      datasets: [
        {
          label: "Plays",
          data: chartData.dataPoints,
          backgroundColor: "#1ed760",
        },
      ],
    }),
    [chartData]
  );

  // failsafe for when '/stats' is accessed without uploaded data
  if (
    Object.entries(songData).length < 1 ||
    Object.entries(artistData).length < 1 ||
    listeningEvents.length < 1
  ) {
    return <NoData />;
  }

  // summary cards
  // 2 at the top? - top songs and top artists
  return (
    // top summary cards
    <>
      <section className="flex flex-row m-auto">
        {/* top songs */}
        <div className="bg-spotifyblack m-2 p-4 w-[42vw] h-[45vh] rounded-3xl overflow-y-auto">
          <h1 className="text-2xl text-center text-spotifygreen">
            Your top songs
          </h1>

          <ul className="mt-4 ml-4 list-decimal list-inside marker:text-spotifygreen">
            {sortedSongs.slice(0, 10).map((song) => (
              <li key={song.name}>
                {song.artist} - {song.name} ({song.times_listened})
              </li>
            ))}
          </ul>
        </div>

        {/* top artists */}
        <div className="bg-spotifyblack m-2 p-4 w-[42vw] h-[45vh] rounded-3xl overflow-y-auto">
          <h1 className="text-2xl text-center text-spotifygreen">
            Your top artists
          </h1>

          <ul className="mt-4 ml-4 list-decimal list-inside marker:text-spotifygreen">
            {sortedArtists.slice(0, 10).map((artist) => (
              <li key={artist.name}>
                {artist.name} ({artist.songs_played})
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* total listening time */}
      <section className="relative m-auto bg-spotifyblack p-4 w-[85vw] h-[45vh] rounded-3xl">
        <div className="relative w-full">
          {(barState === "month" || barState === "day") && (
            <button
              className="absolute -top-1 border-2 border-spotifygreen px-2 py-0.5 text-2xl rounded-3xl hover:bg-white/30"
              onClick={backButton}
            >
              Back
            </button>
          )}
          <h1 className="text-2xl text-center text-spotifygreen">
            Your total listening time
          </h1>
        </div>
        <div className="h-[80%] mt-2">
          {/* songs played bar chart */}
          {/* find a way to change between yearly and monthly bar charts */}
          <Bar ref={chartRef} data={barData} onClick={handleBarClick} />
        </div>

        {/* fairly convoluted implementation */}
        {/* renders total listening time with all factors accounted for */}
        <div className="relative">
          <h2 className="text-lg mt-1 text-center text-spotifygreen">
            {years > 0
              ? years > 1
                ? years + " years"
                : years + " year"
              : null}{" "}
            {days > 0 ? (days > 1 ? days + " days" : days + " day") : null}{" "}
            {hours > 0
              ? hours > 1
                ? hours + " hours"
                : hours + " hour"
              : null}{" "}
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
          <section className="absolute top-0 right-0 mt-1 text-spotifygreen flex justify-end">
            <p className="text-sm mr-2">
              <span>&copy;</span> Oliver Borg
            </p>
            <a
              href="https://github.com/xahen/spotify-visualizer"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-0.5"
            >
              <FaGithub />
            </a>
          </section>
        </div>
      </section>
    </>
  );
};

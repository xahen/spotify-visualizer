import dayjs from "dayjs";
import { NestedAggregation } from "@/lib/types";

export const sortSongByListens = (songs: any) => {
  const sortedSongs = Object.values(songs).sort(
    (a, b) => b.times_listened - a.times_listened
  );

  return sortedSongs;
};

export const sortArtistByListens = (artists: any) => {
  const sortedSongs = Object.values(artists).sort(
    (a, b) => b.songs_played - a.songs_played
  );

  return sortedSongs;
};

export const totalTimeListened = (songs: any) => {
  let timeListened = 0;
  Object.values(songs).forEach((data) => {
    timeListened += data.ms_listened;
  });

  let years = Math.floor(timeListened / 3.154e10);
  timeListened = timeListened - 3.154e10 * years;
  let days = Math.floor(timeListened / 8.64e7);
  timeListened = timeListened - 8.64e7 * days;
  let hours = Math.floor(timeListened / 3.6e6);
  timeListened = timeListened - 3.6e6 * hours;
  let minutes = Math.floor(timeListened / 60000);
  timeListened = timeListened - 60000 * minutes;
  let seconds = Math.floor(timeListened / 1000);

  return [years, days, hours, minutes, seconds];
};

export const aggregateData = (listeningEvents: any[]): NestedAggregation => {
  const aggregatedList: NestedAggregation = {};

  listeningEvents.forEach((event) => {
    const date = dayjs(event.timestamp);
    const year = date.format("YYYY");
    const month = date.format("MM");
    const day = date.format("DD");

    if (!aggregatedList[year]) aggregatedList[year] = {};

    if (!aggregatedList[year][month]) aggregatedList[year][month] = {};

    aggregatedList[year][month][day] =
      (aggregatedList[year][month][day] || 0) + 1;
  });

  return aggregatedList;
};

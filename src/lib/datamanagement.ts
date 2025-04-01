import dayjs from "dayjs";
import {
  NestedAggregation,
  SongList,
  ArtistList,
  ListeningEvent,
} from "@/lib/types";
import { numberToMonth } from "@/lib/data";

export const sortSongByListens = (songs: SongList = {}) => {
  const sortedSongs = Object.values(songs).sort(
    (a, b) => b.times_listened - a.times_listened
  );

  return sortedSongs;
};

export const sortArtistByListens = (artists: ArtistList = {}) => {
  const sortedSongs = Object.values(artists).sort(
    (a, b) => b.songs_played - a.songs_played
  );

  return sortedSongs;
};

export const totalTimeListened = (songs: SongList) => {
  let timeListened = 0;
  Object.values(songs).forEach((data) => {
    timeListened += data.ms_listened;
  });

  const years = Math.floor(timeListened / 3.154e10);
  timeListened = timeListened - 3.154e10 * years;
  const days = Math.floor(timeListened / 8.64e7);
  timeListened = timeListened - 8.64e7 * days;
  const hours = Math.floor(timeListened / 3.6e6);
  timeListened = timeListened - 3.6e6 * hours;
  const minutes = Math.floor(timeListened / 60000);
  timeListened = timeListened - 60000 * minutes;
  const seconds = Math.floor(timeListened / 1000);

  return [years, days, hours, minutes, seconds];
};

export const aggregateData = (
  listeningEvents: ListeningEvent[]
): NestedAggregation => {
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

  Object.keys(aggregatedList).forEach((year) => {
    Object.keys(numberToMonth).forEach((monthDate) => {
      if (!aggregatedList[year][monthDate])
        aggregatedList[year][monthDate] = {};
    });
  });

  return aggregatedList;
};

export const calculateYearlyCount = (aggregatedData: NestedAggregation) => {
  const yearlyCount: { [year: string]: number } = {};

  Object.keys(aggregatedData).forEach((year) => {
    let totalCount = 0;

    Object.values(aggregatedData[year]).forEach((month) => {
      totalCount += Object.values(month).reduce(
        (a: number, b: number) => a + b,
        0
      );
    });

    yearlyCount[year] = totalCount;
  });

  const labels = Object.keys(yearlyCount).sort();
  const dataPoints = labels.map((year) => yearlyCount[year]);

  return { labels, dataPoints };
};

export const calculateMonthlyCount = (
  aggregatedData: NestedAggregation,
  year: string
) => {
  if (!aggregatedData[year]) return { labels: [], dataPoints: [] };

  const monthlyCount: { [month: string]: number } = {};

  Object.keys(aggregatedData[year]).forEach((month) => {
    monthlyCount[month] = Object.values(aggregatedData[year][month]).reduce(
      (total: number, count: number) => total + count,
      0
    );
  });

  const labels = Object.keys(monthlyCount).sort();
  const dataPoints = labels.map((month) => monthlyCount[month]);

  for (let i = 0; i < labels.length; i++) {
    labels[i] = numberToMonth[labels[i]];
  }

  return { labels, dataPoints };
};

export const calculateDailyCount = (
  aggregatedData: NestedAggregation,
  year: string,
  month: string
) => {
  if (!aggregatedData[year][month]) return { labels: [], dataPoints: [] };

  const dailyCount: { [day: string]: number } = {};

  Object.keys(aggregatedData[year][month]).forEach((day) => {
    dailyCount[day] = aggregatedData[year][month][day];
  });

  const labels = Object.keys(dailyCount).sort();
  const dataPoints = labels.map((day) => dailyCount[day]);

  return { labels, dataPoints };
};

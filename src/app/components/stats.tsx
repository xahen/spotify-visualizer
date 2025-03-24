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

const sortByListens = (songs: any) => {
    const sortedSongs = Object.entries(songs).sort(
        ([, a], [, b]) => b.times_listened - a.times_listened
    );

    return sortedSongs;
};

const sortBySkips = (songs: any) => {
    const sortedSongs = Object.entries(songs).sort(
        ([, a], [, b]) => b.times_skipped - a.times_skipped
    );

    return sortedSongs;
};

const sortByMS = (songs: any) => {
    const sortedSongs = Object.entries(songs).sort(
        ([, a], [, b]) => b.ms_listened - a.ms_listened
    );

    return sortedSongs;
};

export const StatsPage = () => {
    const { songData } = useAppContext();

    const sortedByListens = sortByListens(songData);
    const sortedBySkips = sortBySkips(songData);
    const sortedByMS = sortByMS(songData);

    return (
        <div className="m-auto">
            <button
                className="border-3 p-3 rounded-4xl text-2xl hover:opacity-50 m-2"
                onClick={() => {
                    for (let x in sortedByListens) {
                        console.log(sortedByListens[x]);
                    }
                }}
            >
                songs sorted by listens
            </button>
            <button
                className="border-3 p-3 rounded-4xl text-2xl hover:opacity-50 m-2"
                onClick={() => {
                    for (let x in sortedBySkips) {
                        console.log(sortedBySkips[x]);
                    }
                }}
            >
                songs sorted by skips
            </button>
            <button
                className="border-3 p-3 rounded-4xl text-2xl hover:opacity-50 m-2"
                onClick={() => {
                    for (let x in sortedByMS) {
                        console.log(sortedByMS[x]);
                    }
                }}
            >
                songs sorted by ms
            </button>
        </div>
    );
};

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

const sortArtistByListens = (songs: any) => {
    const sortedSongs = Object.entries(songs).sort(
        ([, a], [, b]) => b.songs_played - a.songs_played
    );

    return sortedSongs;
};

export const StatsPage = () => {
    const { songData, artistData } = useAppContext();

    const sortedByListens = sortByListens(songData);
    const sortedBySkips = sortBySkips(songData);
    const sortedByMS = sortByMS(songData);

    const artistByListens = sortArtistByListens(artistData);
    const artistBySkips = sortBySkips(artistData);
    const artistByMS = sortByMS(artistData);

    return (
        <div className="m-auto">
            <div className="flex justify-between">
                <button
                    className="border-3 p-3 rounded-4xl text-xl hover:opacity-50 m-2"
                    onClick={() => {
                        for (let x in sortedByListens) {
                            console.log(sortedByListens[x]);
                        }
                    }}
                >
                    songs sorted by listens
                </button>
                <button
                    className="border-3 p-3 rounded-4xl text-xl hover:opacity-50 m-2"
                    onClick={() => {
                        for (let x in sortedBySkips) {
                            console.log(sortedBySkips[x]);
                        }
                    }}
                >
                    songs sorted by skips
                </button>
                <button
                    className="border-3 p-3 rounded-4xl text-xl hover:opacity-50 m-2"
                    onClick={() => {
                        for (let x in sortedByMS) {
                            console.log(sortedByMS[x]);
                        }
                    }}
                >
                    songs sorted by ms
                </button>
                <button
                    className="border-3 p-3 rounded-4xl text-xl hover:opacity-50 m-2"
                    onClick={() => {
                        for (let x in artistByListens) {
                            console.log(artistByListens[x]);
                        }
                    }}
                >
                    artists sorted by listens
                </button>
                <button
                    className="border-3 p-3 rounded-4xl text-xl hover:opacity-50 m-2"
                    onClick={() => {
                        for (let x in artistBySkips) {
                            console.log(artistBySkips[x]);
                        }
                    }}
                >
                    artist sorted by skips
                </button>
                <button
                    className="border-3 p-3 rounded-4xl text-xl hover:opacity-50 m-2"
                    onClick={() => {
                        for (let x in artistByMS) {
                            console.log(artistByMS[x]);
                        }
                    }}
                >
                    artist sorted by ms
                </button>
            </div>
            <div className="flex mt-4">
                <div className="ml-25">
                    <div>
                        <h2 className="text-3xl">top songs</h2>
                    </div>
                    <div className="mt-2">
                        {sortedByListens.map((song) => (
                            <p className="ml-4 text-base" key={song[0]}>
                                {song[1].artist} - {song[1].name} (
                                {song[1].times_listened})
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

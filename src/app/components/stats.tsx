type TopSong = {
    name: string;
    artist: string;
    times_listened: number;
    ms_listened: number;
    times_skipped: number;
};

const topSongs = ({
    name,
    artist,
    times_listened,
    ms_listened,
    times_skipped,
}: TopSong) => {
    return <div></div>;
};

export const StatsPage = () => {
    return (
        <div className="m-auto">
            <h1 className="text-2xl">Your personal stats</h1>
            {/* main stats div */}
            <div className="mt-4">
                <div>
                    <h2 className="text-xl">Your top songs</h2>
                </div>
            </div>
        </div>
    );
};

"use client";

import { WelcomePage } from "./components/introduction";
import { useState } from "react";
import JSZip from "jszip";

type Artist = {
    name: string;
    songs_played: number;
    ms_listened: number;
    times_skipped: number;
};

type ArtistList = {
    [key: string]: Artist;
};

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

export default function Home() {
    const [jsonData, setJsonData] = useState<{ [key: string]: any }>({});

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.name.endsWith(".zip")) {
            return;
        }

        try {
            const zip = new JSZip();
            const contents = await zip.loadAsync(file);
            const jsonContents: { [key: string]: any } = {};

            for (const [filename, content] of Object.entries(contents.files)) {
                if (!content.dir) {
                    const text = await content.async("text");

                    if (filename.endsWith(".json")) {
                        try {
                            const parsedJson = JSON.parse(text);
                            jsonContents[filename] = parsedJson;
                        } catch (jsonError) {
                            console.error(
                                `Error parsing JSON file ${filename}:`,
                                jsonError
                            );
                        }
                    }
                }
            }

            let artists: ArtistList = {};
            let songs: SongList = {};

            setJsonData(jsonContents);

            Object.entries(jsonContents).forEach(([filename, data]) => {
                for (let entry of data) {
                    let songName = entry["master_metadata_track_name"];
                    if (songName in songs) {
                        songs[songName].ms_listened += entry["ms_played"];
                        songs[songName].times_listened += 1;
                        if (entry["skipped"]) {
                            songs[songName].times_skipped;
                        }
                    } else {
                        songs[songName] = {
                            name: songName,
                            artist: entry["master_metadata_album_artist_name"],
                            times_listened: 1,
                            ms_listened: entry["ms_played"],
                            times_skipped: entry["skipped"] ? 1 : 0,
                        };
                    }
                }
            });

            Object.entries(songs).forEach(([key, value]) => {
                console.log(value);
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <main className="w-screen h-screen overflow-x-hidden bg-gray-700 flex">
            <div className="m-auto">
                <input
                    type="file"
                    accept=".zip"
                    onChange={handleFileUpload}
                    className="p-2 border-2 w-auto"
                />
            </div>
        </main>
    );
}

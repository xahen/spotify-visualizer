"use client";

import { useState } from "react";
import JSZip from "jszip";
import { useAppContext } from "@/context/AppContext";
import { FaSpinner } from "react-icons/fa6";

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

const processData = (
  songs: SongList,
  artists: ArtistList,
  jsonContents: any
) => {
  Object.entries(jsonContents).forEach(([filename, data]: [string, any]) => {
    for (const entry of data) {
      let songName = entry["master_metadata_track_name"];
      let artistName = entry["master_metadata_album_artist_name"];
      let idName = artistName + " - " + songName;

      if (songName !== null && artistName !== null) {
        if (idName in songs) {
          songs[idName].ms_listened += entry["ms_played"];
          songs[idName].times_listened += 1;
          if (entry["skipped"]) {
            songs[idName].times_skipped += 1;
          }
        } else {
          songs[idName] = {
            name: songName,
            artist: artistName,
            times_listened: 1,
            ms_listened: entry["ms_played"],
            times_skipped: entry["skipped"] ? 1 : 0,
          };
        }

        if (artistName in artists) {
          artists[artistName].ms_listened += entry["ms_played"];
          artists[artistName].songs_played += 1;
          if (entry["skipped"]) {
            artists[artistName].times_skipped += 1;
          }
        } else {
          artists[artistName] = {
            name: artistName,
            songs_played: 1,
            ms_listened: entry["ms_played"],
            times_skipped: entry["skipped"] ? 1 : 0,
          };
        }
      }
    }
  });

  /*
    const sortedSongs = Object.fromEntries(
        Object.entries(songs).sort(
            (a: [string, Song], b: [string, Song]) =>
                b[1].times_listened - a[1].times_listened
        )
    ) as SongList;
    
  Object.entries(sortedSongs).forEach(([key, value]: [string, Song]) => {
    console.log(value);
  });

    Object.entries(artists).forEach(([key, value]) => {
      console.log(value);
    });
  */

  return [songs, artists];
};

export const ZipUpload = ({
  uploaded,
}: {
  uploaded: (value: boolean) => void;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setSongData, setArtistData } = useAppContext();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
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
              console.error(`Error parsing JSON file ${filename}:`, jsonError);
            }
          }
        }
      }

      const artists: ArtistList = {};
      const songs: SongList = {};

      const [processedSongs, processedArtists] = processData(
        songs,
        artists,
        jsonContents
      );

      setSongData(songs);
      setArtistData(artists);

      uploaded(true);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="mt-8">
        <div>
          <h3 className="text-2xl font-bold">Upload your Spotify data:</h3>
        </div>
        <div className="mt-4 ml-4">
          <div className="flex">
            <FaSpinner size={25} className="animate-spin mt-1" />
            <p className="text-2xl ml-4">Loading...</p>
          </div>
          <div className="mt-2 ml-4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div>
        <h3 className="text-2xl font-bold">Upload your Spotify data:</h3>
      </div>
      <div className="mt-4 ml-4">
        <div className="m-auto">
          <input
            type="file"
            accept=".zip"
            onChange={handleFileUpload}
            className="p-2 border-2 w-auto"
          />
        </div>
        <div className="mt-2 ml-4"></div>
      </div>
    </div>
  );
};

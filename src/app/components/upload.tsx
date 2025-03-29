"use client";

import { useState } from "react";
import JSZip from "jszip";
import { useAppContext } from "@/context/AppContext";
import { FaSpinner } from "react-icons/fa6";

import { processData } from "@/lib/processData";
import { useRouter } from "next/navigation";

export const ZipUpload = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setSongData, setArtistData } = useAppContext();
  const router = useRouter();

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

      router.push("/stats");
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

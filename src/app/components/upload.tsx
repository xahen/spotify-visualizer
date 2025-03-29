"use client";

import { useState } from "react";
import JSZip from "jszip";
import { useAppContext } from "@/context/AppContext";
import { FaSpinner } from "react-icons/fa6";

import { processData } from "@/lib/processData";
import { useRouter } from "next/navigation";

// takes the uploaded .zip file as an event, and then changes the global song and artist states, so the data can be accessed anywhere
// tries to iterate through the files in the .zip folder, then (if it's a json file) saves the contents of the file in the jsonContents object
// then processes the data to organize it by calling the processData function in lib
// finally it pushes the client to the '/stats' route
const handleFileUpload = async (
  e: React.ChangeEvent<HTMLInputElement>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setSongData: (data: any) => void,
  setArtistData: (data: any) => void,
  router: any
) => {
  const file = e.target.files?.[0];

  setLoading(true);

  if (!file) {
    setLoading(false);
    return;
  }
  if (!file.name.endsWith(".zip")) {
    setLoading(false);
    return;
  }

  try {
    const zip = new JSZip();
    const contents = await zip.loadAsync(file);
    const fileContents: { [key: string]: any } = {};

    const loadFiles = Object.entries(contents.files)
      .filter(
        ([filename, content]) => !content.dir && filename.endsWith(".json")
      )
      .map(async ([filename, content]) => {
        const text = await content.async("text");

        try {
          return { filename, data: JSON.parse(text) };
        } catch (fileError) {
          console.error(`Error parsing file ${filename}:`, fileError);
          return null;
        }
      });

    const fileResults = await Promise.all(loadFiles);
    fileResults.forEach((result) => {
      if (result) {
        fileContents[result.filename] = result.data;
      }
    });

    const artists = {};
    const songs = {};

    processData(songs, artists, fileContents);

    setSongData(songs);
    setArtistData(artists);

    router.push("/stats");
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

export const ZipUpload = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setSongData, setArtistData } = useAppContext();
  const router = useRouter();

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
            onChange={(e) =>
              handleFileUpload(
                e,
                setLoading,
                setSongData,
                setArtistData,
                router
              )
            }
            className="p-2 border-2 w-auto"
          />
        </div>
        <div className="mt-2 ml-4"></div>
      </div>
    </div>
  );
};

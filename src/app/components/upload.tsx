"use client";

import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { FaSpinner } from "react-icons/fa6";

import { handleFileUpload } from "@/lib/handleupload";
import { useRouter } from "next/navigation";

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

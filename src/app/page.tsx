"use client";

import { useState } from "react";
import { WelcomePage } from "./components/introduction";
import { StatsPage } from "./components/stats";
import { ZipUpload } from "./components/upload";
import { useAppContext } from "@/context/AppContext";

import { FaBars, FaX, FaHouse, FaChartLine } from "react-icons/fa6";

export default function Home() {
  const [uploaded, setUploaded] = useState<boolean>(false);
  const [sidebar, setSidebar] = useState<boolean>(false);

  // use this state to keep an object with all the song data
  const { songData, setSongData } = useAppContext();

  return (
    <main className="flex flex-row">
      <div
        className={`h-screen bg-gray-900 flex flex-col transition-all duration-250 ${
          sidebar ? "w-64" : "w-16"
        } `}
      >
        <div className="top-0 h-16 w-16 flex">
          <div className="m-auto">
            {!sidebar && <FaBars size={35} onClick={() => setSidebar(true)} />}
            {sidebar && <FaX size={35} onClick={() => setSidebar(false)} />}
          </div>
        </div>
        <div className="h-full w-16 flex flex-col">
          <div className="m-auto">
            <FaHouse size={35} />
          </div>
          <div className="m-auto">
            <FaChartLine size={35} />
          </div>
        </div>
      </div>
      <div className="w-full h-screen overflow-x-hidden bg-slate-700 flex p-4">
        {!uploaded && (
          <div className="m-auto">
            <WelcomePage />{" "}
            {/* update the state in the ZipUpload component, with the uploaded data */}
            <ZipUpload uploaded={setUploaded} />
          </div>
        )}
        {/* pass the data into the stats page, and then handle it in there? */}
        {/* idrk where i'd handle the data otherwise, as i don't want to keep a state for each sorting */}
        {/* most listened songs, most skipped songs, most listened artists etc. */}
        {uploaded && <StatsPage />}
      </div>
    </main>
  );
}

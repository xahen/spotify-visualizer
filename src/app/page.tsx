"use client";

import { useState } from "react";
import { WelcomePage } from "./components/introduction";
import { StatsPage } from "./components/stats";
import { ZipUpload } from "./components/upload";
import { useAppContext } from "@/context/AppContext";

export default function Home() {
    const [uploaded, setUploaded] = useState<boolean>(false);

    // use this state to keep an object with all the song data
    const { songData, setSongData } = useAppContext();

    return (
        <main className="w-screen h-screen overflow-x-hidden bg-gray-700 flex">
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
        </main>
    );
}

"use client";

import { useState } from "react";
import { WelcomePage } from "./components/introduction";
import { StatsPage } from "./components/stats";
import { ZipUpload } from "./components/upload";

export default function Home() {
    const [uploaded, setUploaded] = useState<boolean>(false);
    const [data, setData] = useState(null);

    return (
        <main className="w-screen h-screen overflow-x-hidden bg-gray-700 flex">
            {!uploaded && (
                <div className="m-auto">
                    <WelcomePage />{" "}
                    <ZipUpload uploaded={setUploaded} data={setData} />
                </div>
            )}
            {uploaded && <StatsPage />}
        </main>
    );
}

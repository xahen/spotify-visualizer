"use client";

import { useState } from "react";
import { WelcomePage } from "./components/introduction";
import { StatsPage } from "./components/stats";
import { ZipUpload } from "./components/upload";

export default function Home() {
  const [uploaded, setUploaded] = useState<boolean>(false);

  return (
    <div className="w-full h-screen overflow-x-hidden bg-slate-700 flex p-4">
      {!uploaded && (
        <div className="m-auto">
          <WelcomePage /> <ZipUpload uploaded={setUploaded} />
        </div>
      )}
      {uploaded && <StatsPage />}
    </div>
  );
}

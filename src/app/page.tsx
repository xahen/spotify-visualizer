"use client";

import { WelcomePage } from "./components/introduction";
import { ZipUpload } from "./components/upload";

export default function Home() {
  return (
    <div className="w-full h-screen overflow-x-hidden bg-slate-700 flex p-4">
      <div className="m-auto">
        <WelcomePage /> <ZipUpload />
      </div>
    </div>
  );
}

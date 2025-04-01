"use client";

import { WelcomePage } from "@/app/components/introduction";

export default function Home() {
  return (
    <div className="w-screen h-screen overflow-x-hidden overflow-y-auto bg-black flex p-4">
      <div className="m-auto">
        <WelcomePage />
      </div>
    </div>
  );
}

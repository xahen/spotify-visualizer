"use client";

import { WelcomePage } from "@/app/components/introduction";

export default function Home() {
  return (
    <div className="w-full h-screen overflow-x-hidden bg-black/50 flex p-4">
      <div className="m-auto">
        <WelcomePage />
      </div>
    </div>
  );
}

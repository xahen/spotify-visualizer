import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

import { AppProvider } from "@/context/AppContext";
//import { Sidebar } from "./components/sidebar";

export const metadata: Metadata = {
  title: "Spotify Data Visualizer",
  description: "Spotify Wrapped if it was good",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="flex flex-col h-screen w-screen">
          <AppProvider>
            {children}
            <Analytics />
            <SpeedInsights />
          </AppProvider>
        </main>
      </body>
    </html>
  );
}

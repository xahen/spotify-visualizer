import type { Metadata } from "next";
import "./globals.css";

import { AppProvider } from "@/context/AppContext";
import { Sidebar } from "./components/sidebar";

export const metadata: Metadata = {
  title: "Spotify Data Visualizer",
  description: "Coded by Oliver Borg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex">
          <Sidebar />
          <AppProvider>{children}</AppProvider>
        </div>
      </body>
    </html>
  );
}

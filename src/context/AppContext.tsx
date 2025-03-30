"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import {
  ListeningEvent,
  AppContextType,
  SongList,
  ArtistList,
} from "@/lib/types";

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [songData, setSongData] = useState<SongList>({});
  const [artistData, setArtistData] = useState<ArtistList>({});
  const [listeningEvents, setListeningEvents] = useState<ListeningEvent[]>([]);

  return (
    <AppContext.Provider
      value={{
        songData,
        setSongData,
        artistData,
        setArtistData,
        listeningEvents,
        setListeningEvents,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useContext error");
  }
  return context;
};

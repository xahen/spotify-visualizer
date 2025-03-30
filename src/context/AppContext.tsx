"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type Data = {
  [key: string]: any;
};

type DataState = {
  data: Record<string, Data>;
};

type ListeningEvent = {
  song: string;
  artist: string;
  timestamp: string;
};

type AppContextType = {
  songData: DataState;
  setSongData: React.Dispatch<React.SetStateAction<DataState>>;
  artistData: DataState;
  setArtistData: React.Dispatch<React.SetStateAction<DataState>>;
  events: ListeningEvent[];
  setListeningEvents: React.Dispatch<React.SetStateAction<ListeningEvent[]>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [songData, setSongData] = useState<DataState>({
    data: {},
  });
  const [artistData, setArtistData] = useState<DataState>({
    data: {},
  });
  const [events, setListeningEvents] = useState<ListeningEvent[]>([]);

  return (
    <AppContext.Provider
      value={{
        songData,
        setSongData,
        artistData,
        setArtistData,
        events,
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

"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type Songs = {
  [key: string]: any;
};

type SongDataState = {
  data: Record<string, Songs>;
};

type AppContextType = {
  songData: SongDataState;
  setSongData: React.Dispatch<React.SetStateAction<AppState>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [songData, setSongData] = useState<SongDataState>({
    data: {},
  });

  return (
    <AppContext.Provider value={{ songData, setSongData }}>
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

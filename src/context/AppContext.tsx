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
    setSongData: React.Dispatch<React.SetStateAction<SongDataState>>;
    artistData: SongDataState;
    setArtistData: React.Dispatch<React.SetStateAction<SongDataState>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [songData, setSongData] = useState<SongDataState>({
        data: {},
    });
    const [artistData, setArtistData] = useState<SongDataState>({
        data: {},
    });

    return (
        <AppContext.Provider
            value={{ songData, setSongData, artistData, setArtistData }}
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

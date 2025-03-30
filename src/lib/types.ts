export type AppContextType = {
  songData: DataState;
  setSongData: React.Dispatch<React.SetStateAction<DataState>>;
  artistData: DataState;
  setArtistData: React.Dispatch<React.SetStateAction<DataState>>;
  listeningEvents: ListeningEvent[];
  setListeningEvents: React.Dispatch<React.SetStateAction<ListeningEvent[]>>;
};

export type DataState = {
  data: Record<string, [key: string]>;
};

export type NestedAggregation = {
  [year: string]: {
    [month: string]: {
      [day: string]: number;
    };
  };
};

export type ArtistList = {
  [key: string]: {
    name: string;
    songs_played: number;
    ms_listened: number;
    times_skipped: number;
  };
};

export type SongList = {
  [key: string]: {
    name: string;
    artist: string;
    times_listened: number;
    ms_listened: number;
    times_skipped: number;
  };
};

export type ListeningEvent = {
  song: string;
  artist: string;
  timestamp: string;
};

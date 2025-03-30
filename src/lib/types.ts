export type AppContextType = {
  songData: SongList;
  setSongData: React.Dispatch<React.SetStateAction<SongList>>;
  artistData: ArtistList;
  setArtistData: React.Dispatch<React.SetStateAction<ArtistList>>;
  listeningEvents: ListeningEvent[];
  setListeningEvents: React.Dispatch<React.SetStateAction<ListeningEvent[]>>;
};

export type NestedAggregation = {
  [year: string]: {
    [month: string]: {
      [day: string]: number;
    };
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

export type ArtistList = {
  [key: string]: {
    name: string;
    songs_played: number;
    ms_listened: number;
    times_skipped: number;
  };
};

export type ListeningEvent = {
  song: string;
  artist: string;
  timestamp: string;
};

export type FileContents = {
  master_metadata_track_name: string | null;
  master_metadata_album_artist_name: string | null;
  ms_played: number;
  skipped?: boolean;
  ts: string;
};

import JSZip from "jszip";

import {
  ArtistList,
  SongList,
  ListeningEvent,
  FileContents,
} from "@/lib/types";

// iterates through the entries of the fileContents object, organizes relevant data into the songs and artists arrays
const processData = (
  songs: SongList,
  artists: ArtistList,
  listeningEvents: ListeningEvent[],
  fileContents: Record<string, FileContents[]>
) => {
  Object.values(fileContents).forEach((data) => {
    for (const entry of data) {
      const songName: string | null = entry["master_metadata_track_name"];
      const artistName: string | null =
        entry["master_metadata_album_artist_name"];
      const idName: string = artistName + " - " + songName;

      if (songName !== null && artistName !== null) {
        if (idName in songs) {
          songs[idName].ms_listened += entry["ms_played"];
          songs[idName].times_listened += 1;
          if (entry["skipped"]) {
            songs[idName].times_skipped += 1;
          }
        } else {
          songs[idName] = {
            name: songName,
            artist: artistName,
            times_listened: 1,
            ms_listened: entry["ms_played"],
            times_skipped: entry["skipped"] ? 1 : 0,
          };
        }

        if (artistName in artists) {
          artists[artistName].ms_listened += entry["ms_played"];
          artists[artistName].songs_played += 1;
          if (entry["skipped"]) {
            artists[artistName].times_skipped += 1;
          }
        } else {
          artists[artistName] = {
            name: artistName,
            songs_played: 1,
            ms_listened: entry["ms_played"],
            times_skipped: entry["skipped"] ? 1 : 0,
          };
        }

        const event = {
          song: songName,
          artist: artistName,
          timestamp: entry["ts"],
        };

        listeningEvents.push(event);
      }
    }
  });
};

// takes the uploaded .zip file as an event, and then changes the global song and artist states, so the data can be accessed anywhere
// tries to iterate through the files in the .zip folder, then (if it's a json file) saves the contents of the file in the jsonContents object
// then processes the data to organize it by calling the processData function in lib
// finally it pushes the client to the '/stats' route
export const handleFileUpload = async (
  e: React.ChangeEvent<HTMLInputElement>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setSongData: (data: SongList) => void,
  setArtistData: (data: ArtistList) => void,
  setListeningEvents: (data: ListeningEvent[]) => void,
  router: { push: (path: string) => void }
) => {
  const file = e.target.files?.[0];

  setLoading(true);

  if (!file) {
    setLoading(false);
    return;
  }
  if (!file.name.endsWith(".zip")) {
    setLoading(false);
    return;
  }

  try {
    const zip = new JSZip();
    const contents = await zip.loadAsync(file);
    const fileContents: Record<string, FileContents[]> = {};

    const loadFiles = Object.entries(contents.files)
      .filter(
        ([filename, content]) => !content.dir && filename.endsWith(".json")
      )
      .map(async ([filename, content]) => {
        const text = await content.async("text");

        try {
          return { filename, data: JSON.parse(text) };
        } catch (fileError) {
          console.error(`Error parsing file ${filename}:`, fileError);
          return null;
        }
      });

    const fileResults = await Promise.all(loadFiles);
    fileResults.forEach((result) => {
      if (result) {
        fileContents[result.filename] = result.data;
      }
    });

    const artists = {};
    const songs = {};
    const listeningEvents: ListeningEvent[] = [];

    processData(songs, artists, listeningEvents, fileContents);

    setSongData(songs);
    setArtistData(artists);
    setListeningEvents(listeningEvents);

    router.push("/stats");
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

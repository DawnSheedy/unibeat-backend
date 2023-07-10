import { Song } from "../models/game/Song";
import { db } from "../services/db";
import { getValue, setValue } from "../services/keyValueStore";
import { SongData } from "../types/SongData";

const asyncDataLoad = async () => {
  const dataAlreadyExists = (await getValue("dataLoaded")) === "true";

  if (dataAlreadyExists) {
    console.log("Song data has already been imported.");
    return;
  }

  const songData = require("../../public/songs/index.json").songs as SongData[];
  console.log("Song data", songData.length);

  await Promise.all(
    songData.map(async (song) => {
      const dbSong = await Song.create({
        id: song.uuid,
        title: song.title,
        artist: song.artist,
        tempo: song.tempo,
        length: song.length,
      });
      console.log(`Created DB entry for: ${dbSong.title}`);
    })
  );

  console.log('All songs loaded into DB!')
  setValue("dataLoaded", "true");
};

db.afterBulkSync("Song Data Load", () => {
  console.log("Database Synced, performing song database assembly.");
  asyncDataLoad();
});

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

// Read the IMPORT_PATH environment variable
const importPath = "dataload/";

if (!importPath) {
  console.error("IMPORT_PATH environment variable is not set.");
  process.exit(1);
}

// Function to recursively get all subdirectories
function getSubdirectories(dir) {
  const subdirectories = [];

  // Get all items in the current directory
  const items = fs.readdirSync(dir);

  items.forEach((item) => {
    const itemPath = path.join(dir, item);

    // Check if the item is a directory
    if (fs.statSync(itemPath).isDirectory()) {
      subdirectories.push(itemPath);

      // Recursively get subdirectories
      subdirectories.push(...getSubdirectories(itemPath));
    }
  });

  return subdirectories;
}

// Get subdirectories of the import path
const subdirectories = getSubdirectories(importPath);

const allSongData = [];

// Create output dir
try {
  fs.mkdirSync("public/songs/");
} catch (e) {
  console.log("Could not create songs directory. Does it already exist?");
}

const importFileNames = ["bnr.png", "song.ogg", "index.ogg"];

// Run song import
console.log("Importing all resolved songs.");
subdirectories.forEach((subdirectory) => {
  const getBasePath = (path) => {
    return `../${subdirectory}/${path}`;
  };
  const songData = require(getBasePath("meta.json"));
  console.log("Started loading song: ", songData.title);
  let bsc, adv, ext;
  try {
    bsc = require(getBasePath("bsc.json"));
    adv = require(getBasePath("adv.json"));
    ext = require(getBasePath("ext.json"));
  } catch (e) {
    console.error(`Failed to load charts for ${songData.title}`, e);
    return;
  }
  const aggSongData = {
    ...songData,
    uuid: subdirectory.split("/")[1],
    versions: [
      { difficulty: 0, chart: bsc },
      { difficulty: 1, chart: adv },
      { difficulty: 2, chart: ext },
    ],
  };
  allSongData.push(aggSongData);
  console.log(`UUID Assigned: ${aggSongData.uuid}`);
  console.log("Successfully loaded metadata and charts.");
  console.log("Starting song data import.");

  const outputDir = `public/songs/${aggSongData.uuid}/`;
  fs.mkdir(outputDir, (err) => {
    if (err) {
      console.error(
        "Failed to create song directory. Does UUID already exist?",
        aggSongData.title
      );
      return;
    }
    importFileNames.forEach((name) => {
      console.log(`Copying ${aggSongData.title} / ${name}`);
      fs.copyFile(`${subdirectory}/${name}`, outputDir + name, (err) => {
        if (err) {
          console.error(`Failed while copying ${aggSongData.title} / ${name}`);
        } else {
          console.log(`Finished copying ${aggSongData.title} / ${name}`);
        }
      });
    });
  });
});

console.log("Writing song metadata to disk.");
try {
  fs.writeFileSync(
    "public/songs/index.json",
    JSON.stringify({ songs: allSongData }),
    { encoding: "utf-8" }
  );
} catch (e) {
  console.log("Failed to write song metadata, does it already exist?");
}

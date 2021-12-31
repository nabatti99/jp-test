const fsPromises = require("fs/promises");
const fs = require("fs");
const path = require("path");

const { getAppDataPath } = require("./assetsManager");

module.exports.readJSON = async (filePath) => {
  const data = await fsPromises.readFile(filePath, { encoding: "utf-8" });
  return JSON.parse(data);
};

module.exports.readDir = async (...dirPaths) => {
  const appDataPath = await getAppDataPath();
  const files = await fsPromises.readdir(path.join(appDataPath, ...dirPaths));

  return files;
};

module.exports.readTest = async (...testPaths) => {
  const appDataPath = await getAppDataPath();
  const destinationFolder = path.join(appDataPath, ...testPaths);

  const testFolder = testPaths[testPaths.length - 1];
  const rawData = await fsPromises.readFile(path.join(destinationFolder, `${testFolder}.json`), {
    encoding: "utf-8",
  });

  const dataWorkers = JSON.parse(rawData).map(async (item) => {
    if (item.Mp3) {
      item.AudioUrl = path.join(destinationFolder, item.ID.toString(), `${item.ID}.mp3`);
      item.Audio = await fsPromises.readFile(item.AudioUrl);
    }
    if (item.File) {
      item.ImageUrl = path.join(destinationFolder, item.ID.toString(), `${item.ID}.png`);
      item.Image = await fsPromises.readFile(item.ImageUrl);
    }

    return item;
  });

  const data = await Promise.all(dataWorkers);

  return data;
};

module.exports.readSummary = async (...testPaths) => {
  const appDataPath = await getAppDataPath();
  const destinationFolder = path.join(appDataPath, ...testPaths);

  const rawData = await fsPromises.readFile(path.join(destinationFolder, `summary.json`), {
    encoding: "utf-8",
  });

  return JSON.parse(rawData);
};

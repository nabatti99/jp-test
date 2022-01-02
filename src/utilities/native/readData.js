const fsPromises = require("fs/promises");
const fs = require("fs");
const path = require("path");

const { getAppDataPath } = require("./assetsManager");

module.exports.readJSON = async (filePath) => {
  const data = await fsPromises.readFile(filePath, { encoding: "utf-8" });
  return JSON.parse(data);
};

const scanJSON = async (dirPath) => {
  const result = new Array();

  const stat = await fsPromises.lstat(dirPath);
  if (!stat.isDirectory()) return result;

  const subDirs = await fsPromises.readdir(dirPath);
  for (const subDir of subDirs) {
    const subDirPath = path.join(dirPath, subDir);
    const stat = await fsPromises.lstat(subDirPath);

    if (stat.isDirectory()) {
      const JSONFiles = await scanJSON(subDirPath);
      result.push(...JSONFiles);
    } else {
      const fileName = subDir;
      const fileExtension = fileName.split(".").reverse()[0];
      if (fileExtension.toLowerCase() == "json")
        result.push({
          fileName,
          filePath: subDirPath,
        });
    }
  }

  return result;
};

module.exports.scanJSON = scanJSON;

module.exports.readDir = async (...dirPaths) => {
  const appDataPath = await getAppDataPath();
  const dirs = await fsPromises.readdir(path.join(appDataPath, ...dirPaths));

  return dirs;
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
      if (!fs.existsSync(item.ImageUrl))
        item.ImageUrl = path.join(destinationFolder, item.ID.toString(), `${item.ID}.jpg`);

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

const fsPromises = require("fs/promises");
const fs = require("fs");
const https = require("https");
const path = require("path");

const { getAppDataPath } = require("./assetsManager");

// Save JSON file at: APP_DATA_PATH/Level/Section/Unit/Test/Test.json
module.exports.saveJSON = async (fileName, data, ...testPaths) => {
  const destinationFolder = path.join(...testPaths);
  await prepareDirectory(destinationFolder);

  await fsPromises.writeFile(path.join(destinationFolder, `${fileName}.json`), JSON.stringify(data), {
    encoding: "utf-8",
  });
  console.log(`Saved JSON at: ${path.join(destinationFolder, `${fileName}.json`)}`);

  return destinationFolder;
};

// Save Audio file at APP_DATA_PATH/Level/Section/Unit/Test/AudioId/Audio.mp3
module.exports.saveAudio = async (id, url, ...testPaths) => {
  const destinationFolder = path.join(...testPaths, id.toString());
  await prepareDirectory(destinationFolder);

  return new Promise((resolve, reject) => {
    const filePath = path.join(destinationFolder, `${id}.mp3`);
    const writeStream = fs.createWriteStream(filePath);

    https
      .get(url, (response) => {
        if (response.statusCode == 200 && response.headers["content-type"] == "audio/mpeg") {
          response.pipe(writeStream);
          writeStream.on("finish", () => writeStream.close());
        }
      })
      .on("close", () => {
        console.log(`Saved Audio at: ${filePath}`);
        resolve("done");
      })
      .on("error", (error) => {
        writeStream.close();
        fs.unlink(filePath);

        reject(error);
      });
  });
};

// Save Image file at APP_DATA_PATH/Level/Section/Unit/Test/ImageId/Image.png
module.exports.saveImage = async (id, url, ...testPaths) => {
  const destinationFolder = path.join(...testPaths, id.toString());
  await prepareDirectory(destinationFolder);

  return new Promise((resolve, reject) => {
    const filePath = path.join(destinationFolder, `${id}.png`);
    const writeStream = fs.createWriteStream(filePath);

    https
      .get(url, (response) => {
        console.log(response);
        if (response.statusCode == 200 && response.headers["content-type"] == "image/png") {
          response.pipe(writeStream);
          writeStream.on("finish", () => writeStream.close());
        }
      })
      .on("close", () => {
        console.log(`Saved Image at: ${filePath}`);
        resolve("done");
      })
      .on("error", (error) => {
        writeStream.close();
        fs.unlink(filePath);

        reject(error);
      });
  });
};

module.exports.prepareDir = async (...dirPaths) => {
  const destinationFolder = path.join(...dirPaths);
  return prepareDirectory(destinationFolder);
};

// Prepare directory if it not exists
const prepareDirectory = async (destinationFolder) => {
  const appDataPath = await getAppDataPath();
  const destinationPath = path.join(appDataPath, destinationFolder);

  try {
    return await fsPromises.access(destinationPath);
  } catch (error) {
    console.error(error);
    console.log(`Creating: ${destinationPath}`);
    return await fsPromises.mkdir(destinationPath, { recursive: true });
  }
};

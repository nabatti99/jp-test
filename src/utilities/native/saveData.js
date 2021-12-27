const fsPromises = require("fs/promises");
const fs = require("fs");
const https = require("https");
const path = require("path");

const { getAppDataPath } = require("./assetsManager");

// Save JSON file at APP_DATA_PATH/Unit/Test/Test.json
module.exports.saveJSON = async (levelFolder, unitFolder, testFolder, fileName, data) => {
  const appDataPath = await getAppDataPath();
  const destinationFolder = path.join(appDataPath, levelFolder, unitFolder, testFolder);
  await prepareDirectory(destinationFolder);

  await fsPromises.writeFile(path.join(destinationFolder, `${fileName}.json`), JSON.stringify(data), {
    encoding: "utf-8",
  });
  console.log(`Saved JSON at: ${path.join(destinationFolder, `${fileName}.json`)}`);

  return destinationFolder;
};

// Save Audio file at APP_DATA_PATH/Unit/Test/AudioId/Audio.mp3
module.exports.saveAudio = async (testFolder, id, url) => {
  const destinationFolder = path.join(testFolder, id.toString());
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

// Save Image file at APP_DATA_PATH/Unit/Test/ImageId/Image.png
module.exports.saveImage = async (testFolder, id, url) => {
  const destinationFolder = path.join(testFolder, id.toString());
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

// Prepare directory if it not exists
const prepareDirectory = async (destinationFolder) => {
  try {
    return await fsPromises.access(destinationFolder);
  } catch (error) {
    console.error(error);
    console.log(`Creating ${destinationFolder}`);
    return await fsPromises.mkdir(destinationFolder, { recursive: true });
  }
};

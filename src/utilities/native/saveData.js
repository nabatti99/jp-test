const fsPromises = require("fs/promises");
const fs = require("fs");
const https = require("https");
const path = require("path");

const { APP_DATA_PATH } = require("./assetsManager");

module.exports.saveJSON = async (levelFolder, unitFolder, testFolder, name, data) => {
  const destinationFolder = path.join(APP_DATA_PATH, levelFolder, unitFolder, testFolder);
  await prepareDirectory(destinationFolder);

  await fsPromises.writeFile(path.join(destinationFolder, name), JSON.stringify(data), { encoding: "utf-8" });
  console.log(`Saved JSON at: ${path.join(destinationFolder, name)}`);

  return destinationFolder;
};

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

const prepareDirectory = async (destinationFolder) => {
  try {
    return await fsPromises.access(destinationFolder);
  } catch (error) {
    console.error(error);
    return await fsPromises.mkdir(destinationFolder, { recursive: true });
  }
};

const fsPromises = require("fs/promises");
const fs = require("fs");
const https = require("https");
const path = require("path");

const { getAppDataPath } = require("./assetsManager");

// Save JSON file at: APP_DATA_PATH/Level/Section/Unit/Test/Test.json
module.exports.saveJSON = async (fileName, data, ...testPaths) => {
  const destinationFolder = path.join(...testPaths);
  const destinationPath = await prepareDirectory(destinationFolder);

  await fsPromises.writeFile(path.join(destinationPath, `${fileName}.json`), JSON.stringify(data), {
    encoding: "utf-8",
  });
  console.log(`Saved JSON at: ${path.join(destinationPath, `${fileName}.json`)}`);

  return destinationFolder;
};

// Save Audio file at APP_DATA_PATH/Level/Section/Unit/Test/AudioId/Audio.mp3
module.exports.saveAudio = async (id, url, ...testPaths) => {
  const destinationFolder = path.join(...testPaths, id.toString());
  const destinationPath = await prepareDirectory(destinationFolder);

  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        console.log(response);
        if (response.statusCode == 200) {
          let audioPath = null;

          switch (response.headers["content-type"]) {
            case "audio/mpeg":
              audioPath = path.join(destinationPath, `${id}.mp3`);
              break;

            default:
              throw new Error(`Can't found 'Content-Type' of the image at: ${url}`);
          }

          const writeStream = fs.createWriteStream(audioPath);
          response.pipe(writeStream);

          writeStream.on("finish", () => {
            console.log(`Saved Audio at: ${audioPath}`);
            writeStream.close();
          });

          writeStream.on("error", (error) => {
            fsPromises.unlink(filePath);
            throw error;
          });
        }
      })
      .on("close", () => {
        resolve("done");
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};

// Save Image file at APP_DATA_PATH/Level/Section/Unit/Test/ImageId/Image.png
module.exports.saveImage = async (id, url, ...testPaths) => {
  const destinationFolder = path.join(...testPaths, id.toString());
  const destinationPath = await prepareDirectory(destinationFolder);

  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        console.log(response);
        if (response.statusCode == 200) {
          let filePath = null;

          switch (response.headers["content-type"]) {
            case "image/png":
              filePath = path.join(destinationPath, `${id}.png`);
              break;
            case "image/jpeg":
              filePath = path.join(destinationPath, `${id}.jpg`);
              break;
            default:
              throw new Error(`Can't found 'Content-Type' of the image at: ${url}`);
          }

          const writeStream = fs.createWriteStream(filePath);
          response.pipe(writeStream);

          writeStream.on("finish", () => {
            console.log(`Saved Image at: ${filePath}`);
            writeStream.close();
          });

          writeStream.on("error", (error) => {
            fsPromises.unlink(filePath);
            throw error;
          });
        }
      })
      .on("close", () => {
        resolve("done");
      })
      .on("error", (error) => {
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
    await fsPromises.access(destinationPath);
    return destinationPath;
  } catch (error) {
    console.error(error);
    console.log(`Creating: ${destinationPath}`);
    return await fsPromises.mkdir(destinationPath, { recursive: true });
  }
};

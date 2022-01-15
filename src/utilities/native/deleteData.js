const fsPromises = require("fs/promises");
const path = require("path");

const { getAppDataPath } = require("./assetsManager");

module.exports.deleteDir = async (...dirPaths) => {
  const appDataPath = await getAppDataPath();
  const destinationDir = path.join(appDataPath, ...dirPaths);

  await fsPromises.rm(destinationDir, { recursive: true, force: true });
  console.log(`Removed: ${destinationDir}`);
};

const fsPromises = require("fs/promises");

module.exports = async (filePath) => {
  const data = await fsPromises.readFile(filePath, { encoding: "utf-8" });
  return JSON.parse(data);
};

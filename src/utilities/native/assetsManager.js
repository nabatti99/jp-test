const { ipcRenderer } = require("electron");
const path = require("path");

module.exports.getAppDataPath = async () => {
  const appPath = await ipcRenderer.invoke("getAppPath");
  return path.join(appPath, "data");
};

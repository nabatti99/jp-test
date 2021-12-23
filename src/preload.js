const { contextBridge, ipcRenderer } = require("electron");

const readData = require("./utilities/native/readData");
const { saveJSON, saveAudio, saveImage } = require("./utilities/native/saveData");

contextBridge.exposeInMainWorld("nativeAPI", {
  readData: async (filePath) => readData(filePath),
  saveJSON: async (levelFolder, unitFolder, testFolder, name, data) =>
    saveJSON(levelFolder, unitFolder, testFolder, name, data),
  saveAudio: async (testFolder, id, url) => saveAudio(testFolder, id, url),
  saveImage: async (testFolder, id, url) => saveImage(testFolder, id, url),
});

console.log("Loaded Preload file");

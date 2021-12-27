const { contextBridge, ipcRenderer } = require("electron");

const { readJSON, readDir, readTest, readSummary } = require("./utilities/native/readData");
const { saveJSON, saveAudio, saveImage } = require("./utilities/native/saveData");

contextBridge.exposeInMainWorld("nativeAPI", {
  readJSON: async (filePath) => readJSON(filePath),
  saveJSON: async (levelFolder, unitFolder, testFolder, fileName, data) =>
    saveJSON(levelFolder, unitFolder, testFolder, fileName, data),

  saveAudio: async (testFolder, id, url) => saveAudio(testFolder, id, url),
  saveImage: async (testFolder, id, url) => saveImage(testFolder, id, url),

  readDir: async (...dirPaths) => readDir(...dirPaths),
  readTest: async (levelFolder, unitFolder, testFolder) => readTest(levelFolder, unitFolder, testFolder),
  readSummary: async (levelFolder, unitFolder, testFolder) => readSummary(levelFolder, unitFolder, testFolder),
});

console.log("Loaded Preload file");

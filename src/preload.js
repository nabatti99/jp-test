const { contextBridge, ipcRenderer } = require("electron");

const { readJSON, readDir, readTest, readSummary } = require("./utilities/native/readData");
const { saveJSON, saveAudio, saveImage, prepareDir } = require("./utilities/native/saveData");

contextBridge.exposeInMainWorld("nativeAPI", {
  readJSON: async (filePath) => readJSON(filePath),
  saveJSON: async (fileName, data, ...testPaths) => saveJSON(fileName, data, ...testPaths),

  saveAudio: async (id, url, ...testPaths) => saveAudio(id, url, ...testPaths),
  saveImage: async (id, url, ...testPaths) => saveImage(id, url, ...testPaths),

  prepareDir: async (...dirPaths) => prepareDir(...dirPaths),
  readDir: async (...dirPaths) => readDir(...dirPaths),
  readTest: async (...testPaths) => readTest(...testPaths),
  readSummary: async (...testPaths) => readSummary(...testPaths),
});

console.log("Loaded Preload file");

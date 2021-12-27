const { app, BrowserWindow, session, ipcMain } = require("electron");
const path = require("path");

// Get React Dev Tools path
const reactDevToolsPath = path.join(
  process.env.LOCALAPPDATA,
  "CentBrowser\\User Data\\Default\\Extensions\\fmkadmapgofadopljbjfkapdkoienihi\\4.22.0_0"
);

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 1000,
    webPreferences: {
      preload: _PRELOAD_WEBPACK_ENTRY,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

// React Dev Tool is start here
app.on("ready", () => {
  session.defaultSession
    .loadExtension(reactDevToolsPath)
    .then((response) => {
      console.log("React Dev Tools is enabled");
      createWindow();
    })
    .catch((error) => console.error(error));

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Content-Security-Policy": [
          "img-src blob:",
          "media-src blob:",
          "default-src 'self' 'unsafe-inline' data:",
          "script-src 'self' 'unsafe-eval' 'unsafe-inline' data:",
        ].join(";"),
      },
    });
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

ipcMain.handle("getAppPath", (event) => app.getAppPath());

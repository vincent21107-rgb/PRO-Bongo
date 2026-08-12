
const { app, BrowserWindow, globalShortcut } = require("electron");
const path = require("path");
const { uIOhook, UiohookKey } = require("uiohook-napi");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 720,
    height: 620,
    transparent: true,
    frame: false,
    resizable: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    hasShadow: false,
    backgroundColor: "#00000000",
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, "preload.js")
    }
  });

  win.setAlwaysOnTop(true, "floating");
  win.loadFile("index.html");

  // The overlay should not block clicks on the apps underneath it.
  win.setIgnoreMouseEvents(true, { forward: true });

  win.on("closed", () => {
    win = null;
  });
}

function send(type, data = {}) {
  if (win && !win.isDestroyed()) {
    win.webContents.send(type, data);
  }
}

app.whenReady().then(() => {
  createWindow();

  // F12 = quit
  globalShortcut.register("F12", () => app.quit());

  // F8 = toggle click-through (useful if you want to move the window)
  globalShortcut.register("F8", () => {
    if (!win) return;
    const enabled = !win.__clickThrough;
    win.__clickThrough = enabled;
    win.setIgnoreMouseEvents(enabled, { forward: true });
    send("clickThrough", { enabled });
  });

  uIOhook.on("keydown", e => {
    send("globalKeyDown", { keycode: e.keycode });
  });

  uIOhook.on("keyup", e => {
    send("globalKeyUp", { keycode: e.keycode });
  });

  uIOhook.on("mousedown", e => {
    send("globalMouseDown", { button: e.button });
  });

  uIOhook.on("mouseup", e => {
    send("globalMouseUp", { button: e.button });
  });

  uIOhook.start();
});

app.on("will-quit", () => {
  try { uIOhook.stop(); } catch {}
  globalShortcut.unregisterAll();
});

app.on("window-all-closed", () => {
  // Keep the desktop mascot alive until F12 is pressed.
});

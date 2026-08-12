
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("desktopEvents", {
  onKeyDown: (fn) => ipcRenderer.on("globalKeyDown", (_, data) => fn(data)),
  onKeyUp: (fn) => ipcRenderer.on("globalKeyUp", (_, data) => fn(data)),
  onMouseDown: (fn) => ipcRenderer.on("globalMouseDown", (_, data) => fn(data)),
  onMouseUp: (fn) => ipcRenderer.on("globalMouseUp", (_, data) => fn(data)),
  onClickThrough: (fn) => ipcRenderer.on("clickThrough", (_, data) => fn(data))
});

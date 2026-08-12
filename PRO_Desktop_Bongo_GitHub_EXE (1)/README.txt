
# PRO Desktop Bongo

這是一個 Windows 桌面透明小程式原型：角色會浮在桌面上，並依照全域鍵盤、滑鼠操作做出反應。

## 需要
- Windows
- Node.js（建議 LTS）
- 網路（第一次安裝套件時需要）

## 啟動
1. 把整個資料夾放在電腦上。
2. 在資料夾空白處開啟 PowerShell / CMD。
3. 執行：
   npm install
4. 再執行：
   npm start

## 操作
- 任意鍵盤按鍵：角色做按鍵動作
- 滑鼠左/右鍵：角色做滑鼠動作
- F8：切換「滑鼠穿透」模式
- F12：關閉程式

## 更換角色圖片
把 `assets/pro-character.png` 換成你自己的透明 PNG，檔名保持一樣即可。

## 注意
這是可執行的開發版專案，不是已打包的 EXE。第一次使用需要安裝 Node.js 與套件。

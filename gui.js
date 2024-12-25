const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { fundChildWallets, startTrading, stopTrading } = require('./trading_bot');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile('index.html');

  ipcMain.on('fund-wallets', () => {
    fundChildWallets();
  });

  ipcMain.on('start-trading', () => {
    startTrading();
  });

  ipcMain.on('stop-trading', () => {
    stopTrading();
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
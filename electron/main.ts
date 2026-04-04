import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { app, BrowserWindow } from 'electron';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const preload = path.join(__dirname, 'preload.mjs');
const renderer = path.join(__dirname, '../dist/index.html');

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 1640,
    height: 980,
    minWidth: 1280,
    minHeight: 760,
    autoHideMenuBar: true,
    backgroundColor: '#070b15',
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      preload,
      contextIsolation: true,
      sandbox: false,
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    void mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
    return;
  }

  void mainWindow.loadFile(renderer);
}

app.whenReady().then(() => {
  app.setAppUserModelId('com.nick040791.new-guy-shell');
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

process.on('message', (message) => {
  if (message !== 'electron-vite&type=hot-reload') {
    return;
  }

  BrowserWindow.getAllWindows().forEach((window) => {
    void window.webContents.reload();
  });
});
import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('shellBridge', {
  channel: 'module-01-shell',
  platform: process.platform,
});
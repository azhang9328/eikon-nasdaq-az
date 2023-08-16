// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'gotData' | 'getApiData';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
};

const nasdaqApiHandler = {
  fetchApiData: async (...args: unknown[]) => {
    let result = await ipcRenderer.invoke('getApiData', ...args);
  },
  getApiData: async () => {
    ipcRenderer.on('gotData', (event, json) => {
      return json;
    });
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);
contextBridge.exposeInMainWorld('nasdaqApi', nasdaqApiHandler);

export type ElectronHandler = typeof electronHandler;
export type NasdaqApiHandler = typeof nasdaqApiHandler;

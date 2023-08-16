import { ElectronHandler, NasdaqApiHandler } from 'main/preload';

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    electron: ElectronHandler;
    nasdaqApi: NasdaqApiHandler;
  }
}

export {};

/// <reference types="vite/client" />

declare global {
  interface Window {
    shellBridge: {
      channel: string;
      platform: string;
    };
  }
}

export {};
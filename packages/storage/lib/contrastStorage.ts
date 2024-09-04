import { BaseStorage, createStorage, StorageType } from './base';

export type Contrast = 'normal' | 'high' | "dark-contrast" | "light-contrast";

type ContrastStorage = BaseStorage<Contrast> & {
  setContrast: (contrast: Contrast) => Promise<void>;
  toggle: () => Promise<void>;
};

const storage = createStorage<Contrast>('contrast-storage-key', 'normal', {
  storageType: StorageType.Local,
  liveUpdate: true,
});

export const contrastStorage: ContrastStorage = {
  ...storage,
  setContrast: async (contrast: Contrast) => {
    await storage.set(() => contrast);
  },
  toggle: async () => {
    await storage.set(currentContrast => {
      switch (currentContrast) {
        case 'normal':
          return 'high';
        case 'high':
          return 'dark-contrast';
        case 'dark-contrast':
          return 'light-contrast';
        // case 'high':
        default:
          return 'normal';
      }
    });
  },
};

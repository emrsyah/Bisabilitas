import { BaseStorage, createStorage, StorageType } from './base';

export type Contrast = 'normal' | 'low' | 'medium' | 'high';

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
          return 'low';
        case 'low':
          return 'medium';
        case 'medium':
          return 'high';
        case 'high':
        default:
          return 'normal';
      }
    });
  },
};

import { BaseStorage, createStorage, StorageType } from './base';

type Contrast = 'normal' | 'low' | 'medium' | 'high';

type ContrastStorage = BaseStorage<Contrast> & {
  setContrast: (contrast: Contrast) => Promise<void>;
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
};

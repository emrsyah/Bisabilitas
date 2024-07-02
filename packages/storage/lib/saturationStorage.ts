import { BaseStorage, createStorage, StorageType } from './base';

type SaturationLevel = 'normal' | 'low' | 'high';

type SaturationStorage = BaseStorage<SaturationLevel> & {
  toggle: () => Promise<void>;
};

const storage = createStorage<SaturationLevel>('saturation-storage-key', 'normal', {
  storageType: StorageType.Local,
  liveUpdate: true,
});

export const saturationStorage: SaturationStorage = {
  ...storage,
  toggle: async () => {
    await storage.set(currentLevel => {
      switch (currentLevel) {
        case 'normal':
          return 'low';
        case 'low':
          return 'high';
        case 'high':
          return 'normal';
        default:
          return 'normal';
      }
    });
  },
};

import { BaseStorage, createStorage, StorageType } from './base';

type MonochromeMode = 'enabled' | 'disabled';

type MonochromeModeStorage = BaseStorage<MonochromeMode> & {
  toggle: () => Promise<void>;
};

const storage = createStorage<MonochromeMode>('monochrome-mode-storage-key', 'disabled', {
  storageType: StorageType.Local,
  liveUpdate: true,
});

export const monochromeModeStorage: MonochromeModeStorage = {
  ...storage,
  toggle: async () => {
    await storage.set(currentStatus => {
      return currentStatus === 'disabled' ? 'enabled' : 'disabled';
    });
  },
};

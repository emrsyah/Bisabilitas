import { BaseStorage, createStorage, StorageType } from './base';

type TextMagnifier = 'enabled' | 'disabled';

type TextMagnifierStorage = BaseStorage<TextMagnifier> & {
  toggle: () => Promise<void>;
};

const storage = createStorage<TextMagnifier>('text-magnifier-storage-key', 'disabled', {
  storageType: StorageType.Local,
  liveUpdate: true,
});

export const textMagnifierStorage: TextMagnifierStorage = {
  ...storage,
  toggle: async () => {
    await storage.set(currentStatus => {
      return currentStatus === 'disabled' ? 'enabled' : 'disabled';
    });
  },
};

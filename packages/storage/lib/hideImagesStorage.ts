import { BaseStorage, createStorage, StorageType } from './base';

type HideImages = 'enabled' | 'disabled';

type HideImagesStorage = BaseStorage<HideImages> & {
  toggle: () => Promise<void>;
};

const storage = createStorage<HideImages>('hide-images-storage-key', 'disabled', {
  storageType: StorageType.Local,
  liveUpdate: true,
});

export const hideImagesStorage: HideImagesStorage = {
  ...storage,
  toggle: async () => {
    await storage.set(currentStatus => {
      return currentStatus === 'disabled' ? 'enabled' : 'disabled';
    });
  },
};

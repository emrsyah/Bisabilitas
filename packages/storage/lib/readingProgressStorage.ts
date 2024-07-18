import { BaseStorage, createStorage, StorageType } from './base';

type ReadingProgress = 'enabled' | 'disabled';

type ReadingProgressStorage = BaseStorage<ReadingProgress> & {
  toggle: () => Promise<void>;
};

const storage = createStorage<ReadingProgress>('reading-progress-storage-key', 'disabled', {
  storageType: StorageType.Local,
  liveUpdate: true,
});

export const readingProgressStorage: ReadingProgressStorage = {
  ...storage,
  toggle: async () => {
    await storage.set(currentStatus => {
      return currentStatus === 'disabled' ? 'enabled' : 'disabled';
    });
  },
};

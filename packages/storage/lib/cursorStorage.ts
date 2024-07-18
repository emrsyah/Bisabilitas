import { BaseStorage, createStorage, StorageType } from './base';

type CursorBigger = 'enabled' | 'disabled';

type CursorBiggerStorage = BaseStorage<CursorBigger> & {
  toggle: () => Promise<void>;
};

const storage = createStorage<CursorBigger>('cursor-bigger-storage-key', 'disabled', {
  storageType: StorageType.Local,
  liveUpdate: true,
});

export const cursorBiggerStorage: CursorBiggerStorage = {
  ...storage,
  toggle: async () => {
    await storage.set(currentStatus => {
      return currentStatus === 'disabled' ? 'enabled' : 'disabled';
    });
  },
};

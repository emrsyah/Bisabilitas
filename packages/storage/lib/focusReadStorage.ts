import { BaseStorage, createStorage, StorageType } from './base';

type FocusReadState = 'enabled' | 'disabled';

type FocusReadStorage = BaseStorage<FocusReadState> & {
  toggle: () => Promise<void>;
};

const storage = createStorage<FocusReadState>('focus-read-storage-key', 'disabled', {
  storageType: StorageType.Local,
  liveUpdate: true,
});

export const focusReadStorage: FocusReadStorage = {
  ...storage,
  toggle: async () => {
    await storage.set(currentState => {
      return currentState === 'disabled' ? 'enabled' : 'disabled';
    });
  },
};
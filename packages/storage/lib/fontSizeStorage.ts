import { BaseStorage, createStorage, StorageType } from './base';

type FontSizeState = 'normal' | 'medium' | 'large' | 'extra-large';

type FontSizeStorage = BaseStorage<FontSizeState> & {
  toggle: () => Promise<void>;
};

const storage = createStorage<FontSizeState>('font-size-storage-key', 'normal', {
  storageType: StorageType.Local,
  liveUpdate: true,
});

export const fontSizeStorage: FontSizeStorage = {
  ...storage,
  toggle: async () => {
    await storage.set(currentState => {
      const states: FontSizeState[] = ['normal', 'medium', 'large', 'extra-large'];
      const currentIndex = states.indexOf(currentState);
      const nextIndex = (currentIndex + 1) % states.length;
      return states[nextIndex];
    });
  },
};
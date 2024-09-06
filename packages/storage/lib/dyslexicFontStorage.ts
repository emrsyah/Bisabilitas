import { BaseStorage, createStorage, StorageType } from './base';

type DyslexicFontState = 'default' | 'openDyslexic' | 'arial';

type DyslexicFontStorage = BaseStorage<DyslexicFontState> & {
  toggle: () => Promise<void>;
};

const storage = createStorage<DyslexicFontState>('dyslexic-font-storage-key', 'default', {
  storageType: StorageType.Local,
  liveUpdate: true,
});

export const dyslexicFontStorage: DyslexicFontStorage = {
  ...storage,
  toggle: async () => {
    await storage.set(currentState => {
      return ((currentState === 'default') || (currentState == "arial")) ? 'openDyslexic' : 'default';
    });
  },
};
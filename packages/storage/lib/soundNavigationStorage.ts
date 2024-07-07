import { BaseStorage, createStorage, StorageType } from './base';

type SoundNavigationState = 'enabled' | 'disabled';

type SoundNavigationStorage = BaseStorage<SoundNavigationState> & {
  toggle: () => Promise<void>;
};

const storage = createStorage<SoundNavigationState>('sound-navigation-storage-key', 'disabled', {
  storageType: StorageType.Local,
  liveUpdate: true,
});

export const soundNavigationStorage: SoundNavigationStorage = {
  ...storage,
  toggle: async () => {
    await storage.set(currentState => {
      return currentState === 'disabled' ? 'enabled' : 'disabled';
    });
  },
};
import { BaseStorage, createStorage, StorageType } from './base';

type TextSpacingState = 'normal' | 'medium' | 'wide' | 'extra-wide';

type TextSpacingStorage = BaseStorage<TextSpacingState> & {
  toggle: () => Promise<void>;
};

const storage = createStorage<TextSpacingState>('text-spacing-storage-key', 'normal', {
  storageType: StorageType.Local,
  liveUpdate: true,
});

export const textSpacingStorage: TextSpacingStorage = {
  ...storage,
  toggle: async () => {
    await storage.set(currentState => {
      const states: TextSpacingState[] = ['normal', 'medium', 'wide', 'extra-wide'];
      const currentIndex = states.indexOf(currentState);
      const nextIndex = (currentIndex + 1) % states.length;
      return states[nextIndex];
    });
  },
};
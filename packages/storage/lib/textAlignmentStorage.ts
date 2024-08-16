import { BaseStorage, createStorage, StorageType } from './base';

type TextAlignmentState = 'normal' | 'left' | 'right' | 'justify' | 'center';

type TextAlignmentStorage = BaseStorage<TextAlignmentState> & {
  toggle: () => Promise<void>;
};

const storage = createStorage<TextAlignmentState>('text-alignment-storage-key', 'normal', {
  storageType: StorageType.Local,
  liveUpdate: true,
});

export const textAlignmentStorage: TextAlignmentStorage = {
  ...storage,
  toggle: async () => {
    await storage.set(currentState => {
      const states: TextAlignmentState[] = ['normal', 'left', 'right', 'justify', 'center'];
      const currentIndex = states.indexOf(currentState);
      const nextIndex = (currentIndex + 1) % states.length;
      return states[nextIndex];
    });
  },
};
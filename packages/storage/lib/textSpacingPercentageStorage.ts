import { BaseStorage, createStorage, StorageType } from './base';

type TextSpacingPercentage = number;

type TextSpacingStorage = BaseStorage<TextSpacingPercentage> & {
  increase: () => Promise<void>;
  decrease: () => Promise<void>;
  toggle: () => Promise<void>;
};

const DEFAULT_SPACING_SIZE = 100; // 100%
const STEP_SIZE = 10; // 10% per step
const MIN_SPACING_SIZE = 50; // 50%
const MAX_SPACING_SIZE = 200; // 200%

const storage = createStorage<TextSpacingPercentage>('text-spacing-storage-percentage-key', DEFAULT_SPACING_SIZE, {
  storageType: StorageType.Local,
  liveUpdate: true,
});

export const textSpacingStoragePercentage: TextSpacingStorage = {
  ...storage,
  increase: async () => {
    await storage.set(currentSize => {
      const newSize = currentSize + STEP_SIZE;
      return newSize > MAX_SPACING_SIZE ? MAX_SPACING_SIZE : newSize;
    });
  },
  decrease: async () => {
    await storage.set(currentSize => {
      const newSize = currentSize - STEP_SIZE;
      return newSize < MIN_SPACING_SIZE ? MIN_SPACING_SIZE : newSize;
    });
  },
  toggle: async () => {
    await storage.set((currentSize) => {
      let nextSize;
      if (currentSize < DEFAULT_SPACING_SIZE) {
        nextSize = 100;
      } else if (currentSize < 110) {
        nextSize = 110;
      } else if (currentSize < 130) {
        nextSize = 130;
      } else if (currentSize < 150) {
        nextSize = 150;
      } else {
        nextSize = 100;
      }
      return nextSize;
    });
  },
};
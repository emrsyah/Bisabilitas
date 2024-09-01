import { BaseStorage, createStorage, StorageType } from './base';

type FontSizePercentage = number;


type FontSizeStorage = BaseStorage<FontSizePercentage> & {
  increase: () => Promise<void>;
  decrease: () => Promise<void>;
  toggle: () => Promise<void>;
};

const DEFAULT_FONT_SIZE = 100; // 100%
const STEP_SIZE = 10; // 10% per step
const MIN_FONT_SIZE = 50; // 50%
const MAX_FONT_SIZE = 200; // 200%

const storage = createStorage<FontSizePercentage>('font-size-storage-percentage-key', DEFAULT_FONT_SIZE, {
  storageType: StorageType.Local,
  liveUpdate: true,
});

export const fontSizeStoragePercentage: FontSizeStorage = {
  ...storage,
  increase: async () => {
    await storage.set(currentSize => {
      const newSize = currentSize + STEP_SIZE;
      return newSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : newSize;
    });
  },
  decrease: async () => {
    await storage.set(currentSize => {
      const newSize = currentSize - STEP_SIZE;
      return newSize < MIN_FONT_SIZE ? MIN_FONT_SIZE : newSize;
    });
  },
  toggle: async () => {
    await storage.set((currentSize) => {
      let nextSize
      if (currentSize < DEFAULT_FONT_SIZE) {
        nextSize = 100;
      } else if (currentSize < 110) {
        nextSize = 110
      } else if (currentSize < 130){
        nextSize = 130
      } else if (currentSize < 150) {
        nextSize = 150
      } else {
        nextSize = 100
      }
      return nextSize;
    });
  },
};
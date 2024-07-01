import { BaseStorage, createStorage, StorageType } from './base';

// Define the possible font sizes
type FontSize = 'small' | 'normal' | 'medium' | 'large';

// Define the FontSizeStorage type which extends BaseStorage and adds methods for adjusting font size
type FontSizeStorage = BaseStorage<{ current: FontSize; previous: FontSize | null }> & {
  changeFontSize: (newSize: FontSize) => Promise<void>;
  resetFontSize: () => Promise<void>;
};

// Create the storage with 'normal' as the default font size
const storage = createStorage<{ current: FontSize; previous: FontSize | null }>('font-size-key', { current: 'normal', previous: null }, {
  storageType: StorageType.Local,
  liveUpdate: true,
});

// Extend the storage with methods to change the font size
export const fontSizeStorage: FontSizeStorage = {
  ...storage,
  // Method to change the font size
  changeFontSize: async (newSize: FontSize) => {
    const previousSize = storage.getSnapshot()?.current || 'normal';
    await storage.set({ current: newSize, previous: previousSize });
  },
  // Method to reset the font size to 'normal'
  resetFontSize: async () => {
    await storage.set({ current: 'normal', previous: null });
  },
};

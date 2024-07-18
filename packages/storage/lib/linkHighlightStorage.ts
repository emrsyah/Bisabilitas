import { BaseStorage, createStorage, StorageType } from './base';

type LinkHighlight = 'enabled' | 'disabled';

type LinkHighlightStorage = BaseStorage<LinkHighlight> & {
  toggle: () => Promise<void>;
};

const storage = createStorage<LinkHighlight>('link-highlight-storage-key', 'disabled', {
  storageType: StorageType.Local,
  liveUpdate: true,
});

export const linkHighlightStorage: LinkHighlightStorage = {
  ...storage,
  toggle: async () => {
    await storage.set(currentStatus => {
      return currentStatus === 'disabled' ? 'enabled' : 'disabled';
    });
  },
};

import { BaseStorage, createStorage, StorageType } from './base';

type AiAssistant = 'enabled' | 'disabled';

type AiAssistantStorage = BaseStorage<AiAssistant> & {
  toggle: () => Promise<void>;
};

const storage = createStorage<AiAssistant>('ai-assistant-storage-key', 'disabled', {
  storageType: StorageType.Local,
  liveUpdate: true,
});

export const aiAssistantStorage: AiAssistantStorage = {
  ...storage,
  toggle: async () => {
    await storage.set(currentStatus => {
      return currentStatus === 'disabled' ? 'enabled' : 'disabled';
    });
  },
};

import { BaseStorage, createStorage, StorageType } from './base';

export type AudioEnhancement = 'normal' | 'loud' | 'louder' | 'loudest';

type AudioEnhancementStorage = BaseStorage<AudioEnhancement> & {
  setAudioEnhancement: (audioEnhancement: AudioEnhancement) => Promise<void>;
  toggle: () => Promise<void>;
};

const storage = createStorage<AudioEnhancement>('audio-enhancement-storage-key', 'normal', {
  storageType: StorageType.Local,
  liveUpdate: true,
});

export const audioEnhancementStorage: AudioEnhancementStorage = {
  ...storage,
  setAudioEnhancement: async (audioEnhancement: AudioEnhancement) => {
    await storage.set(() => audioEnhancement);
  },
  toggle: async () => {
    await storage.set(currentAudioEnhancement => {
      switch (currentAudioEnhancement) {
        case 'normal':
          return 'loud';
        case 'loud':
          return 'louder';
        case 'louder':
          return 'loudest';
        case 'loudest':
            return 'normal';
        default:
          return 'normal';
      }
    });
  },
};

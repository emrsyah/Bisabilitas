import { BaseStorage, createStorage, StorageType } from './base';

type TokenAuth = string | null;

type TokenAuthStorage = BaseStorage<TokenAuth> & {
  setToken: (token: string) => Promise<void>;  // New function specifically for setting a token
};

const storage = createStorage<TokenAuth>('token-auth-storage-key', null, {
  storageType: StorageType.Local,
  liveUpdate: true,
});

export const tokenAuthStorage: TokenAuthStorage = {
  ...storage,
  setToken: async (token: string) => {
    await storage.set(token); // Directly set the token string
  },
};

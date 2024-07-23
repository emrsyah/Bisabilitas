interface ImportMetaEnv {
    readonly VITE_APP_MISTRAL_KEY: string;
    // more env variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
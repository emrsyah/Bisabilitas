interface ImportMetaEnv {
  readonly VITE_APP_MISTRAL_KEY: string;
  readonly VITE_APP_GOOGLE_CLIENT_ID: string;
  readonly VITE_APP_GOOGLE_SECRET: string;
  readonly VITE_APP_BACKEND_URL: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DATA_SOURCE: 'mock' | 'csv' | 'api';
  readonly VITE_CSV_URL: string;
  readonly VITE_API_BASE_URL: string;
  readonly VITE_LOGO_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

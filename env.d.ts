/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// Google Login component declaration
declare module 'vue3-google-login' {
  import type { App } from 'vue'
  import type { DefineComponent } from 'vue'
  
  export const GoogleLogin: DefineComponent<{
    callback: (response: any) => void
    'auto-login'?: boolean
    popupType?: boolean
  }>
  
  export default function install(app: App, options: { clientId: string }): void
}

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_GOOGLE_CLIENT_ID: string
  readonly VITE_ENV_DEBUG: string
  readonly DEV: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Vue Single File Component declarations
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// Specific component declarations for better type safety
declare module '@/components/NavBar.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}

declare module '@/components/DebugPanel.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}

declare module '@/components/ConvertMeterToFeet.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}

declare module '@/components/authentication/Login.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}

// Relative path declarations
declare module './components/NavBar.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}

declare module './components/DebugPanel.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}

declare module '../components/ConvertMeterToFeet.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}

declare module '../components/authentication/Login.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}

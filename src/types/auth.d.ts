// Pinia store type definitions
import type { Ref, ComputedRef } from 'vue'

export interface User {
  id?: string | number
  email?: string
  name?: string
  first_name?: string
  last_name?: string
  [key: string]: any
}

export interface AuthStore {
  token: Ref<string | null>
  user: Ref<User | null>
  isLoading: Ref<boolean>
  isAuthenticated: ComputedRef<boolean>
  currentUser: ComputedRef<User | null>
  login: (credentials: { email?: string; password?: string; id_token?: string }) => Promise<{ success: boolean; data: any }>
  logout: () => Promise<void>
  fetchUserProfile: () => Promise<void>
  checkAuth: () => Promise<boolean>
  initAuth: () => void
  setToken: (token: string) => void
  setUser: (user: User) => void
  clearAuth: () => void
}

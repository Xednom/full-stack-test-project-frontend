import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { apiPost, apiGet, ApiError } from '../utils/api'

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export const useAuthStore = defineStore('auth', () => {
  // State
  const token = ref<string | null>(localStorage.getItem('auth_token'))
  const user = ref<any>(null)
  const isLoading = ref(false)

  // Getters
  const isAuthenticated = computed(() => !!token.value)
  const currentUser = computed(() => user.value)

  // Actions
  function setToken(newToken: string) {
    token.value = newToken
    localStorage.setItem('auth_token', newToken)
  }

  function setUser(userData: any) {
    user.value = userData
    localStorage.setItem('user_data', JSON.stringify(userData))
  }

  function clearAuth() {
    token.value = null
    user.value = null
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_data')
  }

  async function login(credentials: { email?: string; password?: string; id_token?: string }) {
    isLoading.value = true
    try {
      let data
      
      if (credentials.id_token) {
        // Google login
        data = await apiPost('/api/v1/auth/google/', { id_token: credentials.id_token })
      } else {
        // Email/password login
        data = await apiPost('/api/v1/auth/login/', {
          email: credentials.email,
          password: credentials.password,
        })
      }
      
      if (data.key || data.access_token || data.token) {
        const authToken = data.key || data.access_token || data.token
        setToken(authToken)
        
        // If user data is included in response, store it
        if (data.user) {
          setUser(data.user)
        } else {
          // Fetch user data separately if not included
          await fetchUserProfile()
        }
        
        return { success: true, data }
      } else {
        throw new Error('No authentication token received')
      }
    } catch (error) {
      clearAuth()
      if (error instanceof ApiError) {
        throw new Error(error.message)
      }
      throw error
    } finally {
      isLoading.value = false
    }
  }

  async function logout() {
    try {
      // Optionally call logout endpoint
      if (token.value) {
        await apiPost('/api/v1/auth/logout/', {}, token.value).catch(() => {
          // Ignore logout API errors, still clear local auth
        })
      }
    } finally {
      clearAuth()
    }
  }

  async function fetchUserProfile() {
    if (!token.value) return

    try {
      const userData = await apiGet('/api/v1/auth/user/', token.value)
      setUser(userData)
    } catch (error) {
      console.error('Failed to fetch user profile:', error)
      if (error instanceof ApiError && error.status === 401) {
        // Token is invalid, clear auth
        clearAuth()
      }
    }
  }

  async function checkAuth() {
    if (token.value) {
      try {
        await fetchUserProfile()
        return true
      } catch (error) {
        clearAuth()
        return false
      }
    }
    return false
  }

  // Initialize store
  function initAuth() {
    const storedUser = localStorage.getItem('user_data')
    if (storedUser) {
      try {
        user.value = JSON.parse(storedUser)
      } catch (e) {
        localStorage.removeItem('user_data')
      }
    }
  }

  return {
    // State
    token,
    user,
    isLoading,
    // Getters
    isAuthenticated,
    currentUser,
    // Actions
    login,
    logout,
    fetchUserProfile,
    checkAuth,
    initAuth,
    setToken,
    setUser,
    clearAuth
  }
})

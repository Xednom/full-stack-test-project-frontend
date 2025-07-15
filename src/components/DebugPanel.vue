<template>
  <div class="debug-panel" v-if="showDebug">
    <div class="debug-header">
      <h3>🔍 Authentication Debug Panel</h3>
      <button @click="toggleDebug" class="close-btn">✕</button>
    </div>
    
    <div class="debug-content">
      <div class="debug-section">
        <h4>Auth Store State</h4>
        <div class="debug-item">
          <strong>Is Authenticated:</strong> {{ authStore.isAuthenticated }}
        </div>
        <div class="debug-item">
          <strong>Has Token:</strong> {{ !!authStore.token }}
        </div>
        <div class="debug-item">
          <strong>Token Preview:</strong> {{ tokenPreview }}
        </div>
        <div class="debug-item">
          <strong>User Data:</strong> {{ authStore.currentUser ? 'Available' : 'None' }}
        </div>
        <div class="debug-item">
          <strong>Loading State:</strong> {{ authStore.isLoading }}
        </div>
      </div>

      <div class="debug-section">
        <h4>Environment Variables</h4>
        <div class="debug-item">
          <strong>API Base URL:</strong> {{ apiBaseUrl }}
        </div>
        <div class="debug-item">
          <strong>Google Client ID:</strong> {{ googleClientId ? 'Set' : 'Not Set' }}
        </div>
      </div>

      <div class="debug-section">
        <h4>Local Storage</h4>
        <div class="debug-item">
          <strong>Auth Token:</strong> {{ storedToken ? 'Present' : 'None' }}
        </div>
        <div class="debug-item">
          <strong>User Data:</strong> {{ storedUser ? 'Present' : 'None' }}
        </div>
      </div>

      <div class="debug-section">
        <h4>Test Actions</h4>
        <div class="debug-actions">
          <button @click="testUserProfile" class="debug-btn" :disabled="!authStore.token">
            Test User Profile API
          </button>
          <button @click="clearStorage" class="debug-btn danger">
            Clear Auth Storage
          </button>
          <button @click="testGoogleLogin" class="debug-btn">
            Test Google Login
          </button>
        </div>
      </div>

      <div class="debug-section" v-if="apiTestResult">
        <h4>API Test Result</h4>
        <pre class="debug-result">{{ apiTestResult }}</pre>
      </div>
    </div>
  </div>
  
  <button 
    @click="toggleDebug" 
    class="debug-toggle"
    :class="{ active: showDebug }"
  >
    🐛 Debug
  </button>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { getApiBaseUrl, apiGet } from '../utils/api'

const authStore = useAuthStore()
const showDebug = ref(false)
const apiTestResult = ref('')

const apiBaseUrl = getApiBaseUrl()
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

const tokenPreview = computed(() => {
  if (!authStore.token) return 'None'
  const token = authStore.token
  return token.length > 20 ? `${token.substring(0, 10)}...${token.substring(token.length - 10)}` : token
})

const storedToken = computed(() => localStorage.getItem('auth_token'))
const storedUser = computed(() => localStorage.getItem('user_data'))

function toggleDebug() {
  showDebug.value = !showDebug.value
}

async function testUserProfile() {
  try {
    apiTestResult.value = 'Testing user profile API...'
    const result = await apiGet('/api/v1/auth/user/', authStore.token)
    apiTestResult.value = JSON.stringify(result, null, 2)
  } catch (error) {
    apiTestResult.value = `Error: ${error.message}\n${JSON.stringify(error, null, 2)}`
  }
}

function clearStorage() {
  authStore.clearAuth()
  apiTestResult.value = 'Auth storage cleared'
}

function testGoogleLogin() {
  apiTestResult.value = 'Google login test would trigger here. Check if GoogleLogin component is working.'
}
</script>

<style scoped>
.debug-toggle {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #667eea;
  color: white;
  border: none;
  padding: 12px 16px;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  transition: all 0.2s ease;
  z-index: 1000;
}

.debug-toggle:hover {
  background: #4f46e5;
  transform: translateY(-2px);
}

.debug-toggle.active {
  background: #dc2626;
}

.debug-panel {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 400px;
  max-height: calc(100vh - 40px);
  background: white;
  border-radius: 12px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  z-index: 1001;
  overflow: hidden;
}

.debug-header {
  background: #667eea;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.debug-header h3 {
  margin: 0;
  font-size: 1rem;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.debug-content {
  max-height: calc(100vh - 120px);
  overflow-y: auto;
  padding: 1rem;
}

.debug-section {
  margin-bottom: 1.5rem;
}

.debug-section h4 {
  margin: 0 0 0.5rem 0;
  color: #374151;
  font-size: 0.9rem;
  font-weight: 600;
}

.debug-item {
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
  color: #6b7280;
}

.debug-item strong {
  color: #374151;
}

.debug-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.debug-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #e5e7eb;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.2s ease;
}

.debug-btn:hover {
  background: #f3f4f6;
}

.debug-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.debug-btn.danger {
  background: #fef2f2;
  border-color: #fecaca;
  color: #dc2626;
}

.debug-btn.danger:hover {
  background: #fee2e2;
}

.debug-result {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 0.75rem;
  font-size: 0.7rem;
  white-space: pre-wrap;
  max-height: 200px;
  overflow-y: auto;
  color: #374151;
}

@media (max-width: 500px) {
  .debug-panel {
    width: calc(100vw - 40px);
    right: 20px;
  }
}
</style>

<script setup lang="ts">
import { RouterView, useRoute } from "vue-router";
import { onMounted, computed } from "vue";
import { useAuthStore } from "./stores/auth";
import NavBar from "./components/NavBar.vue";
import DebugPanel from "./components/DebugPanel.vue";

const route = useRoute();
const authStore = useAuthStore();

// Initialize auth state when app loads
onMounted(() => {
  authStore.initAuth();
});

// Check if current route is login page
const isLoginPage = computed(() => route.name === 'login');
// Show debug panel in development
const isDev = import.meta.env.DEV;
</script>

<template>
  <div id="app">
    <!-- Show navbar on all pages except login -->
    <NavBar v-if="!isLoginPage && authStore.isAuthenticated" />
    
    <main class="main-content" :class="{ 'no-nav': isLoginPage || !authStore.isAuthenticated }">
      <RouterView />
    </main>
    
    <!-- Debug panel (only in development) -->
    <DebugPanel v-if="isDev" />
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding-top: 0;
}

.main-content.no-nav {
  padding-top: 0;
}

/* Global styles for authenticated pages */
.main-content:not(.no-nav) {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

@media (max-width: 768px) {
  .main-content:not(.no-nav) {
    padding: 1rem;
  }
}
</style>

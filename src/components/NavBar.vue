<template>
  <nav class="navbar">
    <div class="nav-container">
      <div class="nav-brand">
        <router-link to="/" class="brand-link"
          >Full stack test project</router-link
        >
      </div>

      <div class="nav-menu">
        <router-link to="/" class="nav-link">Home</router-link>

        <div class="user-menu" v-if="authStore.isAuthenticated">
          <div class="user-info">
            <span class="user-name">{{
              authStore.currentUser?.name ||
              authStore.currentUser?.email ||
              "User"
            }}</span>
            <button @click="handleLogout" class="logout-btn">Logout</button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const router = useRouter();
const authStore = useAuthStore();

async function handleLogout() {
  try {
    await authStore.logout();
    router.push("/login");
  } catch (error) {
    console.error("Logout error:", error);
    // Force logout even if API call fails
    authStore.clearAuth();
    router.push("/login");
  }
}
</script>

<style scoped>
.navbar {
  padding: 0;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}

.nav-brand .brand-link {
  font-size: 1.5rem;
  font-weight: 700;
  color: #667eea;
  text-decoration: none;
  transition: color 0.2s ease;
}

.nav-brand .brand-link:hover {
  color: #4f46e5;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-link {
  color: #6b7280;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #667eea;
  background: #f3f4f6;
}

.user-menu {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-name {
  color: #374151;
  font-weight: 500;
}

.logout-btn {
  background: #dc2626;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.logout-btn:hover {
  background: #b91c1c;
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .nav-container {
    padding: 1rem;
  }

  .nav-menu {
    gap: 1rem;
  }

  .user-name {
    display: none;
  }
}
</style>

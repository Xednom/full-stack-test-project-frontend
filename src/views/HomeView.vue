<script setup lang="ts">
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();
</script>

<template>
  <div class="home">
    <div class="welcome-section">
      <h1>Welcome to Your Dashboard</h1>
      <p class="welcome-text">
        Hello,
        {{
          authStore.currentUser?.name || authStore.currentUser?.email || "User"
        }}! You are successfully authenticated.
      </p>
    </div>
  </div>
</template>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.welcome-section {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
}

.welcome-section h1 {
  font-size: 2.5rem;
  margin: 0 0 1rem 0;
  font-weight: 700;
}

.welcome-text {
  font-size: 1.2rem;
  margin: 0;
  opacity: 0.9;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.dashboard-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.dashboard-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.card-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.dashboard-card h3 {
  color: #374151;
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.dashboard-card p {
  color: #6b7280;
  margin: 0 0 1.5rem 0;
  line-height: 1.5;
}

.card-button {
  background: #667eea;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
}

.card-button:hover {
  background: #4f46e5;
  transform: translateY(-1px);
}

.user-info {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 2rem;
}

.user-info h2 {
  color: #374151;
  margin: 0 0 1.5rem 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.info-item {
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.info-item strong {
  color: #374151;
}

@media (max-width: 768px) {
  .home {
    padding: 1rem;
  }

  .welcome-section h1 {
    font-size: 2rem;
  }

  .welcome-text {
    font-size: 1rem;
  }

  .dashboard-grid {
    grid-template-columns: 1fr;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }
}
</style>

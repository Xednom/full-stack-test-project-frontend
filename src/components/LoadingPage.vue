<template>
  <div class="loading-container">
    <div class="loading-content">
      <div class="spinner"></div>
      <h3>Loading...</h3>
      <p>Please wait while we verify your authentication</p>
    </div>
  </div>
</template>

<script setup>
// No script needed for this simple component
</script>

<style scoped>
.loading-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f9fafb;
}

.loading-content {
  text-align: center;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid #f3f4f6;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1.5rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

h3 {
  color: #374151;
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  font-weight: 600;
}

p {
  color: #6b7280;
  margin: 0;
  font-size: 0.95rem;
}
</style>

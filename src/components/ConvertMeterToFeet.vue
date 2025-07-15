<template>
  <div class="converter-container">
    <div class="converter-card">
      <div class="converter-header">
        <h2 class="converter-title">📏 Meter to Feet Converter</h2>
        <p class="converter-subtitle">Convert meters to feet using our API</p>
      </div>

      <form @submit.prevent="convertMetersToFeet" class="conversion-form">
        <div class="form-group">
          <label for="meters" class="form-label">Meters:</label>
          <input
            type="number"
            id="meters"
            v-model="meters"
            step="0.01"
            required
            class="form-input"
            :disabled="isLoading"
            placeholder="Enter meters (e.g., 10.5)"
          />
        </div>

        <button
          type="submit"
          :disabled="isLoading || !meters"
          class="convert-button"
        >
          <span v-if="isLoading" class="loading-spinner"></span>
          {{ isLoading ? "Converting..." : "Convert to Feet" }}
        </button>
      </form>

      <!-- Error Display -->
      <div v-if="error" class="error-message">
        <div class="error-icon">⚠️</div>
        <p>{{ error }}</p>
        <button @click="clearError" class="error-clear">Clear</button>
      </div>

      <!-- Success Result -->
      <div v-if="result" class="result-container">
        <div class="result-header">
          <h3>✅ Conversion Result</h3>
        </div>
        <div class="result-content">
          <div class="result-item">
            <span class="result-label">Input:</span>
            <span class="result-value">{{ result.meters }} meters</span>
          </div>
          <div class="result-item main-result">
            <span class="result-label">Result:</span>
            <span class="result-value">{{ result.feet }} feet</span>
          </div>
          <div class="result-item">
            <span class="result-label">Rate:</span>
            <span class="result-value">{{ result.conversion_rate }}</span>
          </div>
        </div>
      </div>

      <!-- Conversion History -->
      <div v-if="history.length > 0" class="history-container">
        <h4 class="history-title">Recent Conversions</h4>
        <div class="history-list">
          <div
            v-for="(item, index) in history.slice(0, 5)"
            :key="index"
            class="history-item"
          >
            <span>{{ item.meters }}m</span>
            <span class="history-arrow">→</span>
            <span>{{ item.feet }}ft</span>
          </div>
        </div>
        <button @click="clearHistory" class="clear-history-btn">
          Clear History
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { apiPost } from "../utils/api";

const authStore = useAuthStore();

// Reactive state
const meters = ref("");
const result = ref(null);
const error = ref("");
const isLoading = ref(false);
const history = ref([]);

// Convert meters to feet
async function convertMetersToFeet() {
  if (!meters.value) return;

  isLoading.value = true;
  error.value = "";
  result.value = null;

  try {
    const response = await apiPost(
      "/api/v1/convert-meter-to-feet/",
      { meters: parseFloat(meters.value) },
      authStore.token
    );

    result.value = response;

    // Add to history
    history.value.unshift({
      meters: response.meters,
      feet: response.feet,
      timestamp: new Date().toLocaleTimeString(),
    });

    // Keep only last 10 conversions
    if (history.value.length > 10) {
      history.value = history.value.slice(0, 10);
    }
  } catch (err) {
    console.error("Conversion error:", err);
    error.value =
      err.message || "Failed to convert meters to feet. Please try again.";
  } finally {
    isLoading.value = false;
  }
}

function clearError() {
  error.value = "";
}

function clearHistory() {
  history.value = [];
}
</script>

<style scoped>
.converter-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

.converter-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  border: 1px solid #e5e7eb;
}

.converter-header {
  text-align: center;
  margin-bottom: 2rem;
}

.converter-title {
  color: #1f2937;
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
}

.converter-subtitle {
  color: #6b7280;
  font-size: 1rem;
  margin: 0;
}

.conversion-form {
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  color: #374151;
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-input:disabled {
  background: #f9fafb;
  color: #9ca3af;
  cursor: not-allowed;
}

.convert-button {
  width: 100%;
  background: #667eea;
  color: white;
  border: none;
  padding: 0.875rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.convert-button:hover:not(:disabled) {
  background: #4f46e5;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.convert-button:disabled {
  background: #9ca3af;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error-message {
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.error-icon {
  font-size: 1.25rem;
  flex-shrink: 0;
}

.error-message p {
  color: #dc2626;
  margin: 0;
  flex: 1;
  font-weight: 500;
}

.error-clear {
  background: #dc2626;
  color: white;
  border: none;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;
  flex-shrink: 0;
}

.result-container {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.result-header h3 {
  color: #166534;
  margin: 0 0 1rem 0;
  font-size: 1.125rem;
}

.result-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.result-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.result-item.main-result {
  background: white;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid #bbf7d0;
}

.result-label {
  color: #374151;
  font-weight: 600;
}

.result-value {
  color: #166534;
  font-weight: 700;
}

.main-result .result-value {
  font-size: 1.25rem;
}

.history-container {
  border-top: 1px solid #e5e7eb;
  padding-top: 1.5rem;
}

.history-title {
  color: #374151;
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.history-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  background: #f9fafb;
  color: black;
  border-radius: 6px;
  font-size: 0.875rem;
}

.history-arrow {
  color: #667eea;
  font-weight: bold;
}

.clear-history-btn {
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.clear-history-btn:hover {
  background: #e5e7eb;
}

@media (max-width: 768px) {
  .converter-container {
    padding: 1rem;
  }

  .converter-card {
    padding: 1.5rem;
  }

  .result-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }

  .history-item {
    justify-content: center;
  }
}
</style>

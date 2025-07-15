<script setup>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "../../stores/auth";

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

// Reactive data
const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const showPassword = ref(false);
const error = ref("");
const success = ref("");

// Use loading state from auth store
const loading = computed(() => authStore.isLoading);

// Google login handler
async function handleGoogleLogin(response) {
  try {
    const idToken = response.credential;
    console.info("Google ID Token received:", idToken);

    await authStore.login({ id_token: idToken });

    success.value = "Login successful! Redirecting...";

    // Redirect to intended page or home
    const redirectPath = route.query.redirect || "/";
    setTimeout(() => {
      router.push(redirectPath);
    }, 1000);
  } catch (err) {
    console.error("Google login error:", err);
    error.value = err.message || "Google login failed. Please try again.";
  }
}

// Email/Password login handler
async function handleEmailLogin() {
  try {
    error.value = "";

    await authStore.login({
      email: email.value,
      password: password.value,
    });

    success.value = "Login successful! Redirecting...";

    // Redirect to intended page or home
    const redirectPath = route.query.redirect || "/";
    setTimeout(() => {
      router.push(redirectPath);
    }, 1000);
  } catch (err) {
    console.error("Email login error:", err);
    error.value = err.message || "Invalid email or password. Please try again.";
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <!-- Header -->
      <div class="login-header">
        <h1>Welcome Back</h1>
        <p>Sign in to your account</p>
      </div>

      <!-- Messages -->
      <div v-if="error" class="message error">
        {{ error }}
      </div>
      <div v-if="success" class="message success">
        {{ success }}
      </div>

      <!-- Google Login -->
      <div class="google-login-section">
        <GoogleLogin :callback="handleGoogleLogin" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
}

.login-card {
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-header h1 {
  color: var(--color-heading);
  font-size: 1.875rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.login-header p {
  color: var(--color-text);
  opacity: 0.8;
}

.message {
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  font-size: 0.875rem;
}

.message.error {
  background-color: #fee2e2;
  color: #dc2626;
  border: 1px solid #fca5a5;
}

.message.success {
  background-color: #d1fae5;
  color: #059669;
  border: 1px solid #6ee7b7;
}

@media (prefers-color-scheme: dark) {
  .message.error {
    background-color: #451a1a;
    color: #f87171;
    border-color: #7f1d1d;
  }

  .message.success {
    background-color: #064e3b;
    color: #34d399;
    border-color: #065f46;
  }
}

.login-form {
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  color: var(--color-heading);
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background: var(--color-background);
  color: var(--color-text);
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-group input:focus {
  outline: none;
  border-color: hsla(160, 100%, 37%, 1);
  box-shadow: 0 0 0 3px hsla(160, 100%, 37%, 0.1);
}

.password-input {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--color-text);
  cursor: pointer;
  font-size: 0.875rem;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.password-toggle:hover {
  opacity: 1;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  color: var(--color-text);
  cursor: pointer;
}

.checkbox-label input {
  width: auto;
  margin-right: 0.5rem;
}

.forgot-link {
  color: hsla(160, 100%, 37%, 1);
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s;
}

.forgot-link:hover {
  color: hsla(160, 100%, 30%, 1);
}

.login-btn {
  width: 100%;
  padding: 0.75rem;
  background: hsla(160, 100%, 37%, 1);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.login-btn:hover:not(:disabled) {
  background: hsla(160, 100%, 30%, 1);
}

.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.divider {
  position: relative;
  text-align: center;
  margin: 1.5rem 0;
}

.divider::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--color-border);
}

.divider span {
  background: var(--color-background-soft);
  color: var(--color-text);
  padding: 0 1rem;
  font-size: 0.875rem;
  opacity: 0.7;
}

.google-login-section {
  margin-bottom: 1.5rem;
}

.signup-link {
  text-align: center;
  color: var(--color-text);
  font-size: 0.875rem;
}

.signup-link a {
  color: hsla(160, 100%, 37%, 1);
  text-decoration: none;
}

.signup-link a:hover {
  color: hsla(160, 100%, 30%, 1);
}
</style>

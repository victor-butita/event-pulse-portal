<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { ApiError } from '@/api/client'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')

const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

async function handleLogin() {
  errorMessage.value = ''
  successMessage.value = ''
  loading.value = true

  try {
    const response = await auth.login(
      email.value,
      password.value,
    )

    successMessage.value = response.message

    await router.push('/events')
  } catch (error) {
    if (error instanceof ApiError) {
      errorMessage.value = error.message
    } else if (error instanceof Error) {
      errorMessage.value = error.message
    } else {
      errorMessage.value = 'Login failed. Please try again.'
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="card auth-card">
    <h1>Sign in</h1>

    <p class="lede">
      Sign in to your EventPulse account.
    </p>

    <form @submit.prevent="handleLogin">
      <label>
        Email
        <input
          v-model="email"
          type="email"
          placeholder="you@example.com"
          autocomplete="email"
          required
        />
      </label>

      <label>
        Password
        <input
          v-model="password"
          type="password"
          placeholder="Enter your password"
          autocomplete="current-password"
          required
        />
      </label>

      <div class="actions">
        <button
          class="btn"
          type="submit"
          :disabled="loading"
        >
          {{ loading ? 'Signing in...' : 'Sign in' }}
        </button>
      </div>
    </form>

    <p v-if="errorMessage" class="msg error">
      {{ errorMessage }}
    </p>

    <p v-if="successMessage" class="msg">
      {{ successMessage }}
    </p>

    <p class="auth-link">
      Don't have an account?
      <RouterLink to="/register">
        Create an account
      </RouterLink>
    </p>
  </section>
</template>
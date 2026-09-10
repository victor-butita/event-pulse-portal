<template>
  <section class="card auth-card">
    <h1>Create an account</h1>

    <p class="lede">
      Register for EventPulse as an attendee or organizer.
    </p>

    <form @submit.prevent="handleRegister">
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
          autocomplete="new-password"
          required
        />
      </label>

      <label>
        Role
        <select v-model="role" required>
          <option value="ATTENDEE">
            Attendee
          </option>

          <option value="ORGANIZER">
            Organizer
          </option>
        </select>
      </label>

      <div class="actions">
        <button
          class="btn"
          type="submit"
          :disabled="loading"
        >
          {{ loading ? 'Creating account...' : 'Create account' }}
        </button>
      </div>
    </form>

    <p
      v-if="errorMessage"
      class="msg error"
    >
      {{ errorMessage }}
    </p>

    <p
      v-if="successMessage"
      class="msg"
    >
      {{ successMessage }}
    </p>

    <p class="auth-link">
      Already have an account?
      <RouterLink to="/login">
        Sign in
      </RouterLink>
    </p>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { ApiError } from '@/api/client'
import type { Role } from '@/types/api'

const router = useRouter()
const auth = useAuthStore()

const email = ref('')
const password = ref('')
const role = ref<Role>('ATTENDEE')

const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

async function handleRegister() {
  errorMessage.value = ''
  successMessage.value = ''
  loading.value = true

  try {
    const response = await auth.register(
      email.value,
      password.value,
      role.value,
    )

    successMessage.value = response.message

    await router.push('/events')
  } catch (error) {
    if (error instanceof ApiError) {
      errorMessage.value = error.message
    } else if (error instanceof Error) {
      errorMessage.value = error.message
    } else {
      errorMessage.value = 'Registration failed. Please try again.'
    }
  } finally {
    loading.value = false
  }
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ApiError } from '@/api/client'
import { useAuthStore } from '@/stores/auth'
import type { Role } from '@/types/api'

const auth = useAuthStore()
const router = useRouter()
const email = ref('')
const password = ref('')
const role = ref<Role>('ATTENDEE')
const pending = ref(false)
const error = ref('')

async function onSubmit() {
  pending.value = true
  error.value = ''
  try {
    await auth.register(email.value, password.value, role.value)
    await router.push('/events')
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : 'Registration failed'
  } finally {
    pending.value = false
  }
}
</script>

<template>
  <section class="card" style="max-width: 28rem">
    <h1>Register</h1>
    <p class="lede">Password must be at least 8 characters. Role maps to the API enum.</p>
    <form @submit.prevent="onSubmit">
      <label>
        Email
        <input v-model="email" type="email" required autocomplete="username" />
      </label>
      <label>
        Password
        <input
          v-model="password"
          type="password"
          required
          minlength="8"
          autocomplete="new-password"
        />
      </label>
      <label>
        Role
        <select v-model="role">
          <option value="ATTENDEE">Attendee</option>
          <option value="ORGANIZER">Organizer</option>
        </select>
      </label>
      <div class="actions">
        <button class="btn" type="submit" :disabled="pending">
          {{ pending ? 'Creating…' : 'Create account' }}
        </button>
      </div>
      <p v-if="error" class="msg error">{{ error }}</p>
    </form>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ApiError } from '@/api/client'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()
const email = ref('')
const password = ref('')
const pending = ref(false)
const error = ref('')

async function onSubmit() {
  pending.value = true
  error.value = ''
  try {
    await auth.login(email.value, password.value)
    await router.push('/events')
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : 'Sign in failed'
  } finally {
    pending.value = false
  }
}
</script>

<template>
  <section class="card" style="max-width: 28rem">
    <h1>Sign in</h1>
    <p class="lede">Use the account you registered against EventPulse API.</p>
    <form @submit.prevent="onSubmit">
      <label>
        Email
        <input v-model="email" type="email" required autocomplete="username" />
      </label>
      <label>
        Password
        <input v-model="password" type="password" required autocomplete="current-password" />
      </label>
      <div class="actions">
        <button class="btn" type="submit" :disabled="pending">
          {{ pending ? 'Signing in…' : 'Sign in' }}
        </button>
      </div>
      <p v-if="error" class="msg error">{{ error }}</p>
    </form>
  </section>
</template>

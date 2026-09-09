<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { fetchHealth } from '@/api/events'
import { getApiBaseUrl } from '@/api/client'

const apiBase = getApiBaseUrl()
const status = ref<'checking' | 'up' | 'down'>('checking')
const detail = ref('')

onMounted(async () => {
  try {
    const health = await fetchHealth()
    status.value = health.status === 'UP' ? 'up' : 'down'
    detail.value = `${health.service} · ${health.timestamp}`
  } catch (error) {
    status.value = 'down'
    detail.value = error instanceof Error ? error.message : 'API unreachable'
  }
})
</script>

<template>
  <section>
    <h1>Book the room. Keep the ticket.</h1>
    <p class="lede">
      EventPulse Portal talks to the production API over HTTPS. Register, sign in, and browse
      events while the backend stays the source of truth.
    </p>

    <div class="card">
      <p class="status">
        <span class="dot" :class="{ up: status === 'up' }" />
        API {{ status }}
      </p>
      <p class="meta">{{ apiBase || 'VITE_API_BASE_URL is not set' }}</p>
      <p class="meta">{{ detail }}</p>
      <div class="actions">
        <RouterLink class="btn" to="/register">Create account</RouterLink>
        <RouterLink class="btn secondary" to="/events">View events</RouterLink>
      </div>
    </div>
  </section>
</template>

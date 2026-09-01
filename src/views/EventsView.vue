<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { fetchEvents } from '@/api/events'
import { ApiError } from '@/api/client'
import type { EventItem } from '@/types/api'

const events = ref<EventItem[]>([])
const error = ref('')
const loading = ref(true)

onMounted(async () => {
  try {
    const page = await fetchEvents()
    events.value = page.content
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : 'Could not load events'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section>
    <h1>Events</h1>
    <p class="lede">Live list from <code>GET /api/events</code>.</p>
    <p v-if="loading" class="meta">Loading…</p>
    <p v-else-if="error" class="msg error">{{ error }}</p>
    <p v-else-if="events.length === 0" class="meta">No events yet.</p>
    <div v-else class="grid">
      <article v-for="event in events" :key="event.id" class="card event">
        <span class="pill">{{ event.status }}</span>
        <h2>{{ event.title }}</h2>
        <p class="meta">{{ event.location }} · {{ event.date }}</p>
        <p>{{ event.description }}</p>
        <p class="meta">{{ event.ticketsBooked }} / {{ event.ticketQuota }} booked</p>
      </article>
    </div>
  </section>
</template>

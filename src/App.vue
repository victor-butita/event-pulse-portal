<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
</script>

<template>
  <div class="shell">
    <header class="topbar">
      <RouterLink class="brand" to="/">
        <strong>EventPulse</strong>
        <span>Portal</span>
      </RouterLink>
      <nav class="nav">
        <RouterLink to="/events">Events</RouterLink>
        <template v-if="auth.isAuthenticated">
          <button class="btn secondary" type="button" @click="auth.logout">Sign out</button>
        </template>
        <template v-else>
          <RouterLink to="/login">Sign in</RouterLink>
          <RouterLink to="/register">Register</RouterLink>
        </template>
      </nav>
    </header>
    <RouterView />
  </div>
</template>

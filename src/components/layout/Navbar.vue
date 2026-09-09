<template>
  <nav class="nav">
    <RouterLink to="/events">
      Events
    </RouterLink>

    <template v-if="auth.isAuthenticated">
      <button
        class="btn secondary"
        type="button"
        @click="auth.logout"
      >
        Sign out
      </button>
    </template>

    <template v-else>
      <RouterLink to="/login">
        Sign in
      </RouterLink>

      <RouterLink to="/register">
        Register
      </RouterLink>
    </template>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
</script>
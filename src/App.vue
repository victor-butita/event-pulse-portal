<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
</script>

<template>
  <div class="shell">
    <header class="topbar">
      <RouterLink class="brand" to="/">
        <strong>EventPulse</strong>
        <span>Event Management Portal</span>
      </RouterLink>

      <Navbar />
    </header>

    <main class="page-content">
      <RouterView />
    </main>

    <Footer />
  </div>
</template>
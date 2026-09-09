<template>
  <footer class="footer">
    <p>
      © {{ year }} EventPulse. All rights reserved.
    </p>

    <p class="footer-text">
      Event management made simple.
    </p>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>
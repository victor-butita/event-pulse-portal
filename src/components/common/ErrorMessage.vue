<template>
  <div class="error-message" role="alert">
    {{ message }}
  </div>
</template>

<script setup lang="ts">
defineProps<{
  message: string
}>()
</script>
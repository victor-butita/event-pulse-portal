<template>
  <div class="empty-state">
    <h3>{{ title }}</h3>
    <p>{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    message?: string
  }>(),
  {
    title: 'No data found',
    message: 'There is nothing to display.',
  },
)
</script>
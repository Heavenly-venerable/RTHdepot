<script setup lang="ts">
</script>

<template>
  <div class="w-full min-h-screen p-4">
    <Toast class="max-w-80" />
    <ConfirmDialog class="max-w-80"></ConfirmDialog>
    <NuxtPage />
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>

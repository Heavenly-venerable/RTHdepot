<script setup lang="ts"></script>

<template>
  <div class="min-h-screen w-full bg-white dark:bg-zinc-900">
    <Navbar />
    <div class="w-full py-24 px-4">
      <Toast class="max-w-80" />
      <ConfirmDialog class="max-w-80" />
      <slot />
    </div>
  </div>
</template>

<style scoped></style>

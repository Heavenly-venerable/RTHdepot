<script setup lang="ts">
defineProps<{
  title: string
  value: string | number
  icon?: string
}>()
</script>

<template>
  <div
    class="flex items-center gap-4 rounded-xl border bg-white px-5 py-4 shadow-sm dark:bg-zinc-900 dark:border-zinc-700">
    <div v-if="icon" class="text-2xl text-green-500">
      <i :class="icon" />
    </div>
    <div class="flex-1">
      <p class="text-sm text-zinc-500 dark:text-zinc-400">{{ title }}</p>
      <p class="text-xl font-semibold text-zinc-900 dark:text-white">
        {{ value }}
      </p>
    </div>
  </div>
</template>

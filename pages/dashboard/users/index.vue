<script setup lang="ts">
definePageMeta({ middleware: ["auth"], layout: 'dashboard' })
</script>

<template>
  <div>
    <UserDataTable />
  </div>
</template>

<style scoped></style>

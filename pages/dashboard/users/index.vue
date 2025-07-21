<script setup lang="ts">
definePageMeta({ middleware: ["auth", "role-auth"], layout: 'dashboard', requiredRole: "admin" })
</script>

<template>
  <div>
    <UserDataTable />
  </div>
</template>

<style scoped></style>

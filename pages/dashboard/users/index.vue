<script setup lang="ts">
definePageMeta({ middleware: ["auth", "role-auth"], layout: 'dashboard', requiredRole: "staff" })
</script>

<template>
  <div>
    <UserDataTable />
  </div>
</template>

<style scoped></style>

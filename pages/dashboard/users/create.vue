<script setup lang="ts">
definePageMeta({ middleware: ["auth", "role-auth"], layout: 'dashboard', requiredRole: "admin" })
</script>

<template>
  <div class="pt-8">
    <UserForm />
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
definePageMeta({ middleware: ["auth", "role-auth"], layout: 'dashboard', requiredRole: "staff" })
</script>

<template>
  <div class="pt-8">
    <ProductForm />
  </div>
</template>

<style scoped></style>

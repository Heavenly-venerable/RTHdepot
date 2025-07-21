<script setup lang="ts">
definePageMeta({ middleware: ["auth", "role-auth"], layout: 'dashboard', requiredRole: "staff" })
</script>

<template>
  <div>
    <InvoiceDataTable />
  </div>
</template>

<style scoped></style>

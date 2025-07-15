<script setup lang="ts">
definePageMeta({ middleware: ["auth"], layout: 'dashboard' })
</script>

<template>
  <div>
    <InvoiceDataTable />
  </div>
</template>

<style scoped></style>

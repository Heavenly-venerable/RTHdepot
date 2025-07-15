<script setup lang="ts">
definePageMeta({ middleware: ["auth"], layout: 'dashboard' })
</script>

<template>
  <div>
    <InvoiceDetail />
  </div>
</template>

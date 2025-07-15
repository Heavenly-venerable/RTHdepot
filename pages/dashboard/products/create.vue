<script setup lang="ts">
definePageMeta({ middleware: ["auth"], layout: 'dashboard' })
</script>

<template>
  <div class="pt-8">
    <ProductForm />
  </div>
</template>

<style scoped></style>

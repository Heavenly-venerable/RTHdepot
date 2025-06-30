<script setup lang="ts">
const { data: invoices } = await useFetch("/api/invoices")

const todayInvoices = computed(() => invoices.value?.filter((invoice) => isToday(invoice.createAt)) ?? [])
const totalInvoiceToday = computed(() => todayInvoices.value.length)
const totalPurchaseToday = computed(() => todayInvoices.value.reduce((sum, invoice) => sum + invoice.total, 0))
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <SummaryCard title="Total Invoice" :value="totalInvoiceToday" icon="pi pi-users" />
    <SummaryCard title="Total Pembelian" :value="formatPrice(totalPurchaseToday)" icon="pi pi-shopping-cart" />
  </div>
</template>

<style scoped></style>

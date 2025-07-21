<script setup lang="ts">
definePageMeta({ middleware: ["auth", "role-auth"], layout: 'dashboard', requiredRole: "staff" })
const { data: invoices } = await useFetch("/api/invoices")
const { canView } = usePermission()

const todayInvoices = computed(() => invoices.value?.filter((invoice) => isToday(invoice.createAt)) ?? [])
const totalInvoiceToday = computed(() => todayInvoices.value.length)
const totalPurchaseToday = computed(() => todayInvoices.value.filter((invoice) => invoice.type === 'purchase').reduce((sum, invoice) => sum + invoice.total, 0))
const totalSaleToday = computed(() => todayInvoices.value.filter((invoice) => invoice.type === 'sale').reduce((sum, invoice) => sum + invoice.total, 0))
const totalIncomeToday = computed(() => totalSaleToday.value - totalPurchaseToday.value)
</script>

<template>
  <div v-if="canView" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <SummaryCard title="Total Invoice" :value="totalInvoiceToday" icon="pi pi-users" />
    <SummaryCard title="Total Pembelian" :value="formatPrice(totalPurchaseToday)" icon="pi pi-shopping-cart" />
    <SummaryCard title="Total Penjualan" :value="formatPrice(totalSaleToday)" icon="pi pi-chart-line" />
    <SummaryCard title="Pendapatan Hari Ini" :value="formatPrice(totalIncomeToday)" icon="pi pi-wallet" />
  </div>
  <div v-else>
    <p class="text-center text-red-500 font-semibold">
      Anda tidak memiliki akses melihat halaman ini.
    </p>
  </div>
</template>

<style scoped></style>

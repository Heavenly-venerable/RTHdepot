<script setup lang="ts">
import { formatDate } from "~/utils/dateUtils"

const { data: invoices } = useFetch("/api/invoices")

const formatCurrency = (val: number) => {
  return val.toLocaleString("id-ID", { style: "currency", currency: "IDR" })
}

const calculateTotal = (items) => {
  return items.reduce((total, item) => item.quantity * item.price + total, 0)
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-semibold">Daftar Invoice</h2>
      <NuxtLink to="/invoices/create">
        <Button label="New Invoice" icon="pi pi-plus" />
      </NuxtLink>
    </div>
    <DataTable :value="invoices" showGridlines scrollable tableStyle="min-width: 50rem">
      <Column field="id" header="Invoice ID" />
      <Column field="supplier" header="Supplier"></Column>
      <Column header="Jumlah Ikan">
        <template #body="slotProps">
          {{ slotProps.data.items.length }}
        </template>
      </Column>
      <Column header="Total Harga">
        <template #body="slotProps">
          {{ formatCurrency(calculateTotal(slotProps.data.items)) }}
        </template>
      </Column>
      <Column header="CreateAt">
        <template #body="slotProps">
          {{ formatDate(slotProps.data.createAt) }}
        </template>
      </Column>
      <template #empty>
        <p class="text-lg text-center py-4">Tidak ada data yang ditemukan</p>
      </template>
    </DataTable>
  </div>
</template>

<style scoped></style>

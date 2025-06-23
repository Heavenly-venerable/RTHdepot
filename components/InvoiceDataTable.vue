<script setup lang="ts">
import { formatDate } from "~/utils/dateUtils"
import { formatPrice } from "~/utils/priceUtils"

const { data: invoices } = useFetch("/api/invoices")

const editForm = ref(null)
const visible = ref(false)

const calculateTotal = (items) => {
  return items.reduce((total, item) => item.quantity * item.price + total, 0)
}

const onEdit = (data: any) => {
  editForm.value = data
  visible.value = true
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
          {{ formatPrice(calculateTotal(slotProps.data.items)) }}
        </template>
      </Column>
      <Column header="CreateAt">
        <template #body="slotProps">
          {{ formatDate(slotProps.data.createAt) }}
        </template>
      </Column>
      <Column>
        <template #body="slotProps">
          <div class="flex justify-center items-center gap-x-2">
            <NuxtLink :to="{ path: `/invoices/${slotProps.data.id}` }">
              <Button rounded severity="info" icon="pi pi-eye" />
            </NuxtLink>
            <Button @click="onEdit(slotProps.data)" severity="warn" rounded icon="pi pi-pencil" />
            <ConfirmDialogDelete :id="slotProps.data.id" />
          </div>
        </template>
      </Column>
      <template #empty>
        <p class="text-lg text-center py-4">Tidak ada data yang ditemukan</p>
      </template>
    </DataTable>
    <Dialog v-model:visible="visible" modal header="Edit Invoice" class="w-80">
      <InvoiceEdit v-model:visible="visible" :invoice="editForm" />
    </Dialog>
  </div>
</template>

<style scoped></style>

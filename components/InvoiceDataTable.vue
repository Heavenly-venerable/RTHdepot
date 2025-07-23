<script setup lang="ts">
const { invoices, status } = useInvoices()
const { canView, canCreate, canEdit, canDelete } = usePermission()

const editForm = ref(null)
const visible = ref(false)
const { $bluetooth } = useNuxtApp()

const printerChar = ref(null)

const calculateTotal = (items) => {
  return items.reduce((total, item) => item.quantity * item.price + total, 0)
}

const onEdit = (data: any) => {
  editForm.value = data
  visible.value = true
}

async function connect() {
  try {
    const { characteristic } = await $bluetooth.requestPrinter()
    printerChar.value = characteristic
    alert('Printer berhasil terkoneksi 🎉')
  } catch (e) {
    console.error('Error connect:', e)
    alert('Gagal menghubungkan printer')
  }
}

async function printInvoice(invoiceData) {
  if (!printerChar.value) return
  try {
    await printSingleInvoice(invoiceData, printerChar.value, $bluetooth)
  } catch (e) {
    console.error('Print failed:', e)
    alert('Gagal mencetak invoice')
  }
}
</script>

<template>
  <div v-if="canView" class="space-y-4">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-semibold">Daftar Invoice</h2>
      <Button @click="connect">
        <svg class="w-6 h-6 fill-white" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"><!--!Font Awesome Free v7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
          <path
            d="M356.9 324L449.5 220.7L303.6 64L303.6 270.3L217.4 184.2L186 215.6L294.1 324L186 432.4L217.4 463.8L303.6 377.7L306.3 576L454.8 427.4L356.9 324zM397.8 221L347.8 271L347.5 170.7L397.8 221zM347.8 377L397.8 427L347.5 477.3L347.8 377z" />
        </svg>
      </Button>
      <NuxtLink v-if="canCreate" to="/dashboard/invoices/create">
        <Button label="New Invoice" icon="pi pi-plus" />
      </NuxtLink>
    </div>
    <DataTable :value="invoices" showGridlines scrollable tableStyle="min-width: 50rem" :loading="status.pending">
      <Column field="id" header="Invoice ID" />
      <Column field="partner" header="Nama"></Column>
      <Column header="Tipe Transaksi">
        <template #body="slotProps">
          <Tag :value="slotProps.data.type === 'sale' ? 'Penjualan' : 'pembelian'"
            :severity="slotProps.data.type === 'sale' ? 'success' : 'info'" />
        </template>
      </Column>
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
            <NuxtLink v-if="canView" :to="{ path: `/dashboard/invoices/${slotProps.data.id}` }">
              <Button rounded severity="info" icon="pi pi-eye" />
            </NuxtLink>
            <Button v-if="canEdit" @click="onEdit(slotProps.data)" severity="warn" rounded icon="pi pi-pencil" />
            <ConfirmDialogDeleteInvoice v-if="canDelete" :id="slotProps.data.id" />
            <Button @click="printInvoice(slotProps.data)" severity="secondary" rounded icon="pi pi-print" />
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
  <div v-else>
    <p class="text-center text-red-500 font-semibold">
      Anda tidak memiliki akses melihat halaman ini.
    </p>
  </div>
</template>

<style scoped></style>

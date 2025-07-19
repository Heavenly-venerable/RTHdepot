<script setup lang="ts">
const { products } = useProducts()

const editForm = ref(null)
const visible = ref(false)

function prettyId(id: string) {
  return `${id.slice(0, 4)}...${id.slice(-4)}`
}

const onEdit = (data: any) => {
  editForm.value = data
  visible.value = true
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-semibold">Daftar Product</h2>
      <NuxtLink to="/dashboard/products/create">
        <Button label="New Product" icon="pi pi-plus" />
      </NuxtLink>
    </div>
    <DataTable :value="products" showGridlines scrollable tableStyle="min-width: 50rem">
      <Column header="ID">
        <template #body="slotProps">
          {{ prettyId(slotProps.data.id) }}
        </template>
      </Column>
      <Column field="name" header="Name"></Column>
      <Column header="Total Harga">
        <template #body="slotProps">
          {{ formatPrice(slotProps.data.price) }}
        </template>
      </Column>
      <Column field="stock" header="Stock"></Column>
      <Column>
        <template #body="slotProps">
          <div class="flex justify-center items-center gap-x-2">
            <Button @click="onEdit(slotProps.data)" severity="warn" rounded icon="pi pi-pencil" />
            <ConfirmDialogDeleteProduct :id="slotProps.data.id" />
          </div>
        </template>
      </Column>
      <template #empty>
        <p class="text-lg text-center py-4">Tidak ada data yang ditemukan</p>
      </template>
      <template #loading>
        <p class="text-lg text-center py-4">Loading data produk. Mohon tunggu...</p>
      </template>
    </DataTable>
    <Dialog v-model:visible="visible" modal header="Edit Product" class="w-80">
      <ProductEdit v-model:visible="visible" :product="editForm" />
    </Dialog>
  </div>
</template>

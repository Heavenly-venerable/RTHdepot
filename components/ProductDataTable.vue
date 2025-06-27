<script setup lang="ts">
const { data: products } = useFetch("/api/products")

const productsData = computed(() => products.value?.data ?? [])
</script>

<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-semibold">Daftar Product</h2>
      <NuxtLink to="#">
        <Button label="New Product" icon="pi pi-plus" />
      </NuxtLink>
    </div>
    <DataTable :value="productsData" showGridlines scrollable tableStyle="min-width: 50rem">
      <Column field="id" header="ID"></Column>
      <Column field="name" header="Name"></Column>
      <Column header="Total Harga">
        <template #body="slotProps">
          {{ formatPrice(slotProps.data.price) }}
        </template>
      </Column>
      <Column field="stock" header="Stock"></Column>
      <template #empty>
        <p class="text-lg text-center py-4">Tidak ada data yang ditemukan</p>
      </template>
      <template #loading>
        <p class="text-lg text-center py-4">Loading data produk. Mohon tunggu...</p>
      </template>
    </DataTable>
  </div>
</template>

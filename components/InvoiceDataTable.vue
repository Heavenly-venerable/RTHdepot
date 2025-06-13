<script setup lang="ts">
const { data: invoices } = useFetch("/api/invoices")
</script>

<template>
  <div>
    <DataTable :value="invoices" showGridlines scrollable tableStyle="min-width: 50rem">
      <Column field="supplier" header="Supplier"></Column>
      <Column header="Jumlah Ikan">
        <template #body="slotProps">
          {{ slotProps.data.items.length }}
        </template>
      </Column>
      <Column header="Total Harga">
        <template #body="slotProps">
          {{slotProps.data.items.reduce((total, item) => item.quantity * item.price + total, 0)}}
        </template>
      </Column>
      <Column :exportable="false">
        <template #body="slotProps">
          <Button icon="pi pi-pencil" outlined rounded class="mr-2" severity="contrast"
            @click="editProduct(slotProps.data)" />
          <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteProduct(slotProps.data)" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style scoped></style>

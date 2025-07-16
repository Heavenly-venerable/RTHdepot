<script setup lang="ts">
const { users } = useUsers()

function getSeverity(role) {
  switch (role) {
    case 'superadmin':
      return 'danger'
    case 'admin':
      return 'warn'
    case 'staff':
      return 'info'
    case 'user':
      return 'success'
    default:
      return null
  }
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-semibold">Daftar User</h2>
    </div>
    <DataTable :value="users" showGridlines scrollable tableStyle="min-width: 50rem">
      <Column field="id" header="ID"> </Column>
      <Column field="name" header="Name"></Column>
      <Column header="Role">
        <template #body="slotProps">
          <Tag :value="slotProps.data.role" :severity="getSeverity(slotProps.data.role)" />
        </template>
      </Column>
      <Column field="isActive" header="Status Akun">
        <template #body="slotProps">
          <Tag :value="slotProps.data.isActive ? 'Aktif' : 'Nonaktif'"
            :severity="slotProps.data.isActive ? 'success' : 'danger'" />
        </template>
      </Column>
      <Column header="CreatedAt">
        <template #body="slotProps">
          {{ formatDate(slotProps.data.createdAt) }}
        </template>
      </Column>
      <template #empty>
        <p class="text-lg text-center py-4">Tidak ada data yang ditemukan</p>
      </template>
      <template #loading>
        <p class="text-lg text-center py-4">Loading data produk. Mohon tunggu...</p>
      </template>
    </DataTable>
  </div>
</template>

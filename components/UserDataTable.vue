<script setup lang="ts">
const { users } = useUsers()
const { canView, canCreate, canEdit, canDelete, hasRole } = usePermission()

const editForm = ref(null)
const visible = ref(false)

const onEdit = (data: any) => {
  editForm.value = data
  visible.value = true
}

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
  <div v-if="hasRole('admin')" class="space-y-4">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-semibold">Daftar User</h2>
      <NuxtLink v-if="hasRole('admin')" to="/dashboard/users/create">
        <Button label="New User" icon="pi pi-plus" />
      </NuxtLink>
    </div>
    <DataTable :value="users" showGridlines scrollable tableStyle="min-width: 50rem">
      <Column field="id" header="ID"> </Column>
      <Column field="name" header="Name"></Column>
      <Column field="email" header="Email"></Column>
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
      <Column>
        <template #body="slotProps">
          <div class="flex justify-center items-center gap-x-2">
            <Button v-if="hasRole('admin')" @click="onEdit(slotProps.data)" severity="warn" rounded
              icon="pi pi-pencil" />
            <ConfirmDialogDeleteUser v-if="canDelete" :id="slotProps.data.id" />
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
    <Dialog v-model:visible="visible" modal header="Edit User" class="w-80">
      <UserEdit v-model:visible="visible" :user="editForm" />
    </Dialog>
  </div>
  <div v-else>
    <p class="text-center text-red-500 font-semibold">
      Anda tidak memiliki akses melihat halaman ini.
    </p>
  </div>
</template>

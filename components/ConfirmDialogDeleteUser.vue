<script setup lang="ts">
const props = defineProps<{ id: string }>()

const { deleteUser, refresh } = useUsers()
const confirm = useConfirm()
const toast = useToast()

const confirmDeleteUser = () => {
  confirm.require({
    message: 'Apakah Anda yakin ingin menghapus user ini?',
    header: 'Konfirmasi Penghapusan User',
    icon: 'pi pi-exclamation-triangle',
    rejectLabel: 'Batal',
    rejectProps: {
      label: 'Batal',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Hapus',
      severity: 'danger'
    },
    accept: async () => {
      try {
        await deleteUser(props.id)
        await refresh()
        toast.add({ severity: 'warn', summary: 'Dihapus', detail: 'User berhasil dihapus', life: 3000 });
      } catch (error) {
        console.error(error)
        toast.add({ severity: 'error', summary: 'Gagal menghapus user', life: 3000 });
      }
    },
    reject: () => {
      toast.add({ severity: 'warn', summary: 'Dibatalkan', detail: 'Penghapusan user dibatalkan', life: 3000 });
    }
  });
};
</script>

<template>
  <div>
    <Button @click="confirmDeleteUser()" severity="danger" rounded icon="pi pi-trash" />
  </div>
</template>

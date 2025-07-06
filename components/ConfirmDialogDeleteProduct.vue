<script setup lang="ts">
const props = defineProps<{ id: string }>()

const { deleteProduct, refresh } = useProducts()
const confirm = useConfirm()
const toast = useToast()

const confirmDeleteInvoice = () => {
  confirm.require({
    message: 'Apakah Anda yakin ingin menghapus product ini?',
    header: 'Konfirmasi Penghapusan Product',
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
        await deleteProduct(props.id)
        await refresh()
        toast.add({ severity: 'warn', summary: 'Dihapus', detail: 'Product berhasil dihapus', life: 3000 });
      } catch (error) {
        console.error(error)
        toast.add({ severity: 'error', summary: 'Gagal menghapus invoice', life: 3000 });
      }
    },
    reject: () => {
      toast.add({ severity: 'warn', summary: 'Dibatalkan', detail: 'Penghapusan Product dibatalkan', life: 3000 });
    }
  });
};
</script>

<template>
  <div>
    <Button @click="confirmDeleteInvoice()" severity="danger" rounded icon="pi pi-trash" />
  </div>
</template>

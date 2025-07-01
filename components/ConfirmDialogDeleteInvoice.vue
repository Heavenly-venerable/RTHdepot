<script setup lang="ts">
const props = defineProps<{ id: string }>()

const { deleteInvoice } = useInvoices()
const confirm = useConfirm()
const toast = useToast()

const confirmDeleteInvoice = () => {
  confirm.require({
    message: 'Apakah Anda yakin ingin menghapus invoice ini?',
    header: 'Konfirmasi Penghapusan Invoice',
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
        deleteInvoice(props.id)
        toast.add({ severity: 'info', summary: 'Dihapus', detail: 'Invoice berhasil dihapus', life: 3000 });
      } catch (error) {
        console.error(error)
        toast.add({ severity: 'error', summary: 'Gagal menghapus invoice', life: 3000 });
      }
    },
    reject: () => {
      toast.add({ severity: 'warn', summary: 'Dibatalkan', detail: 'Penghapusan invoice dibatalkan', life: 3000 });
    }
  });
};
</script>

<template>
  <div>
    <Button @click="confirmDeleteInvoice()" severity="danger" rounded icon="pi pi-trash" />
  </div>
</template>

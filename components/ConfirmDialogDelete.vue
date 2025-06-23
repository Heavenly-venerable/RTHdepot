<script setup lang="ts">
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
    accept: () => {
      toast.add({ severity: 'info', summary: 'Dihapus', detail: 'Invoice berhasil dihapus', life: 3000 });
    },
    reject: () => {
      toast.add({ severity: 'warn', summary: 'Dibatalkan', detail: 'Penghapusan invoice dibatalkan', life: 3000 });
    }
  });
};
</script>

<template>
  <div>
    <Toast class="w-80" />
    <ConfirmDialog class="w-80"></ConfirmDialog>
    <Button @click="confirmDeleteInvoice()" severity="danger" rounded icon="pi pi-trash" />
  </div>
</template>

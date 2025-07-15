<script setup lang="ts">
onMounted(() => {
  const route = useRoute()
  const router = useRouter()
  const toast = useToast()

  if (route.query.message === 'unauthorized') {
    toast.add({
      severity: 'warn',
      summary: 'Akses Ditolak',
      detail: 'Silakan login terlebih dahulu.',
      life: 3000
    })

    router.replace({ path: route.path, query: {} })
  }
})
</script>

<template>
  <div class="h-svh flex justify-center items-center">
    <LoginForm />
  </div>
</template>

<style scoped></style>

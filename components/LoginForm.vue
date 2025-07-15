<script setup lang="ts">
const { fetch: refreshSession } = useUserSession()
const toast = useToast()

const form = reactive({
  email: "",
  password: ""
})

const isLoading = ref(false)

async function onFormSubmit() {
  try {
    isLoading.value = true

    const response = await $fetch("/api/auth/login", {
      method: "POST",
      body: form
    })

    if (!response?.success) {
      toast.add({ severity: 'error', summary: 'Login gagal', detail: 'Email atau Password yang anda masukkan salah, coba masukan email atau password yang benar', life: 4000 })
    } else {
      toast.add({ severity: "success", summary: "Login berhasil", life: 3000 })

      await refreshSession()
      await navigateTo("/dashboard")
    }
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Login gagal', detail: error?.data?.message || 'Terjadi kesalahan saat login', life: 4000 })
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div>
    <form @submit.prevent="onFormSubmit()" class="flex flex-col pb-6 gap-4 w-full md:w-56">
      <div class="flex flex-col gap-2">
        <label class="text-sm" for="email">Email</label>
        <InputText v-model="form.email" id="email" type="text" placeholder="contoh@gmail.com" autocomplete="email" />
      </div>
      <div class="flex flex-col gap-2">
        <label class="text-sm" for="password">Password</label>
        <Password v-model="form.password" id="password" :feedback="false" toggleMask fluid
          autocomplete="current-password" />
      </div>
      <Button :isLoading="isLoading" fluid type="submit" severity="primary" label="Submit" />
    </form>
  </div>
</template>

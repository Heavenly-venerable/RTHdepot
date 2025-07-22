<script setup lang="ts">
import { z } from "zod"

const props = defineProps<{
  user: any | null,
  visible: boolean
}>()

const { user } = useUserSession()
const { refresh } = useUsers()
const { updateUser } = useUser(props.user?.id)
const toast = useToast()

const emit = defineEmits(["update:visible"])

const roleValues = ["superadmin", "admin", "staff", "user"] as const

const userSchema = z.object({
  name: z.string().min(3, "Nama wajib diisi"),
  email: z.string().email("Format email tidak valid"),
  password: z.string().optional().or(z.literal("")).refine((val) => val === "" || (val.length >= 8 && /[A-Z]/.test(val) && /[a-z]/.test(val) && /[0-9]/.test(val) && /[^A-Za-z0-9]/.test(val)), { message: "Password harus minimal 8 karakter dan mengandung huruf besar, kecil, angka, dan simbol", }),
})

let errors: Record<string, string> = {}

const currentRole = ref(user?.value.role || "user")

const form = reactive({
  name: "",
  email: "",
  password: "",
  role: currentRole.value
})

const roles = [
  { name: "Superadmin", value: "superadmin" },
  { name: "Admin", value: "admin" },
  { name: "Staff", value: "staff" },
  { name: "User", value: "user" }
]

const isRoleEditable = computed(() => {
  return currentRole.value === "admin" || currentRole.value === "superadmin"
})

function validateForm() {
  const result = userSchema.safeParse(form)

  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors
    errors = {
      name: fieldErrors.name?.[0],
      email: fieldErrors.email?.[0],
      password: fieldErrors.password?.[0],
    }
    console.warn("Form tidak valid", fieldErrors)
    return false
  }

  errors = {}
  return true
}

async function onFormSubmit() {
  if (!validateForm()) return
  const payload = { ...form }
  if (!payload.password) delete payload.password
  await updateUser(payload)
  await refresh()
  toast.add({ severity: 'info', summary: 'Diedit', detail: 'User berhasil diedit', life: 3000 });
  emit("update:visible", !props.visible)
}

onMounted(() => {
  form.name = props.user?.name ?? ""
  form.email = props.user?.email ?? ""
  form.role = props.user?.role ?? ""
})

watch(() => form.name, (value) => {
  const result = userSchema.shape.name.safeParse(value)
  errors.name = result.success ? undefined : result.error.flatten().formErrors[0]
});

watch(() => form.email, (value) => {
  const result = userSchema.shape.email.safeParse(value)
  errors.email = result.success ? undefined : result.error.flatten().formErrors[0]
});

watch(() => form.password, (value) => {
  const result = userSchema.shape.password.safeParse(value)
  errors.password = result.success ? undefined : result.error.flatten().formErrors[0]
});
</script>

<template>
  <form @submit.prevent="onFormSubmit()" class="flex flex-col pb-6 gap-4 w-full md:w-56">
    <div class="flex flex-col gap-2">
      <label class="text-sm" for="username">Nama</label>
      <InputText v-model="form.name" id="username" type="text" placeholder="Nama Pengguna" />
      <small class="text-red-600">{{ errors.name }}</small>
    </div>
    <div class="flex flex-col gap-2">
      <label class="text-sm" for="email">Email</label>
      <InputText v-model="form.email" id="email" type="text" placeholder="contoh@gmail.com" />
      <small class="text-red-600">{{ errors.email }}</small>
    </div>
    <div class="flex flex-col gap-2">
      <label class="text-sm" for="password">Password</label>
      <Password v-model="form.password" id="password" :feedback="false" toggleMask fluid />
      <small class="text-red-600">{{ errors.password }}</small>
    </div>
    <div class="flex flex-col gap-2">
      <label class="text-sm" for="role">Role</label>
      <Select v-model="form.role" :options="roles" optionLabel="name" optionValue="value" id="role"
        placeholder="Pilih Role" showClear :highlightOnSelect="false" fluid :disabled="!isRoleEditable" />
    </div>
    <Button fluid type="submit" severity="primary" label="Submit" />
  </form>
</template>

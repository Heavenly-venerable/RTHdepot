<script setup lang="ts">
const props = defineProps<{
  product: any | null,
  visible: boolean
}>()

const { refresh } = useProducts()
const { updateProduct } = useProduct(props.product?.id)
const toast = useToast()

const emit = defineEmits(["update:visible"])

const form = reactive({
  name: "",
  price: 0,
  stock: 0
})

const errors = reactive({
  name: "",
  price: "",
  stock: ""
})

function validate() {
  let valid = true
  errors.name = form.name ? "" : "Nama ikan wajib diisi"
  errors.price = form.price > 0 ? "" : "Harga harus lebih dari 0"
  errors.stock = form.stock >= 0 ? "" : "Stok tidak boleh negatif"

  if (errors.name || errors.price || errors.stock) valid = false
  return valid
}

async function onFormSubmit() {
  if (!validate()) return
  await updateProduct(form)
  await refresh()
  toast.add({ severity: 'info', summary: 'Diedit', detail: 'Product berhasil diedit', life: 3000 });
  emit("update:visible", !props.visible)
}

onMounted(() => {
  form.name = props.product?.name ?? ""
  form.price = props.product?.price ?? 0
  form.stock = props.product?.stock ?? 0
})
</script>

<template>
  <form @submit.prevent="onFormSubmit()" class="flex flex-col pb-6 gap-4 w-full md:w-56">
    <div class="flex flex-col gap-2">
      <label class="text-sm" for="name">Nama Ikan</label>
      <InputText v-model="form.name" id="name" type="text" placeholder="Nama Ikan" />
      <small v-show="errors.name" class="text-red-600">{{ errors.name }}</small>
    </div>

    <div class="flex flex-col gap-2">
      <label class="text-sm" for="price">Harga / KG</label>
      <InputNumber v-model="form.price" id="price" mode="currency" currency="IDR" locale="id-ID" :minFractionDigits="0"
        :useGrouping="true" :min="1000" fluid />
      <small v-show="errors.price" class="text-red-600">{{ errors.price }}</small>
    </div>

    <div class="flex flex-col gap-2">
      <label class="text-sm" for="stock">Stock (KG)</label>
      <InputNumber v-model="form.stock" id="stock" :min="0" fluid />
      <small v-show="errors.stock" class="text-red-600">{{ errors.stock }}</small>
    </div>

    <Button fluid type="submit" severity="primary" label="Submit" />
  </form>
</template>

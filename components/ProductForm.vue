<script setup lang="ts">
import { z } from "zod"

const productSchema = z.object({
  name: z.string().min(3, "Nama ikan wajib diisi"),
  price: z.number().nonnegative(),
  stock: z.number().nonnegative()
})

const errors = ref<{ name?: string; price?: string; stock?: string }>()

const form = reactive({
  name: "",
  price: 1000,
  stock: 0
})

function validateForm() {
  const result = productSchema.safeParse(form)
  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors
    errors.value = {
      name: fieldErrors.name?.[0],
      price: fieldErrors.price?.[0],
      stock: fieldErrors.stock?.[0]
    }
    return false
  }

  errors.value = {}
  return true
}

function onFormSubmit() {
  if (validateForm()) {
    $fetch("/api/products", {
      method: "POST",
      body: form
    })

    navigateTo("/products")
  }
}

watch(form, (newForm) => {

});
</script>

<template>
  <form @submit.prevent="onFormSubmit()" class="flex flex-col pb-6 gap-4 w-full md:w-56">
    <div class="flex flex-col gap-2">
      <label class="text-sm" for="name">Nama Ikan</label>
      <InputText v-model="form.name" id="name" type="text" placeholder="Nama Ikan" />
      <small v-show="errors?.name" class="text-red-600">{{ errors?.name }}</small>
    </div>
    <div class="flex flex-col gap-2">
      <label class="text-sm" for="price">Harga / KG</label>
      <InputNumber v-model="form.price" id="price" mode="currency" currency="IDR" locale="id-ID" :minFractionDigits="0"
        :useGrouping="true" :min="1000" fluid />
      <small class="text-red-600">{{ errors?.price }}</small>
    </div>
    <div class="flex flex-col gap-2">
      <label class="text-sm" for="stock">Stock (KG)</label>
      <InputNumber v-model="form.stock" id="stock" :min="0" fluid />
      <small class="text-red-600">{{ errors?.stock }}</small>
    </div>
    <Button fluid type="submit" severity="primary" label="Submit" />
  </form>
</template>

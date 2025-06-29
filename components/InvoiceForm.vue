<script setup lang="ts">
import { z } from "zod"

const invoiceSchema = z.object({
  supplier: z.string().min(1, "Nama nelayab wajib diisi"),
  items: z.array(z.object({
    product: z.object({
      name: z.string(),
      price: z.number()
    }),
    quantity: z.number().min(0.1, "Berat minimal 0.1 KG / 1 ONS"),
    price: z.number().min(1000, "Harga minimal Rp1000")
  })).min(1, "Minimal 1 item")
})

const errors = ref<{ supplier?: string; items: string[] }>({})

const { data: products } = await useFetch("/api/products")
const { data: invoices } = await useFetch("/api/invoices")

const productsData = computed(() => products.value?.data ?? [])

const isVisible = ref(true)

let lastScrollY = 0

const form = reactive({
  supplier: "",
  items: [
    { product: null, quantity: 1, price: 0 }
  ]
})

const totalItemsPrices = computed(() => form.items.reduce((total, item) => {
  const price = item.price || 0
  const quantity = item.quantity || 0
  return total + price * quantity
}, 0))

function addItems() {
  form.items.push({ product: "", quantity: 1, price: 0 })
}

function removeItem(items, index) {
  if (items.length === 1) return

  items.splice(index, 1)
}

function onFormSubmit() {
  const result = invoiceSchema.safeParse(form)

  if (!result.success) {
    const fieldErrors = result.error.flatten()
    errors.value = {
      supplier: fieldErrors.fieldErrors.supplier?.[0],
      items: fieldErrors.fieldErrors.items?.map(e => e as string)
    }
    console.warn("Form tidak valid", fieldErrors)
    return
  }

  $fetch("/api/invoices", {
    method: "POST",
    body: form
  })

  navigateTo("/invoices")
}

const handleScroll = () => {
  const currentScrollY = window.scrollY

  if (currentScrollY > lastScrollY && currentScrollY > 50) {
    isVisible.value = false // scroll ke bawah
  } else {
    isVisible.value = true // scroll ke atas
  }

  lastScrollY = currentScrollY
}

watch(() => form.items.map(item => item.product), (newProducts, oldProducts) => {
  newProducts.forEach((product, index) => {
    if (product && product !== oldProducts[index]) {
      form.items[index].price = product.price ?? 0
    }
  })
}, { deep: true })

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div>
    <form @submit.prevent="onFormSubmit()" class="flex flex-col pb-6 gap-4 w-full md:w-56">
      <div class="flex flex-col gap-2">
        <label class="text-sm" for="supplier">Nama Nelayan</label>
        <InputText v-model="form.supplier" id="supplier" type="text" placeholder="Nama Nelayan" />
        <small class="text-red-600">{{ errors.supplier }}</small>
      </div>
      <div v-for="(item, index) in form.items" :key="index" class="p-4 border border-gray-300 rounded-md space-y-4">
        <div class="w-full flex justify-between items-center">
          <h2 class="text-lg font-semibold">{{ item.product?.name ?? "" }}</h2>
          <svg @click="removeItem(form.items, index)" class="w-5 h-5 fill-red-600" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
            <path
              d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z" />
          </svg>
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-sm" for="product">Jenis Ikan</label>
          <Select v-model="item.product" :options="productsData" optionLabel="name" id="product"
            placeholder="Pilih Jenis Ikan" checkmark filter showClear :highlightOnSelect="false" fluid />
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-sm" for="quantity">Berat (KG)</label>
          <InputNumber v-model="item.quantity" id="quantity" fluid />
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-sm" for="price">Harga / KG</label>
          <InputNumber v-model="item.price" id="price" mode="currency" currency="IDR" locale="id-ID"
            :minFractionDigits="0" :useGrouping="true" :min="1000" fluid />
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-sm" for="subtotal">Subtotal</label>
          <InputText :value="formatPrice((item.price ?? 0) * item.quantity)" disabled id="subtotal" type="text"
            placeholder="Subtotal" />
        </div>
        <small v-if="errors.items?.[index]" class="text-red-600">
          {{ errors.items[index] }}
        </small>
      </div>
      <Button @click="addItems" type="button" severity="secondary" variant="outlined" size="small" label="Add items" />
      <div
        class="fixed bottom-0 left-0 z-50 w-full p-4 bg-gray-50 border-t rounded-ss-3xl rounded-se-3xl transition-transform duration-500 dark:bg-zinc-900 dark:border-none"
        :class="{
          'translate-y-0': isVisible,
          'translate-y-full': !isVisible
        }">
        <div class="flex items-center justify-between p-2">
          <p>Total Pembayaran:</p>
          <p class="text-2xl font-bold">{{ formatPrice(totalItemsPrices) }}</p>
        </div>
        <Button fluid type="submit" severity="primary" label="Submit" />
      </div>
    </form>
  </div>
</template>

<style scoped></style>

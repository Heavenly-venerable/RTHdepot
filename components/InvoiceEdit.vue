<script setup lang="ts">
const props = defineProps<{
  invoice: any | null,
  visible: boolean
}>()

const toast = useToast()

const emit = defineEmits(["update:visible"])

const { products } = useProducts()
const { updateInvoice } = useInvoice(props.invoice?.id)

const editForm = reactive({
  partner: "",
  type: "purchase",
  items: [
    { product: null, quantity: 1, price: 0 }
  ]
})

const totalItemsPrices = computed(() => editForm.items.reduce((total, item) => {
  const price = item.price || 0
  const quantity = item.quantity || 0
  return total + price * quantity
}, 0))

function addItems() {
  editForm.items.push({ product: "", quantity: 1, price: 0 })
}

function removeItem(items, index) {
  if (items.length === 1) return

  items.splice(index, 1)
}

async function onFormSubmit() {
  const hasNullProduct = editForm.items.some(item => item.product === null)
  if (hasNullProduct) {
    toast.add({ severity: "error", summary: "Gagal", detail: "Ada item tanpa produk", life: 3000 })
    return
  }
  updateInvoice(editForm)
  toast.add({ severity: 'info', summary: 'Diedit', detail: 'Invoice berhasil diedit', life: 3000 });
  emit("update:visible", !props.visible)
}

watch(() => editForm.items.map(item => item.product), (newProducts, oldProducts) => {
  newProducts.forEach((product, index) => {
    if (product && product !== oldProducts[index]) {
      editForm.items[index].price = product.price ?? 0
    }
  })
}, { deep: true })

watch([() => products.value, () => props.invoice], ([newProducts, invoice]) => {
  if (!invoice || !newProducts.length) return

  editForm.partner = props.invoice.partner ?? ""
  editForm.type = props.invoice.type ?? ""

  editForm.items = props.invoice.items?.map(item => ({
    product: newProducts.find(p => p.id === item.product.id) ?? null,
    quantity: item.quantity,
    price: item.price
  })) ?? [{ product: null, quantity: 1, price: 0 }]
},
  { immediate: true }
)
</script>

<template>
  <form @submit.prevent="onFormSubmit()" class="w-full flex flex-col gap-4">
    <div class="flex flex-col gap-2">
      <label class="text-sm" for="partner">Nama</label>
      <InputText v-model="editForm.partner" id="partner" type="text" placeholder="Nama..." />
    </div>
    <div class="flex flex-col gap-2">
      <label class="text-sm" for="type">Tipe Transaksi</label>
      <div class="flex flex-wrap gap-4">
        <div class="flex items-center gap-2">
          <RadioButton v-model="editForm.type" inputId="type1" name="EditType" value="purchase" />
          <label for="type1">Pembelian</label>
        </div>
        <div class="flex items-center gap-2">
          <RadioButton v-model="editForm.type" inputId="type2" name="EditType" value="sale" />
          <label for="type2">Penjualan</label>
        </div>
      </div>
    </div>
    <div v-for="(item, index) in editForm.items" :key="index" class="p-4 border border-gray-300 rounded-md space-y-4">
      <div class="w-full flex justify-between items-center">
        <h2 class="text-lg font-semibold">{{ item.product?.name ?? "" }}</h2>
        <svg @click="removeItem(editForm.items, index)" class="w-5 h-5 fill-red-600" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
          <path
            d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z" />
        </svg>
      </div>
      <div class="flex flex-col gap-2">
        <label class="text-sm" for="product">Jenis Ikan</label>
        <Select v-model="item.product" :options="products" optionLabel="name" id="product"
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
    </div>
    <Button @click="addItems" type="button" severity="secondary" variant="outlined" size="small" label="Add items" />
    <div class="flex items-center justify-between p-2">
      <p>Total Pembayaran:</p>
      <p class="text-2xl font-bold">{{ formatPrice(totalItemsPrices) }}</p>
    </div>
    <Button fluid type="submit" severity="primary" label="Submit" />
  </form>
</template>

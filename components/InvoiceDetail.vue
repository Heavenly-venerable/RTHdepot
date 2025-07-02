<script setup lang="ts">
const { invoice } = useInvoice()
</script>

<template>
  <Card class="dark:shadow-none dark:border dark:border-zinc-700">
    <template #title>
      <div class="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
        Invoice #{{ invoice?.id }}
      </div>
    </template>
    <template #content>
      <div v-if="!invoice.id" class="text-center text-red-500 dark:text-red-400">
        Gagal memuat data invoice.
      </div>
      <div v-else class="space-y-6">
        <div class="text-sm text-zinc-600 dark:text-zinc-300">
          <div><span class="font-medium">Supplier:</span> {{ invoice?.supplier }}</div>
          <div><span class="font-medium">Tanggal:</span> {{ formatDate(invoice?.createAt) }}</div>
        </div>
        <div>
          <h3 class="text-sm font-semibold text-zinc-700 dark:text-zinc-200 mb-2">Item:</h3>
          <div class="space-y-2">
            <div v-for="(item, i) in invoice?.items" :key="i"
              class="flex justify-between items-center border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 p-3 rounded-md text-sm">
              <div>
                <div class="font-medium text-zinc-800 dark:text-zinc-100">{{ item.product.name }}</div>
                <div class="text-zinc-500 dark:text-zinc-400 text-xs">
                  {{ item.quantity }} KG x {{ formatPrice(item.price) }}
                </div>
              </div>
              <div class="font-semibold text-zinc-700 dark:text-zinc-200">
                {{ formatPrice(item.quantity * item.price) }}
              </div>
            </div>
          </div>
        </div>
        <div
          class="border-t border-zinc-200 dark:border-zinc-700 pt-4 text-right text-zinc-800 dark:text-zinc-100 font-bold text-lg">
          Total: {{ formatPrice(invoice?.total) }}
        </div>
      </div>
    </template>
  </Card>
</template>

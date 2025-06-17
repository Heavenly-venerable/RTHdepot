<script setup lang="ts">
import { formatDate } from "~/utils/dateUtils"

const route = useRoute()

const { data: invoice, pending, error } = useFetch(`/api/invoices/${route.params.id}`)

function formatPrice(value: number) {
  return value.toLocaleString('id-ID')
}
</script>

<template>
  <div class="p-4 sm:p-6 max-w-2xl mx-auto">
    <Card>
      <template #title>
        <div class="text-lg font-semibold text-gray-800">
          Invoice #{{ invoice?.id }}
        </div>
      </template>
      <template #content>
        <div v-if="!invoice" class="text-center text-red-500">
          Gagal memuat data invoice.
        </div>
        <div v-else class="space-y-6">
          <div class="text-sm text-gray-600">
            <div><span class="font-medium">Supplier:</span> {{ invoice?.supplier }}</div>
            <div><span class="font-medium">Tanggal:</span> {{ formatDate(invoice?.createAt) }}</div>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-gray-700 mb-2">Item:</h3>
            <div class="space-y-2">
              <div v-for="(item, i) in invoice?.items" :key="i"
                class="flex justify-between items-center border border-gray-200 p-3 rounded-md text-sm">
                <div>
                  <div class="font-medium">{{ item.product.name }}</div>
                  <div class="text-gray-500 text-xs">
                    {{ item.quantity }} x Rp{{ formatPrice(item.price) }}
                  </div>
                </div>
                <div class="font-semibold text-gray-700">
                  Rp{{ formatPrice(item.quantity * item.price) }}
                </div>
              </div>
            </div>
          </div>
          <div class="border-t pt-4 text-right text-gray-800 font-bold text-lg">
            Total: Rp{{ formatPrice(invoice?.total) }}
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

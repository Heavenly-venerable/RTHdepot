<template>
  <div>
    <button @click="connect">Connect Printer</button>
    <button @click="printInvoice" :disabled="!printerChar">Print Invoice</button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
const { $bluetooth } = useNuxtApp()

// Bluetooth printer characteristic
const printerChar = ref<BluetoothRemoteGATTCharacteristic | null>(null)

// Connect ke printer
async function connect() {
  try {
    const { characteristic } = await $bluetooth.requestPrinter()
    printerChar.value = characteristic!
    alert('Printer connected 🎉')
  } catch (e) {
    console.error('Error connect:', e)
    alert('Failed to connect printer')
  }
}

// ESC/POS encoder helper
function toEscPos(text: string): Uint8Array {
  const encoder = new TextEncoder()
  return encoder.encode(text + '\n')
}

// Format helpers
function formatCurrency(value: number): string {
  return `Rp${value.toLocaleString('id-ID')}`
}
function formatDate(value: string | Date): string {
  return new Date(value).toLocaleDateString('id-ID')
}

// Fetch data invoice
const { invoices } = useInvoices()

// Print invoice ke printer
async function printInvoice() {
  if (!printerChar.value || !invoices.value || invoices.value.length === 0) return

  const invoice = invoices.value[0]

  const commands = [
    toEscPos('\x1B\x40'), // initialize

    // H1 - Judul Toko Besar
    toEscPos('\x1D\x21\x00'),
    toEscPos('*** DEPOT RTH ***'),

    // H2 - Informasi Invoice
    toEscPos('\x1D\x21\x00'),
    toEscPos(`Invoice #: INV-${invoice.id}`),
    toEscPos(`Tanggal : ${formatDate(invoice.createAt)}`),
    toEscPos(`Nama Nelayan: ${invoice.partner}`),

    // Normal size untuk isi item
    toEscPos('\x1D\x21\x00'),
    ...invoice.items.map((item: any) => {
      const name = item.product.name.padEnd(14)
      const qtyPrice = `${item.quantity} x ${formatCurrency(item.price)}`
      return toEscPos(`${name}${qtyPrice}`)
    }),

    toEscPos('--------------------------'),

    // H2 - Total
    toEscPos('\x1D\x21\x01'),
    toEscPos(`Total: ${formatCurrency(invoice.total)}`),

    // Footer Normal
    toEscPos('\x1D\x21\x00'),
    toEscPos('\n\n'),
    toEscPos('Terima kasih'),
    toEscPos('\n\n'),
  ]

  for (const cmd of commands) {
    await $bluetooth.send(printerChar.value, cmd)
  }

  alert('Invoice sent to printer')
}
</script>

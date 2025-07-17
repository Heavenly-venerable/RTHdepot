<template>
  <div>
    <button @click="connect">Connect Printer</button>
    <button @click="printInvoice" :disabled="!printerChar">Print Invoice</button>
  </div>
</template>

<script setup lang="ts">
const { $bluetooth } = useNuxtApp()
import { ref } from 'vue'

const printerChar = ref<BluetoothRemoteGATTCharacteristic | null>(null)

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

// Fungsi bantu format ESC/POS
function toEscPos(text: string): Uint8Array {
  const encoder = new TextEncoder()
  const line = encoder.encode(text + '\n')
  return line
}

async function printInvoice() {
  if (!printerChar.value) return

  const commands = [
    toEscPos('\x1B\x40'), // initialize
    toEscPos('*** My Store ***'),
    toEscPos(`Invoice #: INV-${Date.now()}`),
    toEscPos('Item A        1 x $10'),
    toEscPos('Item B        2 x $5'),
    toEscPos('----------------------'),
    toEscPos('Total: $20'),
    toEscPos('\n\n'),
    toEscPos('Thank you!'),
    toEscPos('\x1D\x56\x41\x10'), // cut paper
  ]

  for (const cmd of commands) {
    await $bluetooth.send(printerChar.value, cmd)
  }
  alert('Invoice sent to printer')
}
</script>

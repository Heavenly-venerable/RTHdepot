export function toEscPos(text: string): Uint8Array {
  const encoder = new TextEncoder()
  return encoder.encode(text + '\n')
}

function formatCurrency(value: number): string {
  return `Rp${value.toLocaleString('id-ID')}`
}

export async function printSingleInvoice(invoice: any, characteristic, bluetooth: any) {
  const type = invoice.type === "purchase" ? "Pembelian" : "Penjualan"
  const commands = [
    toEscPos('\x1B\x40'),

    toEscPos('\x1B\x61\x01'),
    toEscPos('\x1D\x21\x11'),
    toEscPos('DEPOT RTH\n'),
    toEscPos('\x1D\x21\x00'),
    toEscPos('------------------------------\n'),

    toEscPos('\x1B\x61\x00'),
    toEscPos(`Invoice #: INV-${invoice.id}\n`),
    toEscPos(`Tanggal   : ${formatDate(invoice.createAt)}\n`),
    toEscPos(`Nama   : ${invoice.partner}\n`),
    toEscPos(`Type Transaksi   : ${type}\n`),
    toEscPos('------------------------------\n'),

    ...invoice.items.flatMap((item: any) => {
      const name = item.product.name.slice(0, 18).padEnd(18)
      const qtyPrice = `${item.quantity}x${formatCurrency(item.price)}`.padStart(12)
      const subTotal = formatCurrency(item.quantity * item.price).padStart(30)
      return [
        toEscPos(`${name}${qtyPrice}\n`),
        toEscPos(`${subTotal}\n`)
      ]
    }),

    toEscPos('------------------------------\n'),

    toEscPos('\x1D\x21\x01'),
    toEscPos('TOTAL: '.padEnd(20) + formatCurrency(invoice.total) + '\n'),
    toEscPos('\x1D\x21\x00'),
    toEscPos('\n'),

    toEscPos('\x1B\x61\x01'),
    toEscPos('Terima kasih\n'),
    toEscPos('Semoga harimu menyenangkan\n'),
    toEscPos('\n\n\n')
  ]

  for (const cmd of commands) {
    await bluetooth.send(characteristic, cmd)
  }
}

// utils/escpos.ts

export function toEscPos(text: string): Uint8Array {
  const encoder = new TextEncoder()
  return encoder.encode(text + '\n')
}

export function buildInvoiceCommands(invoice: any): Uint8Array[] {
  return [
    toEscPos('\x1B\x40'),

    toEscPos('\x1D\x21\x00'),
    toEscPos('*** DEPOT RTH ***'),

    toEscPos(`Invoice #: INV-${invoice.id}`),
    toEscPos(`Tanggal : ${formatDate(invoice.createAt)}`),
    toEscPos(`Nama Nelayan: ${invoice.partner}`),

    toEscPos('\x1D\x21\x00'),
    ...invoice.items.map((item: any) => {
      const name = item.product.name.padEnd(14)
      const qtyPrice = `${item.quantity} x ${formatCurrency(item.price)}`
      return toEscPos(`${name}${qtyPrice}`)
    }),

    toEscPos('--------------------------'),

    toEscPos('\x1D\x21\x01'),
    toEscPos(`Total: ${formatCurrency(invoice.total)}`),

    toEscPos('\x1D\x21\x00'),
    toEscPos('\n\nTerima kasih\n\n'),
  ]
}

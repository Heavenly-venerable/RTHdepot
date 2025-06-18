export function formatPrice(value: number | string): string {
  const number = typeof value === 'string' ? parseInt(value, 10) : value;

  if (isNaN(number)) return 'Rp0';

  return number.toLocaleString('id-ID', {
    maximumFractionDigits: 0,
    style: "currency",
    currency: "IDR"
  });
}

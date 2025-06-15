const bulanIndo = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
]

export function formatDate(dateInput: string | Date, withTime = false): string {
  const date = new Date(dateInput)

  const day = date.getDate()
  const month = bulanIndo[date.getMonth()]
  const year = date.getFullYear()

  const formattedDate = `${day} ${month} ${year}`

  if (!withTime) return formattedDate

  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${formattedDate} ${hours}:${minutes}`
}


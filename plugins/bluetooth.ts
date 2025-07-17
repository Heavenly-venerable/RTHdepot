export default defineNuxtPlugin(nuxtApp => {
  return {
    provide: {
      bluetooth: {
        async requestPrinter() {
          const device = await navigator.bluetooth.requestDevice({
            filters: [{ services: ['0000ffe0-0000-1000-8000-00805f9b34fb'] }], // ganti sesuai printer
            optionalServices: ['0000ffe0-0000-1000-8000-00805f9b34fb'],
          })
          const server = await device.gatt?.connect()
          const service = await server?.getPrimaryService('0000ffe0-0000-1000-8000-00805f9b34fb')
          const characteristic = await service?.getCharacteristic('0000ffe1-0000-1000-8000-00805f9b34fb')
          return { device, characteristic }
        },
        async send(characteristic, data: Uint8Array) {
          await characteristic.writeValue(data)
        },
      }
    }
  }
})

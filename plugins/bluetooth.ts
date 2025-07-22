export default defineNuxtPlugin(nuxtApp => {
  return {
    provide: {
      bluetooth: {
        async requestPrinter() {
          const device = await navigator.bluetooth.requestDevice({
            filters: [{ services: ['e7810a71-73ae-499d-8c15-faa9aef0c3f2'] }],
          })
          const server = await device.gatt?.connect()
          const service = await server?.getPrimaryService('e7810a71-73ae-499d-8c15-faa9aef0c3f2')
          const characteristic = await service?.getCharacteristic('bef8d6c9-9c21-4c9e-b632-bd58c1009f9f')
          return { device, characteristic }
        },
        async send(characteristic, data: Uint8Array) {
          await characteristic.writeValue(data)
        },
      }
    }
  }
})

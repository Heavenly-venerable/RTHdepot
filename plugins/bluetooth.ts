export default defineNuxtPlugin(() => {
  return {
    provide: {
      bluetooth: {
        async requestPrinter() {
          try {
            const device = await navigator.bluetooth.requestDevice({
              filters: [
                { services: ['e7810a71-73ae-499d-8c15-faa9aef0c3f2'] } // Ganti dengan UUID printer kamu
              ]
            })

            const server = await device.gatt?.connect()
            if (!server) throw new Error('Failed to connect to GATT server')

            const service = await server.getPrimaryService('e7810a71-73ae-499d-8c15-faa9aef0c3f2')
            const characteristic = await service.getCharacteristic('bef8d6c9-9c21-4c9e-b632-bd58c1009f9f')

            return { device, characteristic }
          } catch (error) {
            console.error('Bluetooth connection error:', error)
            throw error
          }
        },

        async send(
          characteristic,
          data: Uint8Array
        ): Promise<void> {
          if (!characteristic) throw new Error('No Bluetooth characteristic provided')
          try {
            await characteristic.writeValue(data)
          } catch (error) {
            console.error('Failed to send data to printer:', error)
            throw error
          }
        }
      }
    }
  }
})

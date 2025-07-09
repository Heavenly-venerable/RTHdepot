export const useInvoices = () => {
  const { data: invoices, refresh, status, error } = useFetch("/api/invoices")

  const createInvoice = async (form: any) => {
    try {
      await $fetch("/api/invoices", {
        method: "POST",
        body: form
      })
      await refresh()
    } catch (error) {
      console.error("Failed to create invoice", error)
    }
  }

  const deleteInvoice = async (id: string) => {
    try {
      await $fetch(`/api/invoices/${id}`, {
        method: "DELETE"
      })
      await refresh()
    } catch (error) {
      console.error("Failed to delete invoice", error)
    }
  }

  return {
    invoices,
    refresh,
    error,
    status,
    createInvoice,
    deleteInvoice
  }
}

export const useInvoice = (id?: string) => {
  const route = useRoute()
  const invoiceId = id || route.params.id as string

  const { data: invoice, error } = useFetch(`/api/invoices/${invoiceId}`)

  const updateInvoice = async (payload: any) => {
    try {
      await $fetch(`/api/invoices/${invoiceId}`, {
        method: "PATCH",
        body: payload
      })
      await useInvoices().refresh()
    } catch (error) {
      console.error("Failed to update invoice", error)
    }
  }

  return {
    invoice,
    error,
    updateInvoice
  }
}

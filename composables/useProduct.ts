export const useProducts = () => {
  const { data: productsData, refresh, error } = useFetch("/api/products")

  const products = computed(() => productsData.value?.data ?? [])

  const createProduct = async (form: any) => {
    try {
      await $fetch("/api/products", {
        method: "POST",
        body: form
      })
      await refresh()
    } catch (error) {
      console.log("Failed to create product", error)
    }
  }

  const deleteProduct = async (id: string) => {
    try {
      await $fetch(`/api/products/${id}`, {
        method: "DELETE"
      })
      await refresh()
    } catch (error) {
      console.log("Failed to delete product", error)
    }
  }

  return {
    products,
    refresh,
    error,
    createProduct,
    deleteProduct
  }
}

export const useProduct = (id?: string) => {
  const route = useRoute()
  const productId = id || route.params.id as string

  const updateProduct = async (payload: any) => {
    try {
      await $fetch(`/api/products/${productId}`, {
        method: "PATCH",
        body: payload
      })
      await useProducts().refresh()
    } catch (error) {
      console.error("Failed to update product", error)
    }
  }

  return {
    updateProduct
  }
}

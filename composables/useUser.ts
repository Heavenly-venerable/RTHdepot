export const useUsers = () => {
  const { data: users, refresh, error } = useFetch("/api/users", { key: "users" })

  const createUser = async (form: any) => {
    try {
      await $fetch("/api/users", {
        method: "POST",
        body: form
      })
      await refresh()
    } catch (error) {
      console.error("Failed to create user", error)
    }
  }

  return {
    users,
    refresh,
    error,
    createUser
  }
}

export const useUser = (id: string) => {
  const route = useRoute()
  const userId = id || route.params.id as string

  const updateUser = async (payload: any) => {
    try {
      await $fetch(`/api/users/${userId}`, {
        method: "PATCH",
        body: payload
      })
      await useUsers().refresh()
    } catch (error) {
      console.error("Failed to update user", error)
    }
  }

  return {
    updateUser
  }
}

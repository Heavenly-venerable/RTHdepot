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

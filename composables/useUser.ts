export const useUsers = () => {
  const { data: users, refresh, error } = useFetch("/api/users", { key: "users" })

  return {
    users,
    refresh,
    error
  }
}

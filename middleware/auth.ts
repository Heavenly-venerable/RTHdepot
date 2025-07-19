export default defineNuxtRouteMiddleware(async (to, from) => {
  const session = await useUserSession()

  if (!session?.user?.value) {
    return await navigateTo("/auth/login?message=unauthorized")
  }
})

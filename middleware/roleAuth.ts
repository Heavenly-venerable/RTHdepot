// middleware/role.ts

export default defineNuxtRouteMiddleware((to) => {
  const session = useUserSession();
  if (!session?.loggedIn?.value) {
    return navigateTo("/auth/login?message=unauthorized");
  }
  const userRole = session?.user?.value?.role ?? "";
  const requiredRole = to.meta.requiredRole as string | undefined;
  if (!requiredRole) return;
  const roleHierarchy = ['user', 'staff', 'admin', 'superadmin'];
  const hasAccess = (
    userRole: string,
    requiredRole: string
  ): boolean => {
    return roleHierarchy.indexOf(userRole) >= roleHierarchy.indexOf(requiredRole);
  };
  if (!hasAccess(userRole, requiredRole)) {
    return navigateTo("/unauthorized");
  }
});

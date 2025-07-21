export const usePermission = () => {
  const session = useUserSession()
  const role = computed(() => session?.user?.value?.role ?? 'user')

  const roleHierarchy = ['user', 'staff', 'admin', 'superadmin']

  const hasRole = (minRole: string) => {
    return roleHierarchy.indexOf(role.value) >= roleHierarchy.indexOf(minRole)
  }

  const canView = computed(() => hasRole('staff'))
  const canEdit = computed(() => hasRole('staff'))
  const canCreate = computed(() => hasRole('staff'))
  const canDelete = computed(() => hasRole('admin'))

  if (!canView.value) {
    navigateTo('/unauthorized')
  }

  return {
    role,
    canView,
    canEdit,
    canCreate,
    canDelete,
    hasRole,
  }
}

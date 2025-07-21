<script setup lang="ts">
const { clear: clearSession } = useUserSession()
const { hasRole } = usePermission()
const visible = ref(false);
const route = useRoute()

const menuItems = computed(() => {
  const items = [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      to: '/dashboard'
    },
    {
      label: 'Invoices',
      icon: 'pi pi-file',
      to: '/dashboard/invoices',
      children: [
        {
          label: '+ Create Invoice',
          to: '/dashboard/invoices/create',
          class: 'pl-8 py-2 text-sm text-zinc-600 hover:text-primary'
        }
      ]
    },
    {
      label: 'Products',
      icon: 'pi pi-box',
      to: '/dashboard/products',
      children: [
        {
          label: '+ Create Product',
          to: '/dashboard/products/create',
          class: 'pl-8 py-2 text-sm text-zinc-600 hover:text-primary'
        }
      ]
    }
  ]

  if (hasRole("admin")) {
    item.push(
      {
        label: 'Users',
        icon: 'pi pi-users',
        to: '/dashboard/users',
        children: [
          {
            label: '+ Create User',
            to: '/dashboard/users/create',
            class: 'pl-8 py-2 text-sm text-zinc-600 hover:text-primary'
          }
        ]
      }
    )
  }

  return items
})

async function logout() {
  await clearSession();
  await navigateTo("/auth/login");
}

watch(() => route.fullPath, () => {
  visible.value = false
})
</script>

<template>
  <nav class="fixed top-0 left-0 w-full bg-white p-2 shadow z-50 dark:bg-zinc-900 dark:shadow-md">
    <Button @click="visible = !visible" variant="text" severity="contrast" icon="pi pi-bars" />
  </nav>
  <Drawer class="border-none dark:bg-zinc-900" v-model:visible="visible">
    <template #container="{ closeCallback }">
      <div class="flex flex-col h-full z-50">
        <div class="flex items-center justify-between px-4 py-3 border-b border-zinc-200">
          <span class="text-lg font-semibold">Menu</span>
          <Button @click="closeCallback" severity="contrast" icon="pi pi-times" rounded text />
        </div>
        <div class="overflow-y-auto">
          <ul class="list-none m-0 p-0">
            <li v-for="(item, index) in menuItems" :key="index">
              <RouterLink :to="item.to"
                class="flex items-center p-4 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                <i :class="`${item.icon} mr-2`" />
                <span>{{ item.label }}</span>
              </RouterLink>
              <div v-if="item.children">
                <RouterLink v-for="(child, cIndex) in item.children" :key="cIndex" :to="child.to"
                  :class="`flex items-center ${child.class}`">
                  {{ child.label }}
                </RouterLink>
              </div>
            </li>
          </ul>
          <div class="flex justify-center px-4">
            <Button @click="logout()" class="mt-4" label="Logout" icon="pi pi-sign-out" fluid />
          </div>
        </div>
      </div>
    </template>
  </Drawer>
</template>

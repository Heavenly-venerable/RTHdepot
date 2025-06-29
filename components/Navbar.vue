<script setup lang="ts">
const visible = ref(false);
</script>

<template>
  <nav class="fixed top-0 left-0 w-full bg-white p-2 shadow z-50">
    <Button @click="visible = !visible" variant="text" severity="contrast" icon="pi pi-bars" />
  </nav>
  <Drawer v-model:visible="visible">
    <template #container="{ closeCallback }">
      <div class="flex flex-col h-full z-50">
        <div class="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <span class="text-lg font-semibold">Menu</span>
          <Button @click="closeCallback" severity="contrast" icon="pi pi-times" rounded text />
        </div>
        <div class="overflow-y-auto">
          <ul class="list-none m-0 p-0">
            <li>
              <RouterLink to="/"
                class="flex items-center p-4 hover:bg-gray-100 dark:hover:bg-surface-800 transition-colors">
                <i class="pi pi-home mr-2" />
                <span>Dashboard</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/invoices"
                class="flex items-center p-4 hover:bg-gray-100 dark:hover:bg-surface-800 transition-colors">
                <i class="pi pi-file mr-2" />
                <span>Invoices</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/invoices/create"
                class="flex items-center pl-8 py-2 text-sm text-gray-600 hover:text-primary">
                + Create Invoice
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/products"
                class="flex items-center p-4 hover:bg-gray-100 dark:hover:bg-surface-800 transition-colors">
                <i class="pi pi-box mr-2" />
                <span>Products</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/products/create"
                class="flex items-center pl-8 py-2 text-sm text-gray-600 hover:text-primary">
                + Create Product
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </template>
  </Drawer>
</template>

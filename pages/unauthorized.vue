<template>
  <div class="w-full h-svh flex flex-col items-center justify-center bg-white px-4">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-red-600">401</h1>
      <h2 class="text-2xl font-semibold mt-4">Unauthorized</h2>
      <p class="mt-2 text-gray-600">
        Kamu tidak punya akses ke halaman ini. Silakan login atau hubungi admin.
      </p>
      <div class="mt-6 flex justify-center gap-4">
        <NuxtLink to="/">
          <Button label="Kembali ke Beranda" />
        </NuxtLink>
        <NuxtLink to="/auth/login">
          <Button label="Login" severity="secondary" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

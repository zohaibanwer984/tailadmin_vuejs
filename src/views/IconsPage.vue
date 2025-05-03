<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div
      class="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12"
    >
      <div class="m-auto w-full text-center">
        <h3 class="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
          Icons
        </h3>
        <div class="grid grid-cols-4 gap-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-8">
          <div
            v-for="(Icon, name) in icons"
            :key="name"
            class="flex flex-col items-center text-center"
          >
            <component :is="Icon" class="w-10 h-10 text-gray-700 dark:text-gray-300" />
            <span class="mt-2 text-sm text-gray-600 dark:text-gray-400">{{ name }}</span>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref } from 'vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'

// Dynamically import all icons from the `src/icons` directory
const icons = ref({})
const modules = import.meta.glob('../icons/*.vue', { eager: true })

for (const path in modules) {
  const name = path.split('/').pop().replace('.vue', '')
  icons.value[name] = modules[path].default
}
</script>

<style scoped>
/* Add any additional styles if needed */
</style>

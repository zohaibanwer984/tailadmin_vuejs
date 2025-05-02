<template>
  <div
    v-if="isMobileOpen"
    class="fixed inset-0 bg-gray-900/50 z-9999 lg:hidden"
    @click="toggleMobileSidebar"
  ></div>
</template>

<script>
import { useSidebar } from '@/composables/useSidebar.js'

export default {
  setup() {
    // Call useSidebar inside the setup function
    const { toggleMobileSidebar, isMobileOpen } = useSidebar()

    return {
      toggleMobileSidebar,
      isMobileOpen,
    }
  },
}
</script>

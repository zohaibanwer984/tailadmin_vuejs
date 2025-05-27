<template>
  <div class="fixed inset-0 z-99999">
    <!-- Transparent blur backdrop (optional) -->
    <div
      v-if="fullScreenBackdrop"
      class="fixed inset-0 bg-gray-400/5 backdrop-blur-[3px]"
      aria-hidden="true"
      @click="$emit('close')"
    ></div>

    <!-- Modal centered both vertically and horizontally -->
    <div class="flex items-center justify-center w-full h-full">
      <div
        class="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700"
      >
        <slot name="body"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  fullScreenBackdrop: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['close'])
</script>

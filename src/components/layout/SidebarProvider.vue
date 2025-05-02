<template>
  <slot></slot>
</template>

<script>
import { useSidebarProvider } from '@/composables/useSidebar.js';

export default {
  setup(_, { slots }) {
    useSidebarProvider();
    return () => slots.default();
  },
};
</script>

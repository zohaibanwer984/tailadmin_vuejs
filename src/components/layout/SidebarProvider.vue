<template>
  <slot></slot>
</template>

<script setup>
import { useSidebarProvider } from '@/composables/useSidebarProvider'
useSidebarProvider()
</script>

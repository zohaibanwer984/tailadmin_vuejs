<template>
  <ThemeProvider>
    <SidebarProvider>
      <RouterView />
      <Loading
        :active="loadingState.isLoading"
        :is-full-page="true"
        color="#465fff"
        backgroundColor="rgba(0, 0, 0, 0.5)"
        loader="dots"
      />
    </SidebarProvider>
  </ThemeProvider>
</template>

<script setup>
import ThemeProvider from './components/layout/ThemeProvider.vue'
import SidebarProvider from './components/layout/SidebarProvider.vue'
import { loadingState } from '@/stores/loading'
</script>

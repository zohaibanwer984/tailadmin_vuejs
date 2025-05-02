<template>
    <FullScreenLayout>
      <div class="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
        <div
          class="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900"
        >
          <!-- Left Section -->
          <div class="flex flex-col flex-1 w-full lg:w-1/2">
            <div class="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
              <slot />
            </div>
          </div>
  
          <!-- Right Section -->
          <div
            class="relative items-center hidden w-full h-full lg:w-1/2 bg-brand-950 dark:bg-white/5 lg:grid"
          >
            <div class="flex items-center justify-center z-1">
              <common-grid-shape />
              <div class="flex flex-col items-center max-w-xs">
                <router-link to="/" class="block mb-4">
                  <img width="{231}" height="{48}" src="/images/logo/auth-logo.svg" alt="Logo" />
                </router-link>
                <p class="text-center text-gray-400 dark:text-white/60">
                  Free and Open-Source Tailwind CSS Admin Dashboard Template
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FullScreenLayout>
  </template>
  
  <script setup>
  import CommonGridShape from '@/components/common/CommonGridShape.vue'
  import FullScreenLayout from '@/components/layout/FullScreenLayout.vue'
  </script>
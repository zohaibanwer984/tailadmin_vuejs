<template>
  <div class="w-full">
    <div
      :class="[
        orientation === 'vertical' ? 'flex flex-col gap-6 sm:flex-row sm:gap-8' : 'space-y-0',
      ]"
    >
      <!-- Horizontal layout -->
      <div v-if="orientation === 'horizontal'" class="w-full">
        <!-- Navigation -->
        <nav
          :class="[
            'p-3 border border-gray-200 rounded-t-xl dark:border-gray-800',
            variant === 'underline' ? 'pt-6 pb-0' : '',
          ]"
        >
          <div
            :class="[
              variant === 'pills'
                ? 'flex rounded-lg bg-gray-100 p-1 dark:bg-gray-900'
                : variant === 'underline'
                ? 'flex -mb-px space-x-2'
                : 'flex space-x-2',
              'overflow-x-auto [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600 dark:[&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:h-1.5',
            ]"
          >
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="selectTab(tab.id)"
              class="tab-button inline-flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200 ease-in-out rounded-md"
              :class="[
                variant === 'pills' && activeTab === tab.id
                  ? 'bg-white text-gray-900 shadow-theme-xs dark:bg-white/[0.03] dark:text-white'
                  : variant === 'pills'
                  ? 'bg-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                  : '',

                variant === 'underline'
                  ? [
                      'border-b-2 px-2.5 rounded-none',
                      activeTab === tab.id
                        ? 'text-brand-500 dark:text-brand-400 border-brand-500 dark:border-brand-400'
                        : 'text-gray-500 border-transparent hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200',
                    ]
                  : '',

                variant === 'contained' && activeTab === tab.id
                  ? 'bg-brand-50 text-brand-500 dark:bg-brand-500/15 dark:text-brand-400'
                  : variant === 'contained'
                  ? 'bg-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800/50'
                  : '',

                (hasIcons || hasBadges) ? 'gap-2' : '',
              ]"
            >
              <component v-if="tab.icon" :is="tab.icon" class="size-5" />
              <svg
                v-else-if="tab.iconPath"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="size-5"
              >
                <path :d="tab.iconPath" fill="currentColor" />
              </svg>
              <span>{{ tab.title }}</span>
              <span
                v-if="tab.badge"
                class="inline-flex items-center justify-center rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-500 dark:bg-brand-500/15 dark:text-brand-400"
              >
                {{ tab.badge }}
              </span>
            </button>
          </div>
        </nav>

        <!-- Content -->
        <div class="p-6 pt-4 border border-t-0 border-gray-200 rounded-b-xl dark:border-gray-800">
          <template v-for="tab in tabs" :key="tab.id">
            <div v-if="activeTab === tab.id">
              <slot :name="`${activeTab}_tab`" :tab="tab" />
            </div>
          </template>
        </div>
      </div>

      <!-- Vertical layout -->
      <template v-else>
        <!-- Navigation -->
        <nav
          class="overflow-x-auto pb-2 sm:w-[200px] sm:border-r sm:border-gray-200 dark:sm:border-gray-800 sm:pr-6
            flex flex-row w-full sm:flex-col sm:space-y-2
            [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-100 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-track]:bg-white dark:[&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:h-1.5"
        >
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="selectTab(tab.id)"
            class="tab-button flex items-center w-full px-3 py-2 text-sm font-medium transition-colors duration-200 ease-in-out rounded-lg sm:p-3"
            :class="[
              activeTab === tab.id
                ? 'text-brand-500 dark:text-brand-400 bg-brand-50 dark:bg-brand-400/20'
                : 'bg-transparent text-gray-500 border-transparent hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200',
              (hasIcons || hasBadges) ? 'gap-2' : '',
            ]"
          >
            <component v-if="tab.icon" :is="tab.icon" class="size-5" />
            <svg
              v-else-if="tab.iconPath"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="size-5"
            >
              <path :d="tab.iconPath" fill="currentColor" />
            </svg>
            <span>{{ tab.title }}</span>
            <span
              v-if="tab.badge"
              class="inline-flex items-center justify-center rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-500 dark:bg-brand-500/15 dark:text-brand-400"
            >
              {{ tab.badge }}
            </span>
          </button>
        </nav>

        <!-- Content -->
        <div class="flex-1 sm:pl-6 p-6 border border-gray-200 rounded-xl dark:border-gray-800">
          <template v-for="tab in tabs" :key="tab.id">
            <div v-if="activeTab === tab.id">
              <slot :name="`${activeTab}_tab`" :tab="tab" />
            </div>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: String,
  tabs: {
    type: Array,
    required: true,
    validator: (tabs) =>
      tabs.every((tab) => typeof tab.id === 'string' && typeof tab.title === 'string'),
  },
  variant: {
    type: String,
    default: 'pills',
    validator: (val) => ['pills', 'underline', 'contained'].includes(val),
  },
  orientation: {
    type: String,
    default: 'horizontal',
    validator: (val) => ['horizontal', 'vertical'].includes(val),
  },
})

const emit = defineEmits(['update:modelValue'])

const activeTab = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const hasIcons = computed(() => props.tabs.some((tab) => tab.icon || tab.iconPath))
const hasBadges = computed(() => props.tabs.some((tab) => tab.badge))

const selectTab = (id) => {
  activeTab.value = id
}
</script>

<style scoped>
.tab-nav {
  scrollbar-width: thin;
  scrollbar-color: rgb(229 231 235) transparent;
}
.dark .tab-nav {
  scrollbar-color: rgb(75 85 99) transparent;
}
.shadow-theme-xs {
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}
</style>

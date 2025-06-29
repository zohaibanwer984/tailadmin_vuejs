<template>
  <span :class="[baseStyles, sizeClass, colorStyles]">
    <span v-if="startIcon" class="mr-1">
      <component :is="startIcon" />
    </span>
    <slot></slot>
    <span v-if="endIcon" class="ml-1">
      <component :is="endIcon" />
    </span>
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'light',
    validator: (value) => ['light', 'solid'].includes(value)
  },
  color: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'success', 'error', 'warning', 'info', 'light', 'dark'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md'].includes(value)
  },
  startIcon: {
    type: [Object, Function],
    default: null
  },
  endIcon: {
    type: [Object, Function],
    default: null
  }
})

const baseStyles =
  'inline-flex items-center px-2.5 py-0.5 justify-center gap-1 rounded-full font-medium capitalize'

const sizeStyles = {
  sm: 'text-theme-xs',
  md: 'text-sm'
}

const variants = {
  light: {
    primary: 'bg-brand-50 text-brand-500 dark:bg-brand-500/15 dark:text-brand-400',
    success: 'bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500',
    error: 'bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500',
    warning: 'bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-orange-400',
    info: 'bg-blue-light-50 text-blue-light-500 dark:bg-blue-light-500/15 dark:text-blue-light-500',
    light: 'bg-gray-100 text-gray-700 dark:bg-white/5 dark:text-white/80',
    dark: 'bg-gray-500 text-white dark:bg-white/5 dark:text-white'
  },
  solid: {
    primary: 'bg-brand-500 text-white dark:text-white',
    success: 'bg-success-500 text-white dark:text-white',
    error: 'bg-error-500 text-white dark:text-white',
    warning: 'bg-warning-500 text-white dark:text-white',
    info: 'bg-blue-light-500 text-white dark:text-white',
    light: 'bg-gray-400 dark:bg-white/5 text-white dark:text-white/80',
    dark: 'bg-gray-700 text-white dark:text-white'
  }
}

const sizeClass = computed(() => sizeStyles[props.size])
const colorStyles = computed(() => variants[props.variant][props.color])
</script>
<template>
  <div :class="['relative inline-block rounded-full', sizeClasses[size]]">
    <img 
      :src="src" 
      :alt="alt" 
      class="object-cover w-full h-full rounded-full"
      :class="{
        'ring-2 ring-white dark:ring-gray-800': hasStatus,
        'ring-offset-2': hasStatus && ringOffset
      }"
    />
    <span
      v-if="hasStatus"
      :class="[
        'absolute block rounded-full border-2 border-white dark:border-gray-900',
        statusSizeClasses[size],
        statusColorClasses[status],
        statusPositionClasses[size]
      ]"
    ></span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: 'User Avatar'
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge'].includes(value)
  },
  status: {
    type: String,
    default: 'none',
    validator: (value) => ['none', 'online', 'offline', 'busy'].includes(value)
  },
  ringOffset: {
    type: Boolean,
    default: false
  }
})

const hasStatus = computed(() => props.status !== 'none')

const sizeClasses = {
  xsmall: 'h-6 w-6',
  small: 'h-8 w-8',
  medium: 'h-10 w-10',
  large: 'h-12 w-12',
  xlarge: 'h-14 w-14',
  xxlarge: 'h-16 w-16'
}

const statusSizeClasses = {
  xsmall: 'h-1.5 w-1.5',
  small: 'h-2 w-2',
  medium: 'h-2.5 w-2.5',
  large: 'h-3 w-3',
  xlarge: 'h-3.5 w-3.5',
  xxlarge: 'h-4 w-4'
}

const statusPositionClasses = {
  xsmall: '-bottom-0.5 -right-0.5',
  small: '-bottom-0.5 -right-0.5',
  medium: '-bottom-1 -right-1',
  large: '-bottom-1 -right-1',
  xlarge: '-bottom-1 -right-1',
  xxlarge: '-bottom-1.5 -right-1.5'
}

const statusColorClasses = {
  online: 'bg-success-500',
  offline: 'bg-error-400',
  busy: 'bg-warning-500'
}
</script>
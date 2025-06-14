<template>
  <div 
    :class="['rounded-xl border p-4', variantClasses[validatedVariant].container]"
    role="alert"
    :aria-live="variant === 'error' ? 'assertive' : 'polite'"
  >
    <div class="flex items-start gap-3">
      <div :class="['-mt-0.5 flex-shrink-0', variantClasses[validatedVariant].icon]">
        <component :is="icons[validatedVariant]" class="w-5 h-5" />
      </div>

      <div>
        <h4 class="mb-1 text-sm font-semibold text-gray-800 dark:text-white/90">
          {{ title }}
        </h4>

        <p class="text-sm text-gray-500 dark:text-gray-400">{{ message }}</p>

        <router-link
          v-if="showLink"
          :to="linkHref"
          class="inline-block mt-3 text-sm font-medium text-gray-500 underline dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
        >
          {{ linkText }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { SuccessIcon, ErrorIcon, WarningIcon, InfoCircleIcon } from '@/icons';
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'info',
    validator: (value) => ['success', 'error', 'warning', 'info'].includes(value),
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  showLink: {
    type: Boolean,
    default: false,
  },
  linkHref: {
    type: [String, Object],
    default: '#',
  },
  linkText: {
    type: String,
    default: 'Learn more',
  },
});

const variantClasses = {
  success: {
    container: 'border-success-500 bg-success-50 dark:border-success-500/30 dark:bg-success-500/15',
    icon: 'text-success-500',
  },
  error: {
    container: 'border-error-500 bg-error-50 dark:border-error-500/30 dark:bg-error-500/15',
    icon: 'text-error-500',
  },
  warning: {
    container: 'border-warning-500 bg-warning-50 dark:border-warning-500/30 dark:bg-warning-500/15',
    icon: 'text-warning-500',
  },
  info: {
    container: 'border-blue-light-500 bg-blue-light-50 dark:border-blue-light-500/30 dark:bg-blue-light-500/15',
    icon: 'text-blue-light-500',
  },
};

const icons = {
  success: SuccessIcon,
  error: ErrorIcon,
  warning: WarningIcon,
  info: InfoCircleIcon,
};

const validatedVariant = computed(() => props.variant);
</script>
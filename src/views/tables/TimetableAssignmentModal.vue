<template>
  <Modal v-if="isOpen" @close="handleClose" :fullScreenBackdrop="true">
    <template #body>
      <h2 class="text-xl font-semibold my-2 text-gray-800 dark:text-white/90 p-4 lg:px-11">
        {{ modalTitle }}
      </h2>

      <!-- View Mode Display -->
      <div v-if="modalMode === 'view'" class="border-t border-gray-300 dark:border-gray-700 sm:p-6 p-4 lg:px-11">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-400">
              Subject
            </label>
            <div class="h-11 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-white/90">
              {{ entry.subject || 'No subject assigned' }}
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-400">
              Teacher
            </label>
            <div class="h-11 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-white/90">
              {{ entry.teacher || 'No teacher assigned' }}
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-400">
              Color
            </label>
            <div class="flex items-center gap-3">
              <div 
                class="h-11 w-16 rounded-lg border border-gray-300 dark:border-gray-700"
                :style="{ backgroundColor: entry.color || '#3B82F6' }"
              ></div>
              <div class="h-11 flex items-center px-4 py-2.5 text-sm text-gray-800 dark:text-white/90">
                {{ entry.color || '#3B82F6' }}
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-3 mt-6">
          <Button type="button" variant="outline" @click="handleClose">Close</Button>
        </div>
      </div>

      <!-- Edit/Add Form -->
      <Form
        v-else
        @submit="handleSubmit"
        class="border-t border-gray-300 dark:border-gray-700 sm:p-6 p-4 lg:px-11"
      >
        <!-- Display Form Error -->
        <div v-if="formError" class="mb-4 p-4 bg-red-50 text-red-600 rounded-lg text-sm dark:bg-red-900/20 dark:text-red-400">
          {{ formError }}
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-400">
            Subject
          </label>
          <Field
            name="subject"
            v-model="localEntry.subject"
            type="text"
            rules="required"
            placeholder="Enter Subject"
            class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
          />
          <ErrorMessage name="subject" class="text-red-500 text-sm mt-1 dark:text-red-400" />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-400">
            Teacher
          </label>
          <Field
            name="teacher"
            v-model="localEntry.teacher"
            type="text"
            rules="required"
            placeholder="Enter Teacher Name"
            class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
          />
          <ErrorMessage name="teacher" class="text-red-500 text-sm mt-1 dark:text-red-400" />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-400">
            Color
          </label>
          <Field
            name="color"
            v-model="localEntry.color"
            type="color"
            rules="required"
            class="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:focus:border-brand-800"
          />
          <ErrorMessage name="color" class="text-red-500 text-sm mt-1 dark:text-red-400" />
        </div>

        <div class="flex justify-end gap-3 mt-4">
          <Button type="button" variant="outline" @click="handleClose">Cancel</Button>
          <Button 
            v-if="modalMode === 'edit'" 
            type="button" 
            variant="danger" 
            @click="handleRemove"
          >
            Remove
          </Button>
          <Button type="submit" variant="primary" :loading="isLoading">
            {{ submitButtonText }}
          </Button>
        </div>
      </Form>
    </template>
  </Modal>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import Button from '@/components/ui/Button.vue'
import Modal from '@/components/ui/Modal.vue'

const emit = defineEmits(['close', 'success', 'remove'])
const formError = ref('')
const isLoading = ref(false)

const props = defineProps({
  isOpen: Boolean,
  modalMode: {
    type: String,
    required: true,
    validator: (value) => ['add', 'edit', 'view'].includes(value),
  },
  entry: {
    type: Object,
    required: true,
  },
})

// Create a local reactive copy of the entry prop
const localEntry = ref({ ...props.entry })

// Watch for changes to the prop and update the local copy
watch(
  () => props.entry,
  (newVal) => {
    localEntry.value = { ...newVal }
  },
  { deep: true }
)

// Computed properties
const modalTitle = computed(() => {
  switch (props.modalMode) {
    case 'add':
      return 'Assign Class'
    case 'edit':
      return 'Edit Assignment'
    case 'view':
      return 'View Assignment'
    default:
      return 'Assignment'
  }
})

const submitButtonText = computed(() => (props.modalMode === 'add' ? 'Assign' : 'Update'))

const handleClose = () => {
  formError.value = ''
  localEntry.value = { ...props.entry }
  emit('close')
}

const handleSubmit = async () => {
  formError.value = ''
  isLoading.value = true

  try {
    emit('success', { action: props.modalMode, entry: localEntry.value })
    handleClose()
  } catch (error) {
    formError.value = 'An unexpected error occurred. Please try again.'
  } finally {
    isLoading.value = false
  }
}

const handleRemove = () => {
  emit('remove')
  handleClose()
}
</script>
<template>
  <AuthLayout>
    <div>
      <div class="mb-5 sm:mb-8">
        <h1
          class="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md"
        >
          Forgot Password
        </h1>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Enter your email address to reset your password.
        </p>
      </div>
      <Form @submit="handleSubmit" class="space-y-5">
        <!-- Display Form Error -->
        <div v-if="formError" class="mb-4 text-sm text-red-500">
          {{ formError }}
        </div>
        <!-- Email -->
        <div>
          <label
            for="email"
            class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
          >
            Email<span class="text-error-500">*</span>
          </label>
          <Field
            name="email"
            type="email"
            id="email"
            placeholder="info@gmail.com"
            rules="required|email"
            class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
          />
          <ErrorMessage name="email" class="text-red-500 text-sm mt-1" />
        </div>
        <!-- Button -->
        <div>
          <button
            type="submit"
            class="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
          >
            Reset Password
          </button>
        </div>
      </Form>
      <div class="mt-5">
        <p class="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
          Remembered your password?
          <router-link to="/login" class="text-brand-500 hover:text-brand-600 dark:text-brand-400"
            >Sign In</router-link
          >
        </p>
      </div>
    </div>
  </AuthLayout>
</template>

<script setup>
import { Field, ErrorMessage, Form } from 'vee-validate'
import { ref } from 'vue'
import AuthLayout from '@/components/layout/AuthLayout.vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

const formError = ref('')

const handleSubmit = async (values) => {
  formError.value = '' // Clear previous error
  // authStore
  //   .requestPasswordReset(values)
  //   .then(() => {
      router.push({ name: 'EmailSent', query: { from: 'forget-password' } })
  //   })
  //   .catch((error) => {
  //     if (error?.email) {
  //       formError.value = error.email[0] // Set the error message
  //     } else {
  //       formError.value = 'An unexpected error occurred. Please try again.'
  //     }
  //   })
}
</script>

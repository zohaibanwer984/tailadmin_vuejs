<template>
  <AuthLayout>
    <div>
      <div class="mb-5 sm:mb-8">
        <h1
          class="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md"
        >
          Reset Password
        </h1>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Enter your new password below to reset your account password.
        </p>
      </div>
      <Form @submit="handleSubmit" class="space-y-5">
        <!-- Display Form Error -->
        <div v-if="formError" class="mb-4 text-sm text-red-500">
          {{ formError }}
        </div>
        <!-- New Password -->
        <div>
          <label
            for="new_password"
            class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
          >
            New Password<span class="text-error-500">*</span>
          </label>
          <div class="relative">
            <Field
              name="new_password"
              :type="showNewPassword ? 'text' : 'password'"
              id="new_password"
              placeholder="Enter your new password"
              rules="required|password"
              class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
            />
            <span
              @click="toggleNewPasswordVisibility"
              class="absolute z-30 text-gray-500 -translate-y-1/2 cursor-pointer right-4 top-1/2 dark:text-gray-400"
            >
              <NotShowPasswordIcon v-if="!showNewPassword" />
              <ShowPasswordIcon v-else />
            </span>
          </div>
          <ErrorMessage name="new_password" class="text-red-500 text-sm mt-1" />
        </div>
        <!-- Confirm Password -->
        <div>
          <label
            for="confirm_password"
            class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
          >
            Confirm Password<span class="text-error-500">*</span>
          </label>
          <div class="relative">
            <Field
              name="confirm_password"
              :type="showConfirmPassword ? 'text' : 'password'"
              id="confirm_password"
              placeholder="Confirm your new password"
              rules="required|matchingPassword:new_password"
              class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
            />
            <span
              @click="toggleConfirmPasswordVisibility"
              class="absolute z-30 text-gray-500 -translate-y-1/2 cursor-pointer right-4 top-1/2 dark:text-gray-400"
            >
              <NotShowPasswordIcon v-if="!showConfirmPassword" />
              <ShowPasswordIcon v-else />
            </span>
          </div>
          <ErrorMessage name="confirm_password" class="text-red-500 text-sm mt-1" />
        </div>
        <!-- Submit Button -->
        <div>
          <button
            type="submit"
            class="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
          >
            Reset Password
          </button>
        </div>
      </Form>
    </div>
  </AuthLayout>
</template>

<script setup>
import AuthLayout from '@/components/layout/AuthLayout.vue'
import { ShowPasswordIcon, NotShowPasswordIcon } from '@/icons'
import { Field, ErrorMessage, Form } from 'vee-validate'
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { authService } from '@/services/api'

const router = useRouter()
const route = useRoute()

const showNewPassword = ref(false) // Toggle for new password
const showConfirmPassword = ref(false) // Toggle for confirm password
const formError = ref('') // Reactive variable for form error

const toggleNewPasswordVisibility = () => {
  showNewPassword.value = !showNewPassword.value
}

const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value
}

const handleSubmit = async (values) => {
  formError.value = '' // Clear previous error

  // const uid = route.query.uid
  // const token = route.query.token

  // if (!uid || !token) {
  //   formError.value = 'Invalid reset link!'
    router.push('/login')
  //   return
  // }

  // authService
  //   .resetPasswordConfirm({
  //     uid,
  //     token,
  //     new_password: values.new_password,
  //     confirm_password: values.confirm_password,
  //   })
  //   .then(() => {
  //     alert('Password reset successfully!')
  //     router.push('/login')
  //   })
  //   .catch((error) => {
  //     if (error?.new_password) {
  //       formError.value = error.new_password[0]
  //     } else if (error?.confirm_password) {
  //       formError.value = error.confirm_password[0]
  //     } else if (error?.non_field_errors) {
  //       formError.value = error.non_field_errors[0]
  //     } else {
  //       formError.value = 'Failed to reset password. Please try again.'
  //     }
  //   })
}
</script>

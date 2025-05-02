<template>
  <AuthLayout>
    <div class="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div
        class="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900"
      >
        <div class="flex flex-col flex-1 w-full lg:w-1/2">
          <div class="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
            <div>
              <div class="mb-5 sm:mb-8">
                <h1
                  class="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md"
                >
                  Sign In
                </h1>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Enter your CNIC and password to sign in!
                </p>
              </div>
              <div>
                <Form @submit="handleSubmit" class="space-y-5">
                  <!-- Display Form Error -->
                  <div v-if="formError" class="mb-4 text-sm text-red-500">
                    {{ formError }}
                  </div>
                  <!-- CNIC -->
                  <div>
                    <label
                      for="cnic"
                      class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                    >
                      CNIC<span class="text-error-500">*</span>
                    </label>
                    <Field
                      name="cnic"
                      type="text"
                      id="cnic"
                      placeholder="12345-1234567-1"
                      rules="cnic"
                      class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                    />
                    <ErrorMessage name="cnic" class="text-red-500 text-sm mt-1" />
                  </div>
                  <!-- Password -->
                  <div>
                    <label
                      for="password"
                      class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                    >
                      Password<span class="text-error-500">*</span>
                    </label>
                    <div class="relative">
                      <Field
                        name="password"
                        :type="showPassword ? 'text' : 'password'"
                        id="password"
                        placeholder="Enter your password"
                        rules="required|password"
                        class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                      />
                      <span
                        @click="togglePasswordVisibility"
                        class="absolute z-30 text-gray-500 -translate-y-1/2 cursor-pointer right-4 top-1/2 dark:text-gray-400"
                      >
                        <NotShowPasswordIcon v-if="!showPassword" />
                        <ShowPasswordIcon v-else />
                      </span>
                    </div>
                    <ErrorMessage name="password" class="text-red-500 text-sm mt-1" />
                  </div>
                  <!-- Checkbox -->
                  <div class="flex items-center justify-between">
                    <div>
                      <label
                        for="keepLoggedIn"
                        class="flex items-center text-sm font-normal text-gray-700 cursor-pointer select-none dark:text-gray-400"
                      >
                        <div class="relative">
                          <input
                            v-model="keepLoggedIn"
                            type="checkbox"
                            id="keepLoggedIn"
                            class="sr-only"
                          />
                          <div
                            :class="
                              keepLoggedIn
                                ? 'border-brand-500 bg-brand-500'
                                : 'bg-transparent border-gray-300 dark:border-gray-700'
                            "
                            class="mr-3 flex h-5 w-5 items-center justify-center rounded-md border-[1.25px]"
                          >
                            <span :class="keepLoggedIn ? '' : 'opacity-0'">
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
                                  stroke="white"
                                  stroke-width="1.94437"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </span>
                          </div>
                        </div>
                        Keep me logged in
                      </label>
                    </div>
                    <router-link
                      to="/forget-password"
                      class="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                      >Forgot password?</router-link
                    >
                  </div>
                  <!-- Button -->
                  <div>
                    <button
                      type="submit"
                      class="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
                    >
                      Sign In
                    </button>
                  </div>
                </Form>
                <div class="mt-5">
                  <p
                    class="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start"
                  >
                    Don't have an account?
                    <router-link
                      to="/signup"
                      class="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                      >Sign Up</router-link
                    >
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AuthLayout>
</template>

<script setup>
import AuthLayout from '@/components/layout/AuthLayout.vue'
import { ShowPasswordIcon, NotShowPasswordIcon } from '@/icons'
import { Field, ErrorMessage, Form } from 'vee-validate'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

const showPassword = ref(false)
const keepLoggedIn = ref(false)
const formError = ref('')

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const handleSubmit = async (values) => {
  formError.value = '' // Clear previous error
  // authStore
  //   .login(values)
  //   .then(() => {
      router.push('/dashboard')
    // })
    // .catch((error) => {
    //   if (error?.non_field_errors) {
    //     formError.value = error.non_field_errors[0] // Set the error message
    //   } else {
    //     formError.value = 'An unexpected error occurred. Please try again.'
    //   }
    // })
}
</script>

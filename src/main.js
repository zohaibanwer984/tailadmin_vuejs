import { createApp } from 'vue'
import { configure } from 'vee-validate'
import * as rules from '@vee-validate/rules'
import { defineRule } from 'vee-validate'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import './assets/main.css'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css' // Import the library's styles

// Register all valid rules from @vee-validate/rules
Object.keys(rules).forEach((rule) => {
  if (typeof rules[rule] === 'function') {
    defineRule(rule, rules[rule])
  }
})

// Define a custom rule for password
defineRule('password', (value) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/
  if (!value) {
    return 'Password is required.'
  }
  if (!passwordRegex.test(value)) {
    return 'Password must include at least one uppercase letter, one lowercase letter, and one number.'
  }
  return true
})

// Define a custom rule for CNIC
defineRule('cnic', (value) => {
  const cnicRegex = /^\d{5}-\d{7}-\d{1}$/
  if (!value) {
    return 'CNIC is required.'
  }
  if (!cnicRegex.test(value)) {
    return 'Please enter a valid CNIC (e.g., 12345-1234567-1).'
  }
  return true
})

// Define a custom rule for matching passwords
defineRule('matchingPassword', (value, [target]) => {
  if (!value) {
    return 'Confirm Password is required.'
  }
  if (value !== target) {
    return 'Passwords do not match.'
  }
  return true
})

// Configure default error messages
configure({
  generateMessage: (ctx) => {
    const messages = {
      required: `${ctx.field.charAt(0).toUpperCase() + ctx.field.slice(1)} is required.`,
      email: 'Please enter a valid email address.',
      password: 'Password must include at least one uppercase letter, one lowercase letter, and one number.',
      min: `${ctx.field.charAt(0).toUpperCase() + ctx.field.slice(1)} must be at least ${ctx.rule.params[0]} characters.`,
      cnic: 'Please enter a valid CNIC (e.g., 12345-1234567-1).',
      matchingPassword: 'Passwords do not match.',
    }
    return messages[ctx.rule.name] || `${ctx.field} is invalid.`
  },
})

document.body.classList.add('dark:bg-gray-900');
// Create Vue app
const app = createApp(App)

// Register the loading component globally
app.component('Loading', Loading)

// Use Pinia for state management
app.use(createPinia())

// Use Vue Router
app.use(router)

// Mount app
app.mount('#app')

// Export the router instance
export { router }
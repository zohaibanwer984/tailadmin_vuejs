import './bootstrap'
import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import store from './store'
// import mixins from './mixins'
import globalMixins from './plugins/globalMixins'
import { Form, Field, ErrorMessage } from 'vee-validate'
import VueApexCharts from 'vue3-apexcharts'

const app = createApp(App)

app.use(createPinia())
app.use(router)

if (store && typeof store.install === 'function') {
  app.use(store)
}

app.use(globalMixins) // Now properly registered as plugin

app.component('Form', Form)
app.component('Field', Field)
app.component('ErrorMessage', ErrorMessage)

app.use(VueApexCharts)

app.mount('#app')

import './bootstrap'
import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import store from './store'
import mixins from './mixins'
import { Form, Field, ErrorMessage } from 'vee-validate'
import VueApexCharts from 'vue3-apexcharts'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(store)
app.use(mixins)
app.use(VueApexCharts)

app.mount('#app')

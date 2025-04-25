import { createApp } from 'vue'
import { createStore } from 'vuex'
import User from './modules/User'
import Auth from './modules/Auth'
import Role from './modules/Role'
import Dashboard from './modules/Dashboard'

const app = createApp({})

const getMetaContent = (name) => {
  const meta = document.head.querySelector(`meta[name="${name}"]`)
  return meta ? meta.content : ''
}

// Create the store first
const store = createStore({
  state: {
    URL: getMetaContent('URL') ? getMetaContent('URL') + '/' : '/',
    ShopName: getMetaContent('ShopName'),
    AppVersion: getMetaContent('AppVersion'),
    ApplicationName: getMetaContent('ApplicationName'),
    Loading: false,
    DateRangeShortcuts: [],
    Months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  },
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    Auth,
    User,
    Role,
    Dashboard,
  },
})

// Then use the store instance with the app
app.use(store)

export default store

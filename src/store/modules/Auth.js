import { get, post } from '../../api.js'
import { debounce } from 'lodash'

function initialState() {
  return {
    errors: {},
    form: {
      id: null,
      name: null,
      user_name: null,
      contact_no: null,
      email: null,
      old_password: null,
      password: null,
      password_confirmation: null,
    },
    User: null,
    Permissions: null,
    Role: null,
    // User: Auth.User,
    // Permissions: Auth.Permissions,
    // Role: Auth.Role,
  }
}

export default {
  namespaced: true,
  state: {
    ...initialState(),
  },
  mutations: {
    User: function (state, payload) {
      state.User = payload
    },
    Permission: function (state, payload) {
      state.Permission = payload
    },
    Role: function (state, payload) {
      state.Role = payload
    },
    clearForm: function (state, form_name) {
      state[form_name] = initialState()[form_name]
    },
    errors: function (state, payload) {
      state.errors = payload
    },
  },
  actions: {
    SubmitUser: function ({ commit, dispatch }, form) {
      return new Promise((resolve, reject) => {
        post(form.action, new FormData(form))
          .then(({ data }) => {
            commit('errors', null)
            commit('clearForm', 'form')
            toastr['success'](data.success)
            resolve(data)
          })
          .catch(({ response }) => {
            commit('errors', response.data.errors)
            reject(response)
          })
      })
    },

    GetUser: debounce(function ({ state, commit }) {
      get('profile')
        .then(({ data }) => {
          commit('User', data.User)
          commit('Role', data.Role)
          commit('Permission', data.Permission)
        })
        .catch(({ response }) => commit('errors', response.data.errors))
    }, 100),
  },
  getters: {
    Can: (state) => (permission_name) => {
      return state.Permissions.includes(permission_name)
    },
    Auth: (state) => {
      return {
        User: state.User,
        Permissions: state.Permissions,
        Role: state.Role,
        Modules: state.Modules,
      }
    },
  },
}

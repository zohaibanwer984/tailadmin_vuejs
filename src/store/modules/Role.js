import { get, post } from '../../api.js'
import { debounce } from 'lodash'

function initialState() {
  return {
    filters: {
      page: 1,
      per_page: 10,
      paginate: 1,
      name: null,
      sortBy: 'id',
      sortDesc: false,
    },
    errors: {},
    form: {
      id: null,
      name: null,
      permissions: [],
    },
    permissions: [],

    Role: null,
    Roles: [],
    SelectList: [],
  }
}

export default {
  namespaced: true,
  state: {
    ...initialState(),
  },
  mutations: {
    Roles: function (state, payload) {
      state.Roles = payload
    },
    SelectList: function (state, payload) {
      state.SelectList = payload
    },
    Role: function (state, payload) {
      state.Role = payload
    },
    clearForm: function (state, form_name) {
      state[form_name] = initialState()[form_name]
    },
    edit_form: function (state, payload) {
      state.form = { ...state.form, ...payload }
    },
    errors: function (state, payload) {
      state.errors = payload
    },
  },
  actions: {
    GetRolesSelectList: debounce(function ({ state, commit }) {
      get('role/select-list', state.filter)
        .then(({ data }) => commit('SelectList', data.data))
        .catch(({ response }) => commit('errors', response.data.errors))
    }, 400),

    GetRoles: debounce(function ({ state, commit }) {
      get('role', state.filters)
        .then(({ data }) => commit('Roles', data))
        .catch(({ response }) => commit('errors', response.data.errors))
    }, 400),

    SubmitRole: function ({ commit, dispatch }, form) {
      return new Promise((resolve, reject) => {
        post(form.action, new FormData(form))
          .then(({ data }) => {
            commit('errors', null)
            toastr['success'](data.success)
            resolve(data)
          })
          .catch(({ response }) => {
            commit('errors', response.data.errors)
            reject(response)
          })
      })
    },

    ShowRole: debounce(function ({ state, commit }) {
      get('role/' + state.form.id)
        .then(({ data }) => {
          commit('Role', data.Role)
          commit('edit_form', data.Role)
        })
        .catch(({ response }) => commit('errors', response.data.errors))
    }, 100),
  },
  getters: {},
}

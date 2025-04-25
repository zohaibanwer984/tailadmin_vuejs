import { get, post } from '../../api.js'
import { debounce } from 'lodash'

function initialState() {
  return {
    filters: {
      page: 1,
      per_page: 10,
      paginate: 1,
      name: null,
      email: null,
      sortBy: 'id',
      sortDesc: false,
    },
    errors: {},
    form: {
      id: null,
      name: null,
      role_id: null,
      user_name: null,
      contact_no: null,
      email: null,
      password: null,
      password_confirmation: null,
      active: 1,
    },

    User: null,
    Users: [],
    SelectList: [],
  }
}

export default {
  namespaced: true,
  state: {
    ...initialState(),
    edit_form: initialState()['form'],
  },
  mutations: {
    Users: function (state, payload) {
      state.Users = payload
    },
    SelectList: function (state, payload) {
      state.SelectList = payload
    },
    User: function (state, payload) {
      state.User = payload
    },
    clearForm: function (state, form_name) {
      state[form_name] = initialState()[form_name]
    },
    edit_form: function (state, payload) {
      state.edit_form = { ...state.edit_form, ...payload }
    },
    errors: function (state, payload) {
      state.errors = payload
    },
  },
  actions: {
    GetUsersSelectList: debounce(function ({ state, commit }) {
      get('user/select-list', state.filter)
        .then(({ data }) => commit('SelectList', data.data))
        .catch(({ response }) => commit('errors', response.data.errors))
    }, 400),

    GetUsers: debounce(function ({ state, commit }) {
      get('user', state.filters)
        .then(({ data }) => commit('Users', data))
        .catch(({ response }) => commit('errors', response.data.errors))
    }, 400),

    SubmitUser: function ({ commit, dispatch }, form) {
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

    ShowUser: debounce(function ({ state, commit }) {
      get('user/' + state.edit_form.id)
        .then(({ data }) => {
          commit('edit_form', data.User)
        })
        .catch(({ response }) => commit('errors', response.data.errors))
    }, 100),
  },
  getters: {},
}

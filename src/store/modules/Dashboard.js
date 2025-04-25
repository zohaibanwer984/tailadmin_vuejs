import { debounce } from 'lodash'
import { get } from '../../api.js'

function initialState() {
  return {
    form: {
      search_by: 'day',
      custom_date: '',
    },

    Dashboards: {
      Purchases: {
        total_amount: 0,
        balance: 0,
        total_purchases: 0,
      },
      Sales: {
        total_amount: 0,
        balance: 0,
        total_sales: 0,
      },
      PurchaseReturn: {
        total_purchase_returns: 0,
      },
      SaleReturn: {
        total_sale_returns: 0,
      },
      ItemForPurchase: {
        item_active_for_purchase: 0,
      },
      ItemForSale: {
        item_active_for_sale: 0,
      },
      ItemOutStock: {
        item_out_stock: 0,
      },
      PurchasePaymentDue: [],
      SalePaymentDue: [],
    },

    Dashboard: null,
  }
}

export default {
  namespaced: true,
  state: {
    ...initialState(),
  },
  mutations: {
    Dashboards: function (state, payload) {
      state.Dashboards = payload
    },
    Dashboard: function (state, payload) {
      state.Dashboard = payload
    },
    errors: function (state, payload) {
      state.errors = payload
    },
  },

  actions: {
    GetSearch: debounce(function ({ state, commit }) {
      get('dashboard', state.form)
        .then(({ data }) => commit('Dashboards', data.Dashboards))
        .catch(({ response }) => commit('errors', response.data.errors))
    }, 400),
  },
}

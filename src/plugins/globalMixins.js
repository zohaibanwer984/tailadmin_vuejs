import DatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { post } from '../api.js'
import { booleanFormater } from '../helpers'

export default {
  install(app) {
    // Register global components
    app.component('DatePicker', DatePicker)

    // Register global filters (Vue 3 uses globalProperties instead)
    app.config.globalProperties.$filters = {
      booleanFormater,
      image64: (file) => URL.createObjectURL(file),
    }

    // Add global methods
    app.config.globalProperties.Can = function (permission_name) {
      return this.Auth.User.id == 1 ? 1 : this.Auth.Permissions.includes(permission_name)
    }

    app.config.globalProperties.Delete = function ({ url, id }) {
      return new Promise((resolve, reject) => {
        // Your existing delete logic
      })
    }

    app.config.globalProperties.UpdatePrintableData = function (id) {
      $('#printable_div').html($(id).html())
    }

    app.config.globalProperties.Print = function (id = null) {
      if (id) {
        this.UpdatePrintableData(id)
      }
      window.print()
    }

    app.config.globalProperties.excelExportUrl = function (url, data) {
      return this.URL + url + '?' + $.param(data)
    }
  },
}

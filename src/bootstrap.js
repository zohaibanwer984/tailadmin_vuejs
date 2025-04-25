// Import libraries using ES modules
import moment from 'moment'
import _ from 'lodash'
import { default as Popper } from 'popper.js'
import jQuery from 'jquery'
import toastr from 'toastr'
import axios from 'axios'
import * as Chart from 'chart.js'
import 'bootstrap'

window.moment = moment
window._ = _
window.Popper = Popper
window.$ = window.jQuery = jQuery
window.toastr = toastr
window.axios = axios
window.Chart = Chart

// Configure toastr
toastr.options = {
  closeButton: false,
  debug: false,
  newestOnTop: true,
  progressBar: true,
  positionClass: 'toast-top-center d-print-none',
  preventDuplicates: false,
  onclick: null,
  'tapToDismiss ': true,
  showDuration: '300',
  hideDuration: '1000',
  timeOut: '5000',
  extendedTimeOut: '1000',
  showEasing: 'swing',
  hideEasing: 'linear',
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut',
}

// Configure axios
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
window.axios.defaults.headers.common['ajax'] = true
window.axios.defaults.headers.common['Accept'] = 'application/json'

// Set CSRF token
const token = document.head.querySelector('meta[name="csrf-token"]')
if (token) {
  window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content
} else {
  console.error('CSRF token not found: https://docs.djangoproject.com/en/5.1/howto/csrf/')
}

// Set base URL
const URL = document.head.querySelector('meta[name="URL"]')
if (URL) {
  window.axios.defaults.baseURL = URL.content
} else {
  console.error('Base URL Not LOAD!')
}

// Uncomment if needed
// loadProgressBar()

import store from './store'
import fileDownload from 'js-file-download'

export function get(url, params = null) {
  return byMethod({ method: 'get', url, params })
}

export function post(url, data) {
  return byMethod({ method: 'post', url, data })
}

export function download({ method = 'post', url, data }) {
  byMethod({ method, url, data, headers: { responseType: 'blob' } })
    .then((response) => {
      const headerVal = response.headers['content-disposition']
      const fileName = headerVal.split(';')[1].split('=')[1].replace('"', '').replace('"', '')
      fileDownload(response.data, fileName)
    })
    .catch((error) => console.log(error))
}

export function byMethod({ method, url, data, params = null, headers = {} }) {
  return new Promise((resolve, reject) => {
    store.state.Loading = true
    axios({
      method,
      url,
      data,
      params,
      ...headers,
    })
      .then((res) => {
        store.state.Loading = false
        resolve(res)
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.status == 401 || error.response.status == 419) {
            setTimeout(() => {
              window.location.href = document.head.querySelector('meta[name="URL"]').content + '/'
            }, 1000)
          } else if (error.response.status == 404) {
            setTimeout(() => {
              window.location.href =
                document.head.querySelector('meta[name="URL"]').content + '/#/404'
            }, 1000)
          } else if (error.response.status == 402) {
            setTimeout(() => {
              window.location.href =
                document.head.querySelector('meta[name="URL"]').content + '/#/subscribe'
            }, 1000)
          } else {
            reject(error)
          }
          if (error.response.data.errors) {
            toastr['error'](
              error.response.data.errors[Object.keys(error.response.data.errors)[0]][0],
            )
          } else if (error.response.status == 404) {
            toastr['error']('Data Not Found! <br> statusCode: ' + error.response.status)
          } else {
            toastr['error'](
              error.response.data.message
                ? error.response.data.message + ' statusCode: ' + error.response.status
                : error.message,
            )
          }
          store.state.Loading = false
        } else {
          window.location.href = document.head.querySelector('meta[name="URL"]').content + '/'
        }
      })
  })
}

import DatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
// import PreLoader from '../views/includes/PreLoader.vue'
import { post } from '../api.js'
import { booleanFormater } from '../helpers'
import { mapState, mapGetters } from 'vuex'
export default {
  components: {
    DatePicker,
    // PreLoader,
  },
  filters: {
    booleanFormater,
    image64: (file) => URL.createObjectURL(file),
  },
  computed: {
    ...mapState([
      'Loading',
      // 'ThemeSetting',
      'URL',
      // 'Months',
      'ShopName',
      'DateRangeShortcuts',
      // 'TenantPath',
    ]),
    ...mapState({
      AppVersion: (state) => state.AppVersion,
      ApplicationName: (state) => state.ApplicationName,
      Setting: (state) => state.AppSetting.Setting,
    }),
    ...mapGetters('Auth', ['Auth']),

    //lodash
    // _: function () {
    //   return { ..._ }
    // },
  },
  methods: {
    Can: function (permission_name) {
      return Auth.User.id == 1 ? 1 : this.Auth.Permissions.includes(permission_name)
    },
    Delete: function ({ url, id }) {
      return new Promise((resolve, reject) => {
        swal
          .fire({
            title: 'Are you sure?',
            //					text: "Soft delete!",
            icon: 'warning',
            showCancelButton: true,
          })
          .then((result) => {
            if (result.value) {
              swal.fire({
                title: "<i class='fa fa-spinner fa-spin'></i>",
                showConfirmButton: false,
              })
              post(url, { id })
                .then(({ data }) => {
                  toastr['success'](data.success)
                  swal.close()
                  resolve()
                })
                .catch(() => {
                  swal.close()
                  reject()
                })
            }
          })
      })
    },
    UpdatePrintableData: function (id) {
      $('#printable_div').html($(id).html())
    },
    Print: function (id = null) {
      if (id) {
        this.UpdatePrintableData(id)
      }
      window.print()
    },
    excelExportUrl: function (url, data) {
      return this.URL + url + '?' + $.param(data)
    },
  },
}

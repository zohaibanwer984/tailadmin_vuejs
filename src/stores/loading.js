import { reactive } from 'vue'

export const loadingState = reactive({
  isLoading: false,
})

export const setLoading = (status) => {
  loadingState.isLoading = status
}
<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
  pageSize: {
    type: Number,
    default: 10,
  },
  showEntriesOptions: {
    type: Array,
    default: () => [10, 8, 5],
  },
})

const searchQuery = ref('')
const sortColumn = ref('')
const sortDirection = ref('asc')
const currentPage = ref(1)
const selectedPageSize = ref(props.pageSize)

const filteredData = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()

  let filtered = props.data.filter((row) => {
    return props.columns
      .filter((column) => column.searchable !== false)
      .some((column) => {
        const value = String(row[column.key]).toLowerCase()
        return value.includes(query)
      })
  })

  if (sortColumn.value) {
    filtered = filtered.sort((a, b) => {
      const aValue = a[sortColumn.value]
      const bValue = b[sortColumn.value]

      if (sortDirection.value === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })
  }

  return filtered
})

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * selectedPageSize.value
  const end = start + selectedPageSize.value
  return filteredData.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / selectedPageSize.value)
})

const toggleSort = (column) => {
  if (column.sortable === false) return

  if (sortColumn.value === column.key) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortColumn.value = column.key
    sortDirection.value = 'asc'
  }
}

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const updatePageSize = (size) => {
  selectedPageSize.value = size
  currentPage.value = 1 // Reset to first page when changing page size
}
</script>

<template>
  <div class="space-y-5">
    <div class="overflow-hidden">
      <div
        class="flex flex-col gap-2 py-4 rounded-b-none border-b-0 px-4 sm:flex-row sm:items-center rounded-xl border border-gray-100 sm:justify-between dark:border-gray-800 dark:bg-white/[0.03]"
      >
        <div class="flex items-center gap-3">
          <span class="text-gray-500 dark:text-gray-400">Show</span>
          <div class="relative">
            <select
              v-model="selectedPageSize"
              @change="updatePageSize(parseInt($event.target.value))"
              class="w-full py-2 pl-3 pr-8 text-sm text-gray-800 bg-transparent border border-gray-300 rounded-lg appearance-none dark:bg-dark-900 h-9 bg-none shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
            >
              <option v-for="option in showEntriesOptions" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
            <span
              class="absolute z-30 text-gray-500 -translate-y-1/2 right-2 top-1/2 dark:text-gray-400"
            >
              <svg
                class="stroke-current"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.8335 5.9165L8.00016 10.0832L12.1668 5.9165"
                  stroke=""
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </span>
          </div>
          <span class="text-gray-500 dark:text-gray-400">entries</span>
        </div>

        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search..."
            class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pl-11 pr-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[300px]"
          />
          <button
            class="absolute text-gray-500 -translate-y-1/2 left-4 top-1/2 dark:text-gray-400"
          >
            <svg
              class="fill-current"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.04199 9.37363C3.04199 5.87693 5.87735 3.04199 9.37533 3.04199C12.8733 3.04199 15.7087 5.87693 15.7087 9.37363C15.7087 12.8703 12.8733 15.7053 9.37533 15.7053C5.87735 15.7053 3.04199 12.8703 3.04199 9.37363ZM9.37533 1.54199C5.04926 1.54199 1.54199 5.04817 1.54199 9.37363C1.54199 13.6991 5.04926 17.2053 9.37533 17.2053C11.2676 17.2053 13.0032 16.5344 14.3572 15.4176L17.1773 18.238C17.4702 18.5309 17.945 18.5309 18.2379 18.238C18.5308 17.9451 18.5309 17.4703 18.238 17.1773L15.4182 14.3573C16.5367 13.0033 17.2087 11.2669 17.2087 9.37363C17.2087 5.04817 13.7014 1.54199 9.37533 1.54199Z"
                fill=""
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Table -->
      <div class="max-w-full overflow-x-auto">
        <table class="min-w-full">
          <thead>
            <tr>
              <th
                v-for="column in columns"
                :key="column.key"
                class="px-4 py-3 border border-gray-100 dark:border-white/[0.05] text-left"
                @click="toggleSort(column)"
              >
                <div class="flex items-center justify-between w-full cursor-pointer">
                  <p class="font-medium text-gray-700 text-theme-xs dark:text-gray-400">
                    {{ column.label }}
                  </p>
                  <span v-if="column.sortable !== false" class="flex flex-col gap-0.5">
                    <svg
                      class="fill-gray-300 dark:fill-gray-700"
                      width="8"
                      height="5"
                      viewBox="0 0 8 5"
                      fill="none"
                      :class="{
                        'fill-gray-800 dark:fill-white':
                          sortColumn === column.key && sortDirection === 'asc',
                      }"
                    >
                      <path
                        d="M4.40962 0.585167C4.21057 0.300808 3.78943 0.300807 3.59038 0.585166L1.05071 4.21327C0.81874 4.54466 1.05582 5 1.46033 5H6.53967C6.94418 5 7.18126 4.54466 6.94929 4.21327L4.40962 0.585167Z"
                        fill=""
                      ></path>
                    </svg>
                    <svg
                      class="fill-gray-300 dark:fill-gray-700"
                      width="8"
                      height="5"
                      viewBox="0 0 8 5"
                      fill="none"
                      :class="{
                        'fill-gray-800 dark:fill-white':
                          sortColumn === column.key && sortDirection === 'desc',
                      }"
                    >
                      <path
                        d="M4.40962 4.41483C4.21057 4.69919 3.78943 4.69919 3.59038 4.41483L1.05071 0.786732C0.81874 0.455343 1.05582 0 1.46033 0H6.53967C6.94418 0 7.18126 0.455342 6.94929 0.786731L4.40962 4.41483Z"
                        fill=""
                      ></path>
                    </svg>
                  </span>
                </div>
              </th>
              <th class="px-4 py-3 text-left border border-gray-100 dark:border-white/[0.05]">
                <p class="font-medium text-gray-700 text-theme-xs dark:text-gray-400">Action</p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, index) in paginatedData"
              :key="index"
              class="border-t border-gray-100 dark:border-white/[0.5]"
            >
              <td
                v-for="column in columns"
                :key="column.key"
                class="px-4 py-3 border border-gray-100 dark:border-white/[0.05]"
              >
                <p
                  v-if="!column.slot"
                  class="block text-theme-sm font-medium text-gray-800 dark:text-white/90"
                >
                  {{ row[column.key] }}
                </p>
                <slot v-else :name="column.slot" :row="row"></slot>
              </td>
              <td class="px-4 py-[17.5px] border border-gray-100 dark:border-white/[0.05]">
                <div class="flex items-center w-full gap-2">
                  <button
                    class="text-gray-500 hover:text-error-500 dark:text-gray-400 dark:hover:text-error-500"
                  >
                    <svg
                      class="fill-current"
                      width="21"
                      height="21"
                      viewBox="0 0 21 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M7.04142 4.29199C7.04142 3.04935 8.04878 2.04199 9.29142 2.04199H11.7081C12.9507 2.04199 13.9581 3.04935 13.9581 4.29199V4.54199H16.1252H17.166C17.5802 4.54199 17.916 4.87778 17.916 5.29199C17.916 5.70621 17.5802 6.04199 17.166 6.04199H16.8752V8.74687V13.7469V16.7087C16.8752 17.9513 15.8678 18.9587 14.6252 18.9587H6.37516C5.13252 18.9587 4.12516 17.9513 4.12516 16.7087V13.7469V8.74687V6.04199H3.8335C3.41928 6.04199 3.0835 5.70621 3.0835 5.29199C3.0835 4.87778 3.41928 4.54199 3.8335 4.54199H4.87516H7.04142V4.29199ZM15.3752 13.7469V8.74687V6.04199H13.9581H13.2081H7.79142H7.04142H5.62516V8.74687V13.7469V16.7087C5.62516 17.1229 5.96095 17.4587 6.37516 17.4587H14.6252C15.0394 17.4587 15.3752 17.1229 15.3752 16.7087V13.7469ZM8.54142 4.54199H12.4581V4.29199C12.4581 3.87778 12.1223 3.54199 11.7081 3.54199H9.29142C8.87721 3.54199 8.54142 3.87778 8.54142 4.29199V4.54199ZM8.8335 8.50033C9.24771 8.50033 9.5835 8.83611 9.5835 9.25033V14.2503C9.5835 14.6645 9.24771 15.0003 8.8335 15.0003C8.41928 15.0003 8.0835 14.6645 8.0835 14.2503V9.25033C8.0835 8.83611 8.41928 8.50033 8.8335 8.50033ZM12.9168 9.25033C12.9168 8.83611 12.581 8.50033 12.1668 8.50033C11.7526 8.50033 11.4168 8.83611 11.4168 9.25033V14.2503C11.4168 14.6645 11.7526 15.0003 12.1668 15.0003C12.581 15.0003 12.9168 14.6645 12.9168 14.2503V9.25033Z"
                        fill=""
                      ></path>
                    </svg>
                  </button>
                  <button
                    class="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90"
                  >
                    <svg
                      class="fill-current"
                      width="21"
                      height="21"
                      viewBox="0 0 21 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M17.0911 3.53206C16.2124 2.65338 14.7878 2.65338 13.9091 3.53206L5.6074 11.8337C5.29899 12.1421 5.08687 12.5335 4.99684 12.9603L4.26177 16.445C4.20943 16.6931 4.286 16.9508 4.46529 17.1301C4.64458 17.3094 4.90232 17.3859 5.15042 17.3336L8.63507 16.5985C9.06184 16.5085 9.45324 16.2964 9.76165 15.988L18.0633 7.68631C18.942 6.80763 18.942 5.38301 18.0633 4.50433L17.0911 3.53206ZM14.9697 4.59272C15.2626 4.29982 15.7375 4.29982 16.0304 4.59272L17.0027 5.56499C17.2956 5.85788 17.2956 6.33276 17.0027 6.62565L16.1043 7.52402L14.0714 5.49109L14.9697 4.59272ZM13.0107 6.55175L6.66806 12.8944C6.56526 12.9972 6.49455 13.1277 6.46454 13.2699L5.96704 15.6283L8.32547 15.1308C8.46772 15.1008 8.59819 15.0301 8.70099 14.9273L15.0436 8.58468L13.0107 6.55175Z"
                        fill=""
                      ></path>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div
        class="border-t-0 border rounded-b-xl border-gray-100 py-4 pl-[18px] pr-4 dark:border-white/[0.05]"
      >
        <div class="flex flex-col xl:flex-row xl:items-center xl:justify-between">
          <p
            class="pt-3 text-sm font-medium text-center text-gray-500 border-t border-gray-100 dark:border-gray-800 dark:text-gray-400 xl:border-t-0 xl:pt-0 xl:text-left"
          >
            Showing <span>{{ (currentPage - 1) * selectedPageSize + 1 }}</span> to
            <span>{{ Math.min(currentPage * selectedPageSize, filteredData.length) }}</span> of
            <span>{{ filteredData.length }}</span> entries
          </p>
          <div class="flex items-center justify-center gap-0.5 xl:justify-normal xl:pt-0">
            <button
              @click="goToPage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="mr-2.5 flex items-center h-10 justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
            >
              Previous
            </button>
            <button
              v-for="page in totalPages"
              :key="page"
              @click="goToPage(page)"
              class="px-3 py-2 text-gray-700 dark:text-gray-400 flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium hover:bg-blue-500/[0.08] hover:text-brand-500 dark:hover:text-brand-500"
              :class="{ 'bg-blue-500/[0.08] text-brand-500': page === currentPage }"
            >
              {{ page }}
            </button>
            <button
              @click="goToPage(currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="ml-2.5 flex items-center h-10 justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

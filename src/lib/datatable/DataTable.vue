<script setup>
import { ref, computed } from 'vue'
import ChevronDownIcon from '@/icons/ChevronDownIcon.vue'

const props = defineProps({
  data: {
    type: Array,
    required: true,
    default: () => [],
  },
  columns: {
    type: Array,
    required: true,
    validator: (cols) => cols.every((col) => 'key' in col && 'label' in col),
  },
  pageSize: {
    type: Number,
    default: 5,
    validator: (size) => size > 0,
  },
  showEntriesOptions: {
    type: Array,
    default: () => [5, 10, 25, 50, 100],
  },
  title: {
    type: String,
    default: 'Data Table',
  },
})

const emit = defineEmits(['edit', 'delete'])

// Reactive state
const searchQuery = ref('')
const sortColumn = ref('')
const sortDirection = ref('asc')
const currentPage = ref(1)
const selectedPageSize = ref(props.pageSize)
const isDropdownOpen = ref(false)

// Computed properties
const filteredData = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()

  let filtered = props.data.filter((row) => {
    return props.columns.some((column) => {
      if (column.searchable === false) return false
      const value = String(row[column.key]).toLowerCase()
      return value.includes(query)
    })
  })

  // Sorting
  if (sortColumn.value) {
    filtered.sort((a, b) => {
      const aValue = a[sortColumn.value]
      const bValue = b[sortColumn.value]
      const modifier = sortDirection.value === 'asc' ? 1 : -1

      if (aValue === bValue) return 0
      return aValue > bValue ? modifier : -modifier
    })
  }

  return filtered
})

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * selectedPageSize.value
  return filteredData.value.slice(start, start + selectedPageSize.value)
})

const totalPages = computed(() => Math.ceil(filteredData.value.length / selectedPageSize.value))

// Methods
const toggleSort = (column) => {
  if (column.sortable === false) return

  if (sortColumn.value === column.key) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortColumn.value = column.key
    sortDirection.value = 'asc'
  }
  currentPage.value = 1 // Reset to first page when sorting
}

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const updatePageSize = (size) => {
  selectedPageSize.value = size
  currentPage.value = 1
}

const handleEdit = (row) => {
  emit('edit', row)
}

const handleDelete = (row) => {
  emit('delete', row)
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
              @click="isDropdownOpen = !isDropdownOpen"
              @blur="isDropdownOpen = false"
              class="w-full py-2 pl-3 pr-8 text-sm text-gray-800 bg-transparent border border-gray-300 rounded-lg appearance-none dark:bg-dark-900 h-9 bg-none shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
            >
              <option v-for="option in showEntriesOptions" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
            <!-- Decorative Icon -->
            <span
              class="pointer-events-none absolute z-30 text-gray-500 -translate-y-1/2 right-2 top-1/2 dark:text-gray-400"
            >
            <ChevronDownIcon :class="{ 'rotate-180': isDropdownOpen }" />
            </span>
          </div>
          <span class="text-gray-500 dark:text-gray-400">entries</span>
        </div>

        <div class="relative flex items-center gap-3">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search..."
            class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pl-11 pr-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[300px]"
          />
          <button class="absolute text-gray-500 -translate-y-1/2 left-4 top-1/2 dark:text-gray-400">
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
              ></path>
            </svg>
          </button>

          <!-- Custom slot for user-defined buttons or content -->
          <slot name="custom-actions" />
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
                :class="{ 'cursor-pointer': column.sortable !== false }"
              >
                <div class="flex items-center justify-between w-full">
                  <p class="font-medium text-gray-700 text-theme-xs dark:text-gray-400">
                    {{ column.label }}
                  </p>
                  <span v-if="column.sortable !== false" class="flex flex-col gap-0.5">
                    <svg
                      class="fill-gray-300 dark:fill-gray-700"
                      width="8"
                      height="5"
                      viewBox="0 0 8 5"
                      :class="{
                        'fill-gray-800 dark:fill-white':
                          sortColumn === column.key && sortDirection === 'asc',
                      }"
                    >
                      <path
                        d="M4.40962 0.585167C4.21057 0.300808 3.78943 0.300807 3.59038 0.585166L1.05071 4.21327C0.81874 4.54466 1.05582 5 1.46033 5H6.53967C6.94418 5 7.18126 4.54466 6.94929 4.21327L4.40962 0.585167Z"
                      ></path>
                    </svg>
                    <svg
                      class="fill-gray-300 dark:fill-gray-700"
                      width="8"
                      height="5"
                      viewBox="0 0 8 5"
                      :class="{
                        'fill-gray-800 dark:fill-white':
                          sortColumn === column.key && sortDirection === 'desc',
                      }"
                    >
                      <path
                        d="M4.40962 4.41483C4.21057 4.69919 3.78943 4.69919 3.59038 4.41483L1.05071 0.786732C0.81874 0.455343 1.05582 0 1.46033 0H6.53967C6.94418 0 7.18126 0.455342 6.94929 0.786731L4.40962 4.41483Z"
                      ></path>
                    </svg>
                  </span>
                </div>
              </th>
              <th
                v-if="$slots.actions"
                class="px-4 py-3 text-left border border-gray-100 dark:border-white/[0.05]"
              >
                <p class="font-medium text-gray-700 text-theme-xs dark:text-gray-400">Actions</p>
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
                <slot v-if="column.slot" :name="column.slot" :row="row"></slot>
                <p v-else class="block text-theme-sm font-medium text-gray-800 dark:text-white/90">
                  {{ row[column.key] }}
                </p>
              </td>
              <td
                v-if="$slots.actions"
                class="px-4 py-[17.5px] border border-gray-100 dark:border-white/[0.05]"
              >
                <slot name="actions" :row="row"></slot>
              </td>
            </tr>
            <tr v-if="paginatedData.length === 0">
              <td
                :colspan="columns.length + ($slots.actions ? 1 : 0)"
                class="px-4 py-8 text-center text-gray-500"
              >
                No records found
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

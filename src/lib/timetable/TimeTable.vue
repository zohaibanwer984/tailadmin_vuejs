<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  // Core data
  classes: {
    type: Array,
    required: true,
    default: () => [],
    validator: (classes) => classes.every((cls) => cls.id !== undefined),
  },
  timetableData: {
    type: Array,
    default: () => [],
    // Format: [{ day: 'MON', timeSlot: '9-11', classId: 'class1', subject: 'Math', teacher: 'John' }]
  },

  // Days configuration
  showSaturday: {
    type: Boolean,
    default: true,
  },
  customDays: {
    type: Array,
    default: null,
    // If provided, overrides default days: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  },

  // Time slots configuration
  timeSlots: {
    type: Array,
    default: () => [
      { id: '9-11', label: '9 to 11', startTime: '09:00', endTime: '11:00' },
      { id: '11-2', label: '11 to 2', startTime: '11:00', endTime: '14:00' },
    ],
  },

  // Behavior configuration
  editable: {
    type: Boolean,
    default: true,
  },
  allowOverlap: {
    type: Boolean,
    default: true,
  },
  showTimeLabels: {
    type: Boolean,
    default: true,
  },

  // UI configuration
  cellHeight: {
    type: String,
    default: '80px',
  },
  theme: {
    type: String,
    default: 'default', // 'default', 'compact', 'minimal'
    validator: (value) => ['default', 'compact', 'minimal'].includes(value),
  },
})

const emit = defineEmits([
  'update:timetableData',
  'cellClick',
  'classAssigned',
  'classRemoved',
  'classUpdated',
])

// Computed days based on configuration
const activeDays = computed(() => {
  if (props.customDays) return props.customDays

  const defaultDays = ['MON', 'TUE', 'WED', 'THU', 'FRI']
  return props.showSaturday ? [...defaultDays, 'SAT'] : defaultDays
})

// Convert array format to object format for easier lookup
const timetableMap = computed(() => {
  const map = {}
  props.timetableData.forEach((entry) => {
    if (!map[entry.day]) map[entry.day] = {}
    if (!map[entry.day][entry.timeSlot]) map[entry.day][entry.timeSlot] = {}
    map[entry.day][entry.timeSlot][entry.classId] = entry
  })
  return map
})

// Modal state
const showModal = ref(false)
const selectedCell = ref({ day: '', timeSlot: '', classId: '', existing: null })
const searchQuery = ref('')

// API Functions that parent can call
const api = {
  // Add or update a timetable entry
  addEntry: (entry) => {
    const newData = [
      ...props.timetableData.filter(
        (item) =>
          !(
            item.day === entry.day &&
            item.timeSlot === entry.timeSlot &&
            item.classId === entry.classId
          ),
      ),
      entry,
    ]
    emit('update:timetableData', newData)
    emit('classAssigned', entry)
  },

  // Remove a timetable entry
  removeEntry: (day, timeSlot, classId) => {
    const newData = props.timetableData.filter(
      (item) => !(item.day === day && item.timeSlot === timeSlot && item.classId === classId),
    )
    emit('update:timetableData', newData)
    emit('classRemoved', { day, timeSlot, classId })
  },

  // Get entries for a specific slot
  getSlotEntries: (day, timeSlot) => {
    return props.timetableData.filter((item) => item.day === day && item.timeSlot === timeSlot)
  },

  // Get entries for a specific class
  getClassEntries: (classId) => {
    return props.timetableData.filter((item) => item.classId === classId)
  },

  // Clear all entries
  clearAll: () => {
    emit('update:timetableData', [])
  },
}

// Expose API to parent component
defineExpose(api)

// Get class assignment for specific cell
const getCellAssignment = (day, timeSlot, classId) => {
  return timetableMap.value[day]?.[timeSlot]?.[classId] || null
}

// Handle cell click
const handleCellClick = async (day, timeSlot, classId) => {
  const existing = getCellAssignment(day, timeSlot, classId)

  // Emit cell click event with context
  const clickEvent = {
    day,
    timeSlot: timeSlot.id || timeSlot,
    classId,
    existing,
    isEmpty: !existing,
    api,
  }

  emit('cellClick', clickEvent)

  // If editable and no custom handler, show default modal
  if (props.editable) {
    selectedCell.value = { day, timeSlot: timeSlot.id || timeSlot, classId, existing }
    searchQuery.value = ''
    showModal.value = true
  }
}

// Filtered classes for modal
const filteredClasses = computed(() => {
  let filtered = props.classes

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      (cls) =>
        cls.subject?.toLowerCase().includes(query) ||
        cls.teacher?.toLowerCase().includes(query) ||
        cls.name?.toLowerCase().includes(query) ||
        cls.id?.toString().toLowerCase().includes(query),
    )
  }

  return filtered.sort((a, b) => {
    return (a.subject || a.name || a.id || '')
      .toString()
      .localeCompare((b.subject || b.name || b.id || '').toString())
  })
})

// Assign class to cell
const assignClass = (cls) => {
  const entry = {
    day: selectedCell.value.day,
    timeSlot: selectedCell.value.timeSlot,
    classId: selectedCell.value.classId,
    subject: cls.subject || cls.name || `Class ${cls.id}`,
    teacher: cls.teacher || '',
    color: cls.color || '#3B82F6',
    ...cls, // Include any additional properties
  }

  api.addEntry(entry)
  closeModal()
}

// Remove assignment
const removeAssignment = () => {
  if (selectedCell.value.existing) {
    api.removeEntry(selectedCell.value.day, selectedCell.value.timeSlot, selectedCell.value.classId)
  }
  closeModal()
}

// Close modal
const closeModal = () => {
  showModal.value = false
  selectedCell.value = { day: '', timeSlot: '', classId: '', existing: null }
}

// Theme classes
const themeClasses = computed(() => {
  const base = {
    table: 'w-full border-collapse table-fixed',
    cell: 'border-r border-b border-gray-300 dark:border-gray-600 transition-colors',
    header: 'bg-gray-100 dark:bg-gray-700 border-r border-b border-gray-300 dark:border-gray-600',
    assignment:
      'relative h-full p-2 bg-blue-50 rounded dark:bg-blue-900/30 overflow-hidden border-l-2 border-blue-400 dark:border-blue-500',
  }

  switch (props.theme) {
    case 'compact':
      return {
        ...base,
        cell: base.cell + ' p-1',
        assignment: base.assignment + ' text-xs',
      }
    case 'minimal':
      return {
        ...base,
        table: base.table + ' border-0',
        cell: base.cell + ' border-gray-200 dark:border-gray-700',
        header: 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700',
      }
    default:
      return base
  }
})
</script>

<template>
  <div class="flex-1 overflow-hidden">
    <div
      class="overflow-auto max-w-full max-h-full rounded-2xl border border-gray-300 dark:border-gray-600"
    >
      <table :class="themeClasses.table">
        <!-- Header Row with Days -->
        <thead>
          <tr>
            <th :class="`w-32 p-2 ${themeClasses.header}`"></th>
            <th
              v-for="day in activeDays"
              :key="day"
              :colspan="timeSlots.length"
              :class="`p-2 ${themeClasses.header} text-center font-bold last:border-r-0`"
            >
              {{ day }}
            </th>
          </tr>

          <!-- Time Slots Sub-Header -->
          <tr v-if="showTimeLabels">
            <th :class="`w-32 p-2 bg-gray-50 dark:bg-gray-800 ${themeClasses.cell}`"></th>
            <template v-for="day in activeDays" :key="day">
              <th
                v-for="slot in timeSlots"
                :key="slot.id"
                :class="`w-24 p-2 bg-gray-50 dark:bg-gray-800 ${themeClasses.cell} font-medium text-gray-700 text-xs dark:text-gray-400 last:border-r-0`"
              >
                {{ slot.label }}
              </th>
            </template>
          </tr>
        </thead>

        <!-- Classes Rows -->
        <tbody>
          <tr v-for="cls in classes" :key="cls.id" class="hover:bg-gray-50 dark:hover:bg-gray-800">
            <!-- Class Name Column -->
            <td :class="`w-32 p-3 ${themeClasses.cell} font-medium`">
              <div class="truncate" :title="cls.name || cls.subject || `Class ${cls.id}`">
                {{ cls.name || cls.subject || `Class ${cls.id}` }}
              </div>
              <div v-if="cls.teacher" class="text-xs text-gray-500 dark:text-gray-400 truncate">
                {{ cls.teacher }}
              </div>
            </td>

            <!-- Time Slot Cells -->
            <template v-for="day in activeDays" :key="day">
              <td
                v-for="slot in timeSlots"
                :key="slot.id"
                :style="{ height: cellHeight }"
                :class="[
                  'w-24 p-2 transition-colors last:border-r-0',
                  themeClasses.cell,
                  {
                    'hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer': editable,
                    'bg-gray-50 dark:bg-gray-700/30': !editable,
                  },
                ]"
                @click="handleCellClick(day, slot, cls.id)"
              >
                <div
                  v-if="getCellAssignment(day, slot.id, cls.id)"
                  :class="themeClasses.assignment"
                  :style="{
                    borderLeftColor: getCellAssignment(day, slot.id, cls.id).color || '#3B82F6',
                    backgroundColor: getCellAssignment(day, slot.id, cls.id).color
                      ? getCellAssignment(day, slot.id, cls.id).color + '20'
                      : undefined,
                  }"
                >
                  <div class="font-medium text-xs dark:text-blue-100 truncate">
                    {{ getCellAssignment(day, slot.id, cls.id).subject }}
                  </div>
                  <div
                    v-if="getCellAssignment(day, slot.id, cls.id).teacher"
                    class="text-xs text-gray-600 dark:text-blue-200 truncate"
                  >
                    {{ getCellAssignment(day, slot.id, cls.id).teacher }}
                  </div>
                </div>
                <div
                  v-else-if="editable"
                  class="h-full flex items-center justify-center text-xs text-gray-400 hover:text-blue-500 transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Default Modal (only shown if editable and no custom handler) -->
  <div
    v-if="showModal"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    @click="closeModal"
  >
    <div
      class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden"
      @click.stop
    >
      <!-- Modal Header -->
      <div class="p-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold dark:text-white">
            {{ selectedCell.existing ? 'Edit Assignment' : 'Assign Class' }}
          </h3>
          <button
            @click="closeModal"
            class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {{ selectedCell.day }} •
          {{ timeSlots.find((s) => s.id === selectedCell.timeSlot)?.label }}
        </p>
      </div>

      <!-- Search -->
      <div class="p-4 border-b border-gray-200 dark:border-gray-700">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search classes..."
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <!-- Current Assignment -->
      <div
        v-if="selectedCell.existing"
        class="p-4 border-b border-gray-200 dark:border-gray-700 bg-blue-50 dark:bg-blue-900/20"
      >
        <div class="flex items-center justify-between">
          <div>
            <div class="font-medium text-sm dark:text-white">Currently Assigned:</div>
            <div class="text-sm text-gray-600 dark:text-gray-300">
              {{ selectedCell.existing.subject }}
              <span v-if="selectedCell.existing.teacher"
                >• {{ selectedCell.existing.teacher }}</span
              >
            </div>
          </div>
          <button
            @click="removeAssignment"
            class="px-3 py-1 text-sm text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded"
          >
            Remove
          </button>
        </div>
      </div>

      <!-- Classes List -->
      <div class="max-h-80 overflow-y-auto">
        <div
          v-if="filteredClasses.length === 0"
          class="p-8 text-center text-gray-500 dark:text-gray-400"
        >
          No classes found
        </div>
        <div v-else class="p-2">
          <div
            v-for="cls in filteredClasses"
            :key="cls.id"
            class="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer"
            @click="assignClass(cls)"
          >
            <div class="font-medium dark:text-white">
              {{ cls.subject || cls.name || `Class ${cls.id}` }}
            </div>
            <div v-if="cls.teacher" class="text-sm text-gray-500 dark:text-gray-400">
              {{ cls.teacher }}
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Footer -->
      <div class="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
        <div class="flex justify-end">
          <button
            @click="closeModal"
            class="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

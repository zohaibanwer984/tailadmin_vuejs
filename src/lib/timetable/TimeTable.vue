<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  // Core data
  classes: {
    type: Array,
    required: true,
    default: () => [],
  },
  timetable: {
    type: Array,
    default: () => [],
  },

  // Display configuration
  days: {
    type: Array,
    default: () => ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
  },
  timeSlots: {
    type: Array,
    default: () => [
      { id: '9-11', label: '9-11' },
      { id: '11-2', label: '11-2' },
    ],
  },

  // Behavior
  editable: {
    type: Boolean,
    default: false,
  },
  showTimeLabels: {
    type: Boolean,
    default: true,
  },
  cellHeight: {
    type: String,
    default: '80px',
  },
})

const emit = defineEmits(['cell-click', 'update:timetable'])

// Convert timetable array to lookup map
const timetableMap = computed(() => {
  const map = {}
  props.timetable.forEach((entry) => {
    if (!map[entry.day]) map[entry.day] = {}
    map[entry.day][entry.timeSlot] = map[entry.day][entry.timeSlot] || {}
    map[entry.day][entry.timeSlot][entry.classId] = entry
  })
  return map
})

// Get assignment for a specific cell
const getAssignment = (day, timeSlot, classId) => {
  return timetableMap.value[day]?.[timeSlot]?.[classId] || null
}

// Handle cell clicks
const handleCellClick = (day, timeSlot, classId) => {
  const assignment = getAssignment(day, timeSlot, classId)
  emit('cell-click', {
    day,
    timeSlot,
    classId,
    assignment,
    isEmpty: !assignment,
  })
}

// Exposed API methods
const api = {
  addEntry: (entry) => {
    const newTimetable = [
      ...props.timetable.filter(
        (item) =>
          !(
            item.day === entry.day &&
            item.timeSlot === entry.timeSlot &&
            item.classId === entry.classId
          ),
      ),
      entry,
    ]
    emit('update:timetable', newTimetable)
  },

  removeEntry: (day, timeSlot, classId) => {
    const newTimetable = props.timetable.filter(
      (item) => !(item.day === day && item.timeSlot === timeSlot && item.classId === classId),
    )
    emit('update:timetable', newTimetable)
  },

  clearAll: () => {
    emit('update:timetable', [])
  },
}

defineExpose(api)
</script>

<template>
  <div class="w-full overflow-hidden">
    <div class="overflow-auto max-w-full border border-gray-200 rounded-lg dark:border-gray-700">
      <table class="w-full border-collapse table-fixed">
        <!-- Header Row with Days -->
        <thead>
          <tr>
            <th
              class="w-32 p-2 bg-gray-50 border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
            ></th>
            <th
              v-for="day in days"
              :key="day"
              :colspan="timeSlots.length"
              class="p-2 bg-gray-50 border border-gray-200 text-center font-semibold text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-white/90"
            >
              {{ day }}
            </th>
          </tr>

          <!-- Time Slots Sub-Header -->
          <tr v-if="showTimeLabels">
            <th
              class="w-32 p-2 bg-gray-50 border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
            ></th>
            <template v-for="day in days" :key="day">
              <th
                v-for="slot in timeSlots"
                :key="slot.id"
                class="p-2 bg-gray-50 border border-gray-200 text-xs text-gray-600 font-medium dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
              >
                {{ slot.label }}
              </th>
            </template>
          </tr>
        </thead>

        <!-- Classes Rows -->
        <tbody>
          <tr
            v-for="(className, index) in classes"
            :key="index"
            :class="[editable ? 'hover:bg-gray-50 dark:hover:bg-white/[0.03]' : '']"
          >
            <!-- Class Name Column -->
            <td
              class="w-32 p-3 border border-gray-200 font-medium text-gray-800 dark:border-gray-700 dark:text-white/90"
            >
              <div class="truncate">
                {{ className }}
              </div>
            </td>

            <!-- Time Slot Cells -->
            <template v-for="day in days" :key="day">
              <td
                v-for="slot in timeSlots"
                :key="`${day}-${slot.id}`"
                :style="{ height: cellHeight }"
                class="w-24 p-1 border border-gray-200 transition-colors dark:border-gray-700"
                :class="{
                  'hover:bg-blue-50 cursor-pointer dark:hover:bg-blue-500/10': editable,
                }"
                @click="handleCellClick(day, slot.id, index)"
              >
                <div
                  v-if="getAssignment(day, slot.id, index)"
                  class="h-full p-1 rounded border-l-2 hover:cursor-pointer"
                  :style="{
                    backgroundColor: getAssignment(day, slot.id, index).color
                      ? `${getAssignment(day, slot.id, index).color}20`
                      : 'rgba(59, 130, 246, 0.1)',
                    borderLeftColor: getAssignment(day, slot.id, index).color || '#3B82F6',
                  }"
                >
                  <div class="text-xs font-medium truncate text-gray-800 dark:text-white/90">
                    {{ getAssignment(day, slot.id, index).subject || className }}
                  </div>
                  <div
                    v-if="getAssignment(day, slot.id, index).teacher"
                    class="text-xs text-gray-600 truncate dark:text-gray-400"
                  >
                    {{ getAssignment(day, slot.id, index).teacher }}
                  </div>
                </div>
                <div
                  v-else-if="editable"
                  class="h-full flex items-center justify-center text-gray-400 hover:text-blue-500 dark:text-gray-500 dark:hover:text-blue-400"
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
</template>

<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="pageTitle" />

    <div class="space-y-6">
      <ComponentCard title="Interactive Timetable Demo">
        <div class="flex justify-between items-center mb-4">
          <p class="text-gray-600">
            Click cells to assign or remove classes. The parent component handles all logic.
          </p>
          <button
            @click="toggleEditMode"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {{ isEditable ? 'View Mode' : 'Edit Mode' }}
          </button>
        </div>

        <Timetable
          ref="timetable"
          :classes="classNames"
          :timetable="timetableData"
          :editable="isEditable"
          :days="days"
          :time-slots="timeSlots"
          @cell-click="handleCellClick"
          @update:timetable="updateTimetable"
        />

        <div class="mt-6 flex gap-4">
          <button
            @click="addSampleEntry"
            class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Add Sample Entry
          </button>
          <button
            @click="clearAllEntries"
            class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Clear All
          </button>
          <button
            @click="showCurrentData"
            class="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
          >
            Show Current Data
          </button>
        </div>

        <!-- Custom Modal (implemented in parent) -->
        <div v-if="showCustomModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div class="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h3 class="text-lg font-semibold mb-4">
              {{ currentAction === 'add' ? 'Assign Class' : 'Edit Assignment' }}
            </h3>
            
            <div v-if="currentAction === 'edit'" class="mb-4 p-3 bg-blue-50 rounded">
              <h4 class="font-medium">Current Assignment:</h4>
              <p>{{ clickedCell.assignment.subject }} ({{ clickedCell.assignment.teacher }})</p>
            </div>

            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium mb-1">Subject</label>
                <input v-model="newEntry.subject" class="w-full p-2 border rounded">
              </div>
              
              <div>
                <label class="block text-sm font-medium mb-1">Teacher</label>
                <input v-model="newEntry.teacher" class="w-full p-2 border rounded">
              </div>
              
              <div>
                <label class="block text-sm font-medium mb-1">Color</label>
                <input v-model="newEntry.color" type="color" class="w-full h-10">
              </div>
            </div>

            <div class="flex justify-end gap-2 mt-6">
              <button 
                @click="showCustomModal = false"
                class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancel
              </button>
              <button 
                v-if="currentAction === 'edit'"
                @click="removeAssignment"
                class="px-4 py-2 text-red-600 hover:bg-red-100 rounded"
              >
                Remove
              </button>
              <button 
                @click="confirmAssignment"
                class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {{ currentAction === 'add' ? 'Assign' : 'Update' }}
              </button>
            </div>
          </div>
        </div>
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import Timetable from '@/lib/timetable/TimeTable.vue'

const pageTitle = ref('Timetable Showcase')
const isEditable = ref(true)
const timetable = ref(null)

// Days configuration
const days = ref(['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'])

// Time slots configuration
const timeSlots = ref([
  { id: '8-9', label: '8:00-9:00' },
  { id: '9-10', label: '9:00-10:00' },
])

// Simplified class names (string array)
const classNames = ref([
  'CLASS 1',
  'CLASS 2',
  'CLASS 3',
  'CLASS 4',
  'CLASS 5'
])

// Class details (for modal and assignments)
const classDetails = ref([
  { id: 0, name: 'Mathematics', teacher: 'Mr. Smith' },
  { id: 1, name: 'Science', teacher: 'Ms. Johnson' },
  { id: 2, name: 'History', teacher: 'Mr. Brown' },
  { id: 3, name: 'English', teacher: 'Ms. Davis' },
  { id: 4, name: 'Art', teacher: 'Mr. Wilson' },
])

// Timetable data (now uses array indices as classId)
const timetableData = ref([
  { 
    day: 'MON', 
    timeSlot: '8-9', 
    classId: 0, // Index of Mathematics
    subject: 'Mathematics', 
    teacher: 'Mr. Smith', 
    color: '#FF5722' 
  },
  { 
    day: 'WED', 
    timeSlot: '9-10', 
    classId: 2, // Index of History
    subject: 'History', 
    teacher: 'Mr. Brown', 
    color: '#3F51B5' 
  },
])

// Custom modal state
const showCustomModal = ref(false)
const currentAction = ref('add') // 'add' or 'edit'
const clickedCell = ref(null)
const newEntry = ref({
  subject: '',
  teacher: '',
  color: '#3B82F6'
})

// Update timetable data
const updateTimetable = (newData) => {
  timetableData.value = newData
}

// Handle cell click - now shows our custom modal
const handleCellClick = (cell) => {
  clickedCell.value = cell
  currentAction.value = cell.isEmpty ? 'add' : 'edit'
  
  if (cell.isEmpty) {
    const classDetail = classDetails.value[cell.classId]
    newEntry.value = {
      subject: classDetail?.name || classNames.value[cell.classId] || '',
      teacher: classDetail?.teacher || '',
      color: '#3B82F6'
    }
  } else {
    newEntry.value = {
      subject: cell.assignment.subject,
      teacher: cell.assignment.teacher,
      color: cell.assignment.color || '#3B82F6'
    }
  }
  
  showCustomModal.value = true
}

// Confirm assignment (add or update)
const confirmAssignment = () => {
  const entry = {
    day: clickedCell.value.day,
    timeSlot: clickedCell.value.timeSlot,
    classId: clickedCell.value.classId,
    subject: newEntry.value.subject,
    teacher: newEntry.value.teacher,
    color: newEntry.value.color
  }
  
  timetable.value.addEntry(entry)
  showCustomModal.value = false
}

// Remove assignment
const removeAssignment = () => {
  timetable.value.removeEntry(
    clickedCell.value.day,
    clickedCell.value.timeSlot,
    clickedCell.value.classId
  )
  showCustomModal.value = false
}

// Toggle edit mode
const toggleEditMode = () => {
  isEditable.value = !isEditable.value
}

// Add sample entry
const addSampleEntry = () => {
  timetable.value.addEntry({
    day: 'TUE',
    timeSlot: '9-10',
    classId: 1, // Index of Science
    subject: 'Science',
    teacher: 'Ms. Johnson',
    color: '#009688'
  })
}

// Clear all entries
const clearAllEntries = () => {
  timetable.value.clearAll()
}

// Show current data in console
const showCurrentData = () => {
  console.log('Current timetable data:', timetableData.value)
}
</script>
<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="pageTitle" />

    <div class="space-y-6">
      <ComponentCard title="Interactive Timetable">
        <div class="flex justify-between items-center mb-4">
          <p class="text-gray-600 dark:text-gray-400">
            {{ isEditable ? 'Click cells to assign or remove classes.' : 'Click cells to view assignments.' }}
          </p>
          <Button 
            @click="toggleEditMode"
            :variant="isEditable ? 'outline' : 'primary'"
          >
            {{ isEditable ? 'View Mode' : 'Edit Mode' }}
          </Button>
        </div>

        <Timetable
          ref="timetableRef"
          :classes="classNames"
          :timetable="timetableData"
          :editable="isEditable"
          :days="days"
          :time-slots="timeSlots"
          @cell-click="handleCellClick"
          @update:timetable="updateTimetable"
        />

        <div class="mt-6 flex gap-4">
          <Button 
            @click="clearAllEntries" 
            variant="outline"
            :disabled="!isEditable"
          >
            Clear All
          </Button>
          <Button @click="showCurrentData" variant="outline">
            Show Current Data
          </Button>
        </div>

        <!-- Timetable Assignment Modal -->
        <TimetableAssignmentModal
          :isOpen="showModal"
          :modalMode="currentAction"
          :entry="currentEntry"
          @close="handleModalClose"
          @success="handleModalSuccess"
          @remove="handleRemoveAssignment"
        />
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref } from 'vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import Timetable from '@/lib/timetable/TimeTable.vue'
import Button from '@/components/ui/Button.vue'
import TimetableAssignmentModal from './TimetableAssignmentModal.vue'

// Page configuration
const pageTitle = ref('Timetable Management')
const isEditable = ref(true)
const timetableRef = ref(null)

// Timetable configuration
const days = ref(['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'])
const timeSlots = ref([
  { id: '8-9', label: '8:00-9:00' },
  { id: '9-10', label: '9:00-10:00' },
])

const classNames = ref(['CLASS 1', 'CLASS 2', 'CLASS 3', 'CLASS 4', 'CLASS 5'])

// Sample timetable data
const timetableData = ref([
  {
    day: 'MON',
    timeSlot: '8-9',
    classId: 0,
    subject: 'Mathematics',
    teacher: 'Mr. Smith',
    color: '#FF5722',
  },
  {
    day: 'WED',
    timeSlot: '9-10',
    classId: 2,
    subject: 'History',
    teacher: 'Mr. Brown',
    color: '#3F51B5',
  },
])

// Modal state
const showModal = ref(false)
const currentAction = ref('add')
const clickedCell = ref(null)
const currentEntry = ref({
  subject: '',
  teacher: '',
  color: '#3B82F6',
})

// Methods
const updateTimetable = (newData) => {
  timetableData.value = newData
}

const handleCellClick = (cell) => {
  clickedCell.value = cell
  
  if (isEditable.value) {
    // Edit mode: allow add/edit functionality
    currentAction.value = cell.isEmpty ? 'add' : 'edit'
  } else {
    // View mode: only allow viewing, and only if cell has content
    if (cell.isEmpty) return // Don't open modal for empty cells in view mode
    currentAction.value = 'view'
  }

  if (cell.isEmpty) {
    currentEntry.value = {
      subject: '',
      teacher: '',
      color: '#3B82F6',
    }
  } else {
    currentEntry.value = {
      subject: cell.assignment.subject,
      teacher: cell.assignment.teacher,
      color: cell.assignment.color || '#3B82F6',
    }
  }

  showModal.value = true
}

const handleModalClose = () => {
  showModal.value = false
  clickedCell.value = null
}

const handleModalSuccess = ({ action, entry }) => {
  const timetableEntry = {
    day: clickedCell.value.day,
    timeSlot: clickedCell.value.timeSlot,
    classId: clickedCell.value.classId,
    subject: entry.subject,
    teacher: entry.teacher,
    color: entry.color,
  }

  timetableRef.value.addEntry(timetableEntry)
  showModal.value = false
}

const handleRemoveAssignment = () => {
  timetableRef.value.removeEntry(
    clickedCell.value.day,
    clickedCell.value.timeSlot,
    clickedCell.value.classId,
  )
  showModal.value = false
}

const toggleEditMode = () => {
  isEditable.value = !isEditable.value
}

const clearAllEntries = () => {
  if (isEditable.value) {
    timetableRef.value.clearAll()
  }
}

const showCurrentData = () => {
  console.log('Current timetable data:', timetableData.value)
}
</script>
<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="pageTitle" />

    <div class="space-y-6">
      <ComponentCard title="Interactive Timetable Demo">
        <div class="flex justify-between items-center mb-4">
          <p class="text-gray-600">Click cells to assign or remove classes. You can also dynamically modify the timetable below.</p>
          <button
            @click="toggleEditMode"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {{ isEditable ? 'View Mode' : 'Edit Mode' }}
          </button>
        </div>

        <Timetable
          ref="timetable"
          :classes="classes"
          :timetable-data="timetableData"
          :editable="isEditable"
          :show-saturday="true"
          :time-slots="timeSlots"
          @cell-click="handleCellClick"
          @class-assigned="onClassAssigned"
          @class-removed="onClassRemoved"
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
        </div>
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

const pageTitle = ref('Timetable Showcase')
const isEditable = ref(true)
const timetable = ref(null)

// Classes available for assignment
const classes = ref([
  { id: 'class1', name: 'Mathematics', teacher: 'Mr. Smith', color: '#FF5722' },
  { id: 'class2', name: 'Science', teacher: 'Ms. Johnson', color: '#009688' },
  { id: 'class3', name: 'History', teacher: 'Mr. Brown', color: '#3F51B5' },
  { id: 'class4', name: 'English', teacher: 'Ms. Davis', color: '#9C27B0' },
  { id: 'class5', name: 'Art', teacher: 'Mr. Wilson', color: '#FF9800' },
])

// Time slots configuration
const timeSlots = ref([
  { id: '9-11', label: '09:00 - 11:00', startTime: '09:00', endTime: '11:00' },
  { id: '11-03', label: '11:00 - 03:00', startTime: '11:00', endTime: '03:00' },
])

// Initial timetable data (must be an array with the correct format)
const timetableData = ref([
  { 
    day: 'MON', 
    timeSlot: '9-11', 
    classId: 'class1', 
    subject: 'Mathematics', 
    teacher: 'Mr. Smith', 
    color: '#FF5722' 
  },
  { 
    day: 'WED', 
    timeSlot: '11-03', 
    classId: 'class3', 
    subject: 'History', 
    teacher: 'Mr. Brown', 
    color: '#3F51B5' 
  },
])

const toggleEditMode = () => {
  isEditable.value = !isEditable.value
}

// Cell click handler
const handleCellClick = ({ day, timeSlot, classId, existing, isEmpty, api }) => {
  console.log(`Cell clicked:`, { day, timeSlot, classId, existing, isEmpty })
  // You can use the provided api methods here if you want to handle clicks differently
}

// When class is added via UI
const onClassAssigned = (entry) => {
  console.log('Class Assigned:', entry)
}

// When class is removed via UI
const onClassRemoved = (entry) => {
  console.log('Class Removed:', entry)
}

// Add a sample entry programmatically
const addSampleEntry = () => {
  if (!timetable.value) return
  
  timetable.value.addEntry({
    day: 'TUE',
    timeSlot: '9-11',
    classId: 'class2',
    subject: 'Science',
    teacher: 'Ms. Johnson',
    color: '#009688',
  })
}

// Clear all timetable entries
const clearAllEntries = () => {
  if (!timetable.value) return
  timetable.value.clearAll()
}
</script>
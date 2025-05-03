<template>
  <DataTable
    :data="employees"
    :columns="columns"
    :pageSize="5"
    title="Employee List"
    @edit="handleEdit"
    @delete="handleDelete"
  >
   <!-- Custom components after searchbar -->
  <template #custom-actions>
    <button
      class="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
      @click="addNewRecord"
    >
      Add New
    </button>
  </template>
    <!-- Custom slot for salary formatting -->
    <template #salary="{ row }">
      <span class="font-mono text-green-600 dark:text-green-400">{{ row.salary }}</span>
    </template>

    <!-- Custom slot for date formatting -->
    <template #date="{ row }">
      {{ formatDate(row.startDate) }}
    </template>

    <!-- Custom slot for status badge -->
    <template #status="{ row }">
      <span
        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
        :class="{
          'bg-green-100 text-green-800': row.status === 'Active',
          'bg-red-100 text-red-800': row.status === 'Inactive',
        }"
      >
        {{ row.status }}
      </span>
    </template>

    <!-- Custom actions slot -->
    <template #actions="{ row }">
      <div class="flex items-center gap-2">
        <button
          @click.stop="handleEdit(row)"
          class="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90"
          title="Edit"
        >
          <PencilIcon />
        </button>
        <button
          @click.stop="handleDelete(row)"
          class="text-gray-500 hover:text-error-500 dark:text-gray-400 dark:hover:text-error-500"
          title="Delete"
        >
          <TrashIcon />
        </button>
      </div>
    </template>
  </DataTable>
</template>

<script setup>
import { ref } from 'vue'
import DataTable from '@/lib/datatable/DataTable.vue'
import TrashIcon from '@/icons/TrashIcon.vue'
import PencilIcon from '@/icons/PencilIcon.vue'
// Sample data
const employees = ref([
  {
    id: 1,
    name: 'John Doe',
    position: 'Frontend Developer',
    department: 'Engineering',
    salary: '$85,000',
    startDate: '2022-05-15',
    status: 'Active',
    email: 'john.doe@example.com',
  },
  {
    id: 2,
    name: 'Jane Smith',
    position: 'UX Designer',
    department: 'Design',
    salary: '$75,000',
    startDate: '2021-11-03',
    status: 'Active',
    email: 'jane.smith@example.com',
  },
  {
    id: 3,
    name: 'Robert Johnson',
    position: 'Backend Developer',
    department: 'Engineering',
    salary: '$92,000',
    startDate: '2020-08-22',
    status: 'Active',
    email: 'robert.j@example.com',
  },
  {
    id: 4,
    name: 'Emily Davis',
    position: 'Product Manager',
    department: 'Product',
    salary: '$110,000',
    startDate: '2023-01-10',
    status: 'Active',
    email: 'emily.d@example.com',
  },
  {
    id: 5,
    name: 'Michael Brown',
    position: 'DevOps Engineer',
    department: 'Engineering',
    salary: '$95,000',
    startDate: '2021-03-18',
    status: 'Active',
    email: 'michael.b@example.com',
  },
  {
    id: 6,
    name: 'Sarah Wilson',
    position: 'QA Engineer',
    department: 'Engineering',
    salary: '$78,000',
    startDate: '2022-09-05',
    status: 'Active',
    email: 'sarah.w@example.com',
  },
  {
    id: 7,
    name: 'David Taylor',
    position: 'Marketing Specialist',
    department: 'Marketing',
    salary: '$65,000',
    startDate: '2023-02-28',
    status: 'Active',
    email: 'david.t@example.com',
  },
  {
    id: 8,
    name: 'Jennifer Martinez',
    position: 'HR Manager',
    department: 'HR',
    salary: '$88,000',
    startDate: '2020-12-14',
    status: 'Active',
    email: 'jennifer.m@example.com',
  },
  {
    id: 9,
    name: 'Christopher Anderson',
    position: 'Data Scientist',
    department: 'Data',
    salary: '$105,000',
    startDate: '2021-07-30',
    status: 'Active',
    email: 'chris.a@example.com',
  },
  {
    id: 10,
    name: 'Amanda Thomas',
    position: 'Content Writer',
    department: 'Marketing',
    salary: '$60,000',
    startDate: '2022-04-11',
    status: 'Active',
    email: 'amanda.t@example.com',
  },
])

// Table columns configuration
const columns = [
  { key: 'name', label: 'Name', sortable: true, searchable: true },
  { key: 'position', label: 'Position', sortable: true, searchable: true },
  { key: 'department', label: 'Department', sortable: true },
  {
    key: 'salary',
    label: 'Salary',
    sortable: true,
    slot: 'salary', // Use a custom slot for formatting
  },
  {
    key: 'startDate',
    label: 'Start Date',
    sortable: true,
    slot: 'date', // Use a custom slot for formatting
  },
  {
    key: 'status',
    label: 'Status',
    slot: 'status', // Use a custom slot for badge styling
  },
]

// Format date
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('en-US', options)
}

// Edit handler
const handleEdit = (employee) => {
  console.log('Edit employee:', employee)
}

// Delete handler
const handleDelete = (employee) => {
  if (confirm(`Are you sure you want to delete ${employee.name}?`)) {
    employees.value = employees.value.filter((e) => e.id !== employee.id)
  }
}
</script>

<style scoped>
button {
  transition: all 0.2s ease;
}
</style>

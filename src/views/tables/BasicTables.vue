<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard title="Basic Table 1">
        <BasicTableOne />
      </ComponentCard>
      <ComponentCard title="Data Table">
        <Datatable :data="data" :columns="columns" />
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref } from "vue";
import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue";
import AdminLayout from "@/components/layout/AdminLayout.vue";
import ComponentCard from "@/components/common/ComponentCard.vue";
import BasicTableOne from "@/components/tables/basic-tables/BasicTableOne.vue";
import Datatable from "@/lib/datatable/DataTable.vue";
const currentPageTitle = ref("Basic Tables");

const columns = [
  { key: 'name', label: 'User', sortable: true },
  { key: 'position', label: 'Position', sortable: true },
  { key: 'office', label: 'Office' },
  { key: 'age', label: 'Age', sortable: true },
  { key: 'startDate', label: 'Start date', sortable: true },
  { key: 'salary', label: 'Salary', sortable: true }
];

const data = [
  { name: 'Abram Schleifer', position: 'Sales Assistant', office: 'Edinburgh', age: 57, startDate: '25 Apr, 2027', salary: '$89,500' },
  // ... more data
];
</script>

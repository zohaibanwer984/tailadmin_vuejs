<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="space-y-5 sm:space-y-6">
      <!-- Success Alerts -->
      <ComponentCard title="Success Alert">
        <Alert
          variant="success"
          title="Success Message"
          message="Operation completed successfully."
          :show-link="true"
          link-href="/"
          link-text="Learn more"
        />
        <Alert
          variant="success"
          title="Success Message"
          message="Operation completed successfully."
          :show-link="false"
        />
      </ComponentCard>

      <!-- Warning Alerts -->
      <ComponentCard title="Warning Alert">
        <Alert
          variant="warning"
          title="Warning Message"
          message="Be cautious when performing this action."
          :show-link="true"
          link-href="/"
          link-text="Learn more"
        />
        <Alert
          variant="warning"
          title="Warning Message"
          message="Be cautious when performing this action."
          :show-link="false"
        />
      </ComponentCard>

      <!-- Error Alerts -->
      <ComponentCard title="Error Alert">
        <Alert
          variant="error"
          title="Error Message"
          message="An error occurred while processing your request."
          :show-link="true"
          link-href="/"
          link-text="Learn more"
        />
        <Alert
          variant="error"
          title="Error Message"
          message="An error occurred while processing your request."
          :show-link="false"
        />
      </ComponentCard>

      <!-- Info Alerts -->
      <ComponentCard title="Info Alert">
        <Alert
          variant="info"
          title="Info Message"
          message="This is some informational text."
          :show-link="true"
          link-href="/"
          link-text="Learn more"
        />
        <Alert
          variant="info"
          title="Info Message"
          message="This is some informational text."
          :show-link="false"
        />
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref } from 'vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import Alert from '@/components/ui/Alert.vue'

const currentPageTitle = ref('Alerts')
</script>
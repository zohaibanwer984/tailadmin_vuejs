<template>
  <AdminLayout>
    <PageBreadcrumb :pageTitle="currentPageTitle" />

    <div class="space-y-5 sm:space-y-6">
      <!-- Default Tab (Pills) -->
      <ComponentCard title="Default Tab (Pills)">
        <Tab 
          v-model="defaultTab" 
          :tabs="defaultTabs"
          variant="pills"
          orientation="horizontal"
        >
          <template #overview_tab>
            <div class="space-y-3">
              <h3 class="text-xl font-medium text-gray-800 dark:text-white/90">Overview</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                This is the overview section showcasing the pills variant in horizontal orientation. 
                It provides a comprehensive summary of all key metrics and information at a glance.
              </p>
            </div>
          </template>

          <template #notification_tab>
            <div class="space-y-3">
              <h3 class="text-xl font-medium text-gray-800 dark:text-white/90">Notification</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Notification management interface with pills styling. Here you can configure alerts, 
                manage preferences, and review notification history with an intuitive design.
              </p>
            </div>
          </template>

          <template #analytics_tab>
            <div class="space-y-3">
              <h3 class="text-xl font-medium text-gray-800 dark:text-white/90">Analytics</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Advanced analytics dashboard featuring interactive charts and real-time data visualization. 
                Track performance metrics, conversion rates, and user engagement patterns.
              </p>
              <div class="pt-2">
                <div class="grid grid-cols-3 gap-4 text-center">
                  <div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">1.2k</div>
                    <div class="text-xs text-blue-500 dark:text-blue-300">Views</div>
                  </div>
                  <div class="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div class="text-2xl font-bold text-green-600 dark:text-green-400">89%</div>
                    <div class="text-xs text-green-500 dark:text-green-300">Conversion</div>
                  </div>
                  <div class="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">24</div>
                    <div class="text-xs text-purple-500 dark:text-purple-300">Sales</div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </Tab>
      </ComponentCard>

      <!-- Tab With Underline -->
      <ComponentCard title="Tab With Underline">
        <Tab 
          v-model="underlineTab" 
          :tabs="underlineTabs"
          variant="underline"
          orientation="horizontal"
        >
          <template #overview_tab>
            <div class="space-y-3">
              <h3 class="text-xl font-medium text-gray-800 dark:text-white/90">Overview</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                This is the overview section showcasing the underline variant in horizontal orientation. 
                It provides a comprehensive summary of all key metrics and information at a glance.
              </p>
            </div>
          </template>

          <template #notification_tab>
            <div class="space-y-3">
              <h3 class="text-xl font-medium text-gray-800 dark:text-white/90">Notification</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Notification management interface with underline styling. Here you can configure alerts, 
                manage preferences, and review notification history with an intuitive design.
              </p>
            </div>
          </template>

          <template #analytics_tab>
            <div class="space-y-3">
              <h3 class="text-xl font-medium text-gray-800 dark:text-white/90">Analytics</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Advanced analytics dashboard featuring interactive charts and real-time data visualization. 
                Track performance metrics, conversion rates, and user engagement patterns.
              </p>
              <div class="pt-2">
                <div class="grid grid-cols-3 gap-4 text-center">
                  <div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">1.2k</div>
                    <div class="text-xs text-blue-500 dark:text-blue-300">Views</div>
                  </div>
                  <div class="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div class="text-2xl font-bold text-green-600 dark:text-green-400">89%</div>
                    <div class="text-xs text-green-500 dark:text-green-300">Conversion</div>
                  </div>
                  <div class="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">24</div>
                    <div class="text-xs text-purple-500 dark:text-purple-300">Sales</div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </Tab>
      </ComponentCard>

      <!-- Tab with Icons -->
      <ComponentCard title="Tab with Icons">
        <Tab 
          v-model="iconTab" 
          :tabs="iconTabs"
          variant="underline"
          orientation="horizontal"
        >
          <template #overview_tab>
            <div class="space-y-3">
              <h3 class="text-xl font-medium text-gray-800 dark:text-white/90">Overview</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                This is the overview section showcasing the underline variant with icons in horizontal orientation. 
                It provides a comprehensive summary of all key metrics and information at a glance.
              </p>
            </div>
          </template>

          <template #notification_tab>
            <div class="space-y-3">
              <h3 class="text-xl font-medium text-gray-800 dark:text-white/90">Notification</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Notification management interface with underline styling and icons. Here you can configure alerts, 
                manage preferences, and review notification history with an intuitive design.
              </p>
            </div>
          </template>

          <template #analytics_tab>
            <div class="space-y-3">
              <h3 class="text-xl font-medium text-gray-800 dark:text-white/90">Analytics</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Advanced analytics dashboard featuring interactive charts and real-time data visualization. 
                Track performance metrics, conversion rates, and user engagement patterns.
              </p>
              <div class="pt-2">
                <div class="grid grid-cols-3 gap-4 text-center">
                  <div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">1.2k</div>
                    <div class="text-xs text-blue-500 dark:text-blue-300">Views</div>
                  </div>
                  <div class="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div class="text-2xl font-bold text-green-600 dark:text-green-400">89%</div>
                    <div class="text-xs text-green-500 dark:text-green-300">Conversion</div>
                  </div>
                  <div class="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">24</div>
                    <div class="text-xs text-purple-500 dark:text-purple-300">Sales</div>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <template #customers_tab>
            <div class="space-y-3">
              <h3 class="text-xl font-medium text-gray-800 dark:text-white/90">Customers</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Customer relationship management panel where you can view customer profiles, 
                track interactions, and manage customer data effectively.
              </p>
              <div class="pt-2">
                <div class="space-y-2">
                  <div v-for="customer in sampleCustomers" :key="customer.id" 
                       class="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <div class="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {{ customer.name.charAt(0) }}
                    </div>
                    <div class="flex-1">
                      <div class="text-sm font-medium text-gray-900 dark:text-white">{{ customer.name }}</div>
                      <div class="text-xs text-gray-500 dark:text-gray-400">{{ customer.email }}</div>
                    </div>
                    <div class="text-xs text-gray-400">{{ customer.status }}</div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </Tab>
      </ComponentCard>

      <!-- Tab with Badges -->
      <ComponentCard title="Tab with Badges">
        <Tab 
          v-model="badgeTab" 
          :tabs="badgeTabs"
          variant="underline"
          orientation="horizontal"
        >
          <template #overview_tab>
            <div class="space-y-3">
              <h3 class="text-xl font-medium text-gray-800 dark:text-white/90">Overview</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                This is the overview section showcasing the underline variant with badges in horizontal orientation. 
                It provides a comprehensive summary of all key metrics and information at a glance.
              </p>
            </div>
          </template>

          <template #notification_tab>
            <div class="space-y-3">
              <h3 class="text-xl font-medium text-gray-800 dark:text-white/90">Notification</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Notification management interface with underline styling and badges. Here you can configure alerts, 
                manage preferences, and review notification history with an intuitive design.
              </p>
            </div>
          </template>

          <template #analytics_tab>
            <div class="space-y-3">
              <h3 class="text-xl font-medium text-gray-800 dark:text-white/90">Analytics</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Advanced analytics dashboard featuring interactive charts and real-time data visualization. 
                Track performance metrics, conversion rates, and user engagement patterns.
              </p>
              <div class="pt-2">
                <div class="grid grid-cols-3 gap-4 text-center">
                  <div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">1.2k</div>
                    <div class="text-xs text-blue-500 dark:text-blue-300">Views</div>
                  </div>
                  <div class="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div class="text-2xl font-bold text-green-600 dark:text-green-400">89%</div>
                    <div class="text-xs text-green-500 dark:text-green-300">Conversion</div>
                  </div>
                  <div class="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">24</div>
                    <div class="text-xs text-purple-500 dark:text-purple-300">Sales</div>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <template #customers_tab>
            <div class="space-y-3">
              <h3 class="text-xl font-medium text-gray-800 dark:text-white/90">Customers</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Customer relationship management panel where you can view customer profiles, 
                track interactions, and manage customer data effectively.
              </p>
              <div class="pt-2">
                <div class="space-y-2">
                  <div v-for="customer in sampleCustomers" :key="customer.id" 
                       class="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <div class="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {{ customer.name.charAt(0) }}
                    </div>
                    <div class="flex-1">
                      <div class="text-sm font-medium text-gray-900 dark:text-white">{{ customer.name }}</div>
                      <div class="text-xs text-gray-500 dark:text-gray-400">{{ customer.email }}</div>
                    </div>
                    <div class="text-xs text-gray-400">{{ customer.status }}</div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </Tab>
      </ComponentCard>

      <!-- Vertical Tab -->
      <ComponentCard title="Vertical Tab">
        <Tab 
          v-model="verticalTab" 
          :tabs="verticalTabs"
          variant="pills"
          orientation="vertical"
        >
          <template #overview_tab>
            <div class="space-y-3">
              <h3 class="text-xl font-medium text-gray-800 dark:text-white/90">Overview</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                This is the overview section showcasing the pills variant in vertical orientation. 
                It provides a comprehensive summary of all key metrics and information at a glance.
              </p>
            </div>
          </template>

          <template #notification_tab>
            <div class="space-y-3">
              <h3 class="text-xl font-medium text-gray-800 dark:text-white/90">Notification</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Notification management interface with pills styling in vertical layout. Here you can configure alerts, 
                manage preferences, and review notification history with an intuitive design.
              </p>
            </div>
          </template>

          <template #analytics_tab>
            <div class="space-y-3">
              <h3 class="text-xl font-medium text-gray-800 dark:text-white/90">Analytics</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Advanced analytics dashboard featuring interactive charts and real-time data visualization. 
                Track performance metrics, conversion rates, and user engagement patterns.
              </p>
              <div class="pt-2">
                <div class="grid grid-cols-3 gap-4 text-center">
                  <div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">1.2k</div>
                    <div class="text-xs text-blue-500 dark:text-blue-300">Views</div>
                  </div>
                  <div class="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div class="text-2xl font-bold text-green-600 dark:text-green-400">89%</div>
                    <div class="text-xs text-green-500 dark:text-green-300">Conversion</div>
                  </div>
                  <div class="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">24</div>
                    <div class="text-xs text-purple-500 dark:text-purple-300">Sales</div>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <template #customers_tab>
            <div class="space-y-3">
              <h3 class="text-xl font-medium text-gray-800 dark:text-white/90">Customers</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Customer relationship management panel where you can view customer profiles, 
                track interactions, and manage customer data effectively.
              </p>
              <div class="pt-2">
                <div class="space-y-2">
                  <div v-for="customer in sampleCustomers" :key="customer.id" 
                       class="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <div class="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {{ customer.name.charAt(0) }}
                    </div>
                    <div class="flex-1">
                      <div class="text-sm font-medium text-gray-900 dark:text-white">{{ customer.name }}</div>
                      <div class="text-xs text-gray-500 dark:text-gray-400">{{ customer.email }}</div>
                    </div>
                    <div class="text-xs text-gray-400">{{ customer.status }}</div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </Tab>
      </ComponentCard>

      <!-- Contained Style -->
      <ComponentCard title="Contained Style">
        <Tab 
          v-model="containedTab" 
          :tabs="containedTabs"
          variant="contained"
          orientation="horizontal"
        >
          <template #overview_tab>
            <div class="space-y-3">
              <h3 class="text-xl font-medium text-gray-800 dark:text-white/90">Overview</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                This is the overview section showcasing the contained variant in horizontal orientation. 
                It provides a comprehensive summary of all key metrics and information at a glance.
              </p>
            </div>
          </template>

          <template #notification_tab>
            <div class="space-y-3">
              <h3 class="text-xl font-medium text-gray-800 dark:text-white/90">Notification</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Notification management interface with contained styling. Here you can configure alerts, 
                manage preferences, and review notification history with an intuitive design.
              </p>
            </div>
          </template>

          <template #analytics_tab>
            <div class="space-y-3">
              <h3 class="text-xl font-medium text-gray-800 dark:text-white/90">Analytics</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Advanced analytics dashboard featuring interactive charts and real-time data visualization. 
                Track performance metrics, conversion rates, and user engagement patterns.
              </p>
              <div class="pt-2">
                <div class="grid grid-cols-3 gap-4 text-center">
                  <div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">1.2k</div>
                    <div class="text-xs text-blue-500 dark:text-blue-300">Views</div>
                  </div>
                  <div class="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div class="text-2xl font-bold text-green-600 dark:text-green-400">89%</div>
                    <div class="text-xs text-green-500 dark:text-green-300">Conversion</div>
                  </div>
                  <div class="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">24</div>
                    <div class="text-xs text-purple-500 dark:text-purple-300">Sales</div>
                  </div>
                </div>
              </div>
            </div>
          </template>

          <template #customers_tab>
            <div class="space-y-3">
              <h3 class="text-xl font-medium text-gray-800 dark:text-white/90">Customers</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                Customer relationship management panel where you can view customer profiles, 
                track interactions, and manage customer data effectively.
              </p>
              <div class="pt-2">
                <div class="space-y-2">
                  <div v-for="customer in sampleCustomers" :key="customer.id" 
                       class="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                    <div class="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {{ customer.name.charAt(0) }}
                    </div>
                    <div class="flex-1">
                      <div class="text-sm font-medium text-gray-900 dark:text-white">{{ customer.name }}</div>
                      <div class="text-xs text-gray-500 dark:text-gray-400">{{ customer.email }}</div>
                    </div>
                    <div class="text-xs text-gray-400">{{ customer.status }}</div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </Tab>
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref } from 'vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import ComponentCard from '@/components/common/ComponentCard.vue'
import Tab from '@/lib/tab/Tab.vue'
import { BoxIcon, BellIcon, BarChartIcon, UserGroupIcon } from '@/icons'

const currentPageTitle = ref('Tabs Components')

// Sample data for demo content
const sampleCustomers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Pending' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', status: 'Active' }
]

// Default Tab (Pills)
const defaultTab = ref('overview')
const defaultTabs = [
  { id: 'overview', title: 'Overview' },
  { id: 'notification', title: 'Notification' },
  { id: 'analytics', title: 'Analytics' }
]

// Tab With Underline
const underlineTab = ref('overview')
const underlineTabs = [
  { id: 'overview', title: 'Overview' },
  { id: 'notification', title: 'Notification' },
  { id: 'analytics', title: 'Analytics' }
]

// Tab with Icons
const iconTab = ref('overview')
const iconTabs = [
  { id: 'overview', title: 'Overview', icon: BoxIcon },
  { id: 'notification', title: 'Notification', icon: BellIcon },
  { id: 'analytics', title: 'Analytics', icon: BarChartIcon },
  { id: 'customers', title: 'Customers', icon: UserGroupIcon }
]

// Tab with Badges
const badgeTab = ref('overview')
const badgeTabs = [
  { id: 'overview', title: 'Overview', badge: '8' },
  { id: 'notification', title: 'Notification', badge: '5' },
  { id: 'analytics', title: 'Analytics', badge: '12' },
  { id: 'customers', title: 'Customers', badge: '24' }
]

// Vertical Tab
const verticalTab = ref('overview')
const verticalTabs = [
  { id: 'overview', title: 'Overview' },
  { id: 'notification', title: 'Notification' },
  { id: 'analytics', title: 'Analytics' },
  { id: 'customers', title: 'Customers' }
]

// Contained Style
const containedTab = ref('overview')
const containedTabs = [
  { id: 'overview', title: 'Overview', icon: BoxIcon },
  { id: 'notification', title: 'Notification', icon: BellIcon, badge: '3' },
  { id: 'analytics', title: 'Analytics', icon: BarChartIcon },
  { id: 'customers', title: 'Customers', icon: UserGroupIcon, badge: '12' }
]
</script>
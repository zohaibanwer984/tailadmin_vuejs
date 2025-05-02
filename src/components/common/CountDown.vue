<template>
  <div class="mb-10">
    <div
      class="flex flex-wrap justify-center gap-1 mb-2 font-bold text-title-md text-brand-500 dark:text-brand-400 xl:text-title-lg"
    >
      <!-- Days -->
      <div v-for="(day, index) in daysArray" :key="'day-' + index">
        <div v-show="day.visible" class="timer-box">
          <span>{{ day.value }}</span>
        </div>
      </div>

      :

      <!-- Hours -->
      <div v-for="(hour, index) in hoursArray" :key="'hour-' + index">
        <div v-show="hour.visible" class="timer-box">
          <span>{{ hour.value }}</span>
        </div>
      </div>

      :

      <!-- Minutes -->
      <div v-for="(minute, index) in minutesArray" :key="'minute-' + index">
        <div v-show="minute.visible" class="timer-box">
          <span>{{ minute.value }}</span>
        </div>
      </div>

      :

      <!-- Seconds -->
      <div v-for="(second, index) in secondsArray" :key="'second-' + index">
        <div v-show="second.visible" class="timer-box">
          <span>{{ second.value }}</span>
        </div>
      </div>
    </div>

    <div class="text-base text-center text-gray-500 dark:text-gray-400">
      <div class="flex justify-center gap-0.5">
        <div v-for="(day, index) in daysArray" :key="'days-left-' + index">
          <span v-show="day.visible" class="inline-block timer-box">
            <span>{{ day.value }}</span>
          </span>
        </div>
        <div>days left</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Refs for each time unit
const daysArray = ref([])
const hoursArray = ref([])
const minutesArray = ref([])
const secondsArray = ref([])

const endTime = new Date('December 20, 2025 23:59:59 GMT+0530').getTime()
const timeLeft = ref(0)
let intervalId

// Format value to 2-digit string
const format = (val) => (val < 10 ? '0' + Math.floor(val) : Math.floor(val))

// Convert value into displayable digit array
const getTimeArray = (value, unit) => {
  const stringValue = format(value).toString()
  const percentage = (value / getMaxValueForUnit(unit)) * 100
  return stringValue.split('').map((digit) => ({
    value: digit,
    visible: true,
    remainingPercentage: percentage,
  }))
}

// Maximum values for time units
const getMaxValueForUnit = (unit) => {
  const limits = {
    days: 365,
    hours: 24,
    minutes: 60,
    seconds: 60,
  }
  return limits[unit] || 1
}

// Update all time arrays
const updateTimeArrays = () => {
  const now = Date.now()
  timeLeft.value = Math.max((endTime - now) / 1000, 0)

  daysArray.value = getTimeArray(timeLeft.value / 86400, 'days')
  hoursArray.value = getTimeArray((timeLeft.value / 3600) % 24, 'hours')
  minutesArray.value = getTimeArray((timeLeft.value / 60) % 60, 'minutes')
  secondsArray.value = getTimeArray(timeLeft.value % 60, 'seconds')
}

// Reset all arrays to zero
const resetTimeArrays = () => {
  const zero = [{ value: '0', visible: true }]
  daysArray.value = [...zero]
  hoursArray.value = [...zero]
  minutesArray.value = [...zero]
  secondsArray.value = [...zero]
}

// Timer logic
const startCountdown = () => {
  updateTimeArrays()
  intervalId = setInterval(() => {
    updateTimeArrays()
    if (timeLeft.value <= 0) {
      clearInterval(intervalId)
      resetTimeArrays()
    }
  }, 1000)
}

// Lifecycle hooks
onMounted(() => {
  startCountdown()
})

onUnmounted(() => {
  clearInterval(intervalId)
})
</script>